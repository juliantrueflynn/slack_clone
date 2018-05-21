class MessageFav < ApplicationRecord
  validates :message_id, :user_id, uniqueness: true, presence: true

  belongs_to :message
  belongs_to :user
end
