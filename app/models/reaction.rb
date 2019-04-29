class Reaction < ApplicationRecord
  include Concerns::Broadcastable

  attr_accessor :skip_broadcast

  validates_presence_of :message_id, :user_id, :emoji

  belongs_to :user
  belongs_to :message
  has_one :chatroom, through: :message

  def self.with_message(message_id)
    includes(:message, :user).where(message_id: message_id)
  end

  def broadcast_name
    "chatroom_#{chatroom.slug}"
  end

  def message_slug
    message.slug
  end

  def user_slug
    user.slug
  end

  after_create_commit :broadcast_create
  after_destroy_commit :broadcast_destroy
end
