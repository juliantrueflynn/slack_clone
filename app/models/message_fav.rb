class MessageFav < ApplicationRecord
  validates_presence_of :message_id, :user_id
  validates_uniqueness_of :message_id, scope: :user_id

  belongs_to :message
  belongs_to :user

  after_create_commit do
    ActivityEventsJob.perform_later(type: "FAVORITE_CREATE_RECEIVE", favorite: self)
  end

  after_update_commit do
    ActivityEventsJob.perform_later(type: "FAVORITE_UPDATE_RECEIVE", favorite: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_favorite
  def delete_favorite
    ActivityEventsJob.perform_later(type: "FAVORITE_DELETE_RECEIVE", favorite: self)
  end
end
