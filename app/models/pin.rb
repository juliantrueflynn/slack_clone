class Pin < ApplicationRecord
  validates_presence_of :message_id, :user_id
  validates_uniqueness_of :message_id

  belongs_to :message
  belongs_to :user

  private

  after_create_commit :broadcast_create
  after_destroy :broadcast_destroy
end