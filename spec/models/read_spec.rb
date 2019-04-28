require 'rails_helper'

RSpec.describe Read, type: :model do
  it { is_expected.to belong_to :user }
  it { is_expected.to belong_to :workspace }
  it { is_expected.to belong_to(:chatroom).optional }
  it { is_expected.to belong_to(:message).optional }
end
