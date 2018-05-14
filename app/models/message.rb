class Message < ApplicationRecord
  before_validation :generate_slug

  validates :author_slug, :channel_slug, presence: true
  validates :slug, uniqueness: true, presence: true

  belongs_to :author, class_name: 'User', primary_key: :slug, foreign_key: :author_slug
  belongs_to :channel, primary_key: :slug, foreign_key: :channel_slug
  belongs_to :thread,
    class_name: 'Message',
    primary_key: :slug,
    foreign_key: :parent_message_slug,
    optional: true
  has_many :thread_entries,
    class_name: 'Message',
    primary_key: :slug,
    foreign_key: :parent_message_slug

  private

  def generate_slug
    return slug if slug
    
    loop do
      self.slug = SecureRandom.urlsafe_base64(8)
      break unless Message.where(slug: slug).exists?
    end
  end

  after_create_commit do
    MessageEventsJob.perform_later(event: "CREATE_MESSAGE", data: self)
  end

  after_update_commit do
    MessageEventsJob.perform_later(event: "EDIT_MESSAGE", data: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_message
  def delete_message
    MessageEventsJob.perform_later(event: "DELETE_MESSAGE", data: self)
  end
end
