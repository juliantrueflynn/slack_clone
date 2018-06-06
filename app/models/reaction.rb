class Reaction < ApplicationRecord
  validates :message_id, :user_id, :emoji, presence: true

  belongs_to :user
  belongs_to :message

  after_create_commit do
    ReactionEventsJob.perform_later(event: "CREATE_REACTION", reaction: self)
  end

  after_update_commit do
    ReactionEventsJob.perform_later(event: "EDIT_REACTION", reaction: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_reaction
  def delete_reaction
    ReactionEventsJob.perform_later(event: "DELETE_REACTION", reaction: self)
  end
end
