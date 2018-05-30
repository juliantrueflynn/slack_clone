class Reaction < ApplicationRecord
  validates :message_id, :user_id, :reaction, presence: true

  belongs_to :user
  belongs_to :message
end
