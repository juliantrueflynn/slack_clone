class Message < ApplicationRecord
  validates :author_id, :channel_id, presence: true

  belongs_to :author, class_name: 'User'
  belongs_to :channel
  belongs_to :thread, class_name: 'Message', foreign_key: :parent_message_id, optional: true
  has_many :thread_entries, class_name: 'Message', foreign_key: :parent_message_id

  after_create_commit do
    MessageCreateJob.perform_later(self)
  end

  after_update_commit do
    MessageEditJob.perform_later(self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_message
  def delete_message
    MessageDeleteJob.perform_later(self)
  end
end
