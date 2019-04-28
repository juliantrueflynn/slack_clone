require 'rails_helper'

RSpec.describe Pin, type: :model do
  it { is_expected.to belong_to :message }
  it { is_expected.to belong_to :user }
  it { is_expected.to have_one :chatroom }
end
