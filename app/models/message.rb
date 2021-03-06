class Message < ApplicationRecord
  searchkick

  include Concerns::Sluggable
  include Concerns::Broadcastable

  ENTITY_TYPES = %w(entry sub_create sub_destroy).freeze

  attr_accessor :skip_broadcast

  validates_presence_of :slug, :author_id, :entity_type, :chatroom_id
  validates_uniqueness_of :slug
  validates_length_of :body, maximum: 50000
  validates_inclusion_of :entity_type, in: ENTITY_TYPES

  belongs_to :chatroom
  belongs_to :author, class_name: 'User'
  belongs_to :parent_message, class_name: 'Message', optional: true
  has_many :children, class_name: 'Message', foreign_key: :parent_message_id
  has_many :pins
  has_many :reads, -> { messages }, foreign_key: :readable_id
  has_one :workspace, through: :chatroom

  scope :with_parent, -> { where(parent_message_id: nil) }
  scope :with_child, -> { where.not(parent_message_id: nil) }
  scope :with_entry_type, -> { where(entity_type: 'entry') }
  scope :search_import, -> { with_entry_type }

  def self.convo_parents_with_author_id(author_id)
    left_joins(:reads).where(reads: { user_id: author_id })
  end

  def self.convos_last_created_at(author_id)
    children_of(convo_parents_with_author_id(author_id))
      .joins(:parent_message)
      .group('parent_messages_messages.slug')
      .maximum(:created_at)
  end

  def self.chatrooms_last_created_at(author_id)
    with_entry_type.with_parent.includes(chatroom: :chatroom_subs)
      .where(chatroom_subs: { user_id: author_id })
      .group('chatrooms.slug')
      .maximum(:created_at)
  end

  def self.with_id_before(start_id)
    where("id <= ?", start_id)
  end

  def self.parents_or_children(id_or_ids)
    where(id: id_or_ids).or(children_of(id_or_ids))
  end

  def broadcast_name
    "chatroom_#{chatroom.slug}"
  end

  def search_data
    { id: id, body: body_plain_text, chatroom_id: chatroom_id }
  end

  def should_index?
    entity_type
  end

  def parent_message_slug
    parent_message&.slug
  end

  def convo_authors_slugs
    author_slugs = children.includes(:author).pluck('users.slug')
    author_slugs.unshift(author.slug)
    author_slugs.uniq
  end

  after_create_commit :broadcast_create
  after_update_commit :broadcast_update
  after_destroy_commit :destroy_replies, :broadcast_destroy

  private

  def self.children_of(id_or_ids)
    where(parent_message_id: id_or_ids)
  end

  def body_plain_text
    return if body.nil?
    body_json = ActiveSupport::JSON.decode(body)
    body_json['blocks'].pluck('text').join(' ')
  end

  def destroy_replies
    return if parent_message_id?
    Message.children_of(id).delete_all
  end
end