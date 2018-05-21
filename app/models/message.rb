class Message < ApplicationRecord
  before_validation :generate_id

  attr_accessor :parent_message_slug

  validates :author_id, :channel_id, presence: true
  validates :slug, uniqueness: true, presence: true
  validates_length_of :body,
    within: 1..50000,
    too_long: 'is too long (max: 50000 characters)',
    too_short: 'cannot be empty'

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id
  belongs_to :channel
  belongs_to :parent_message,
    class_name: 'Message',
    foreign_key: :parent_message_id,
    optional: true
  has_many :thread_entries,
    class_name: 'Message',
    foreign_key: :parent_message_id
  has_many :favs,
    class_name: 'MessageFav',
    foreign_key: :message_id

  def is_child?
    !!parent_message_id
  end

  private

  def generate_id
    return slug if slug
    
    loop do
      self.slug = SecureRandom.urlsafe_base64(8)
      break unless Message.where(slug: slug).exists?
    end
  end

  after_create_commit do
    parent_message_slug = nil

    if is_child?
      parent_message = Message.find_by(id: parent_message_id)
      parent_message_slug = parent_message.slug
    end

    MessageEventsJob.perform_later(
      event: "CREATE_MESSAGE",
      message: self,
      parent_message_slug: parent_message_slug
    )
  end

  after_update_commit do
    MessageEventsJob.perform_later(event: "EDIT_MESSAGE", message: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_message
  def delete_message
    MessageEventsJob.perform_later(event: "DELETE_MESSAGE", message: self)
  end
end
