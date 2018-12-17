class Message < ApplicationRecord
  searchkick

  before_validation :generate_slug, unless: :slug?

  attr_accessor :skip_broadcast

  validates_presence_of :slug, :author_id, :entity_type, :channel_id
  validates_uniqueness_of :slug
  validates_length_of :body,
    maximum: 50000,
    too_long: 'is too long (max: 50000 characters)'
  validates_inclusion_of :entity_type, in: %w(entry sub_create sub_destroy)

  belongs_to :channel
  belongs_to :author, class_name: 'User'
  belongs_to :parent_message,
    class_name: 'Message',
    optional: true
  has_one :workspace, through: :channel
  has_many :replies,
    -> { includes(:author, :parent_message) },
    class_name: 'Message',
    foreign_key: :parent_message_id
  has_many :favorites
  has_many :reads, foreign_key: :readable_id
  has_many :pins

  scope :with_parent, -> { where(parent_message_id: nil) }
  scope :with_child, -> { where.not(parent_message_id: nil) }
  scope :with_entry_type, -> { where(entity_type: 'entry') }
  scope :without_entry_type, -> { where.not(entity_type: 'entry') }
  scope :by_entry_parent, -> { with_entry_type.with_parent }
  scope :search_import, -> { with_entry_type }

  def self.convo_author_created(author_id)
    joins(:replies)
      .where.not(replies_messages: { parent_message_id: nil })
      .where(author_id: author_id)
  end

  def self.convo_author_child_of(author_id)
    joins(:replies).where(replies_messages: { author_id: author_id })
  end

  def self.convos_with_author_id(author_id)
    convos = convo_author_created(author_id).or(convo_author_child_of(author_id))
    parents_or_children(convos)
  end

  def self.channel_last_entry_id(user_id)
    includes(channel: :subs).by_entry_parent
      .where(channel_subs: { user_id: user_id })
      .group(:channel_id)
      .maximum(:id)
  end

  def self.convos_last_entry_id(user_id)
    convos_with_author_id(user_id).with_child
      .group(:parent_message_id)
      .maximum(:id)
  end

  def self.created_between(start_date, end_date)
    where("created_at BETWEEN ? AND ?", start_date, end_date)
  end

  def self.created_until(until_date)
    where("created_at > ?", until_date)
  end

  def self.parents_or_children(id_or_ids)
    where(id: id_or_ids).or(where(parent_message_id: id_or_ids))
  end

  def self.created_recently(until_date, max)
    results = []
    0.step(to: max) do |idx|
      start_date = until_date.midnight - idx
      results = created_between(start_date, until_date)
      break if results.by_entry_parent.length > 12
    end

    results
  end

  def broadcast_name
    "channel_#{channel.slug}"
  end

  def plain_text
    return if body.nil?
    body_json = ActiveSupport::JSON.decode(body)
    lines = body_json["blocks"].pluck('text')
    lines.join(" ")
  end

  def search_data
    {
      id: id,
      body: plain_text,
      channel_id: channel_id,
      workspace_id: workspace.id
    }
  end

  def should_index?
    entity_type
  end

  def parent_message_slug
    parent_message ? parent_message.slug : nil
  end

  after_create_commit :broadcast_create
  after_update_commit :broadcast_update
  after_destroy :destroy_replies, :broadcast_destroy

  private

  def destroy_replies
    return if parent_message_id?
    Message.where(parent_message_id: id).delete_all
  end
end