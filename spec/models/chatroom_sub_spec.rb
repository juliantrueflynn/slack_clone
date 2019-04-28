require 'rails_helper'

RSpec.describe ChatroomSub, type: :model do
  it { is_expected.to belong_to :user }
  it { is_expected.to belong_to :chatroom }
  it { is_expected.to have_one :workspace }
end
