require 'rails_helper'

RSpec.describe Reaction, type: :model do
  it { is_expected.to validate_presence_of :emoji }

  it { is_expected.to belong_to :user }
  it { is_expected.to belong_to :message }
  it { is_expected.to have_one :chatroom }
end
