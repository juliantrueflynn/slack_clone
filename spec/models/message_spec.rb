require 'rails_helper'

RSpec.describe Message, type: :model do
  it { is_expected.to validate_presence_of :author_id }
  it { is_expected.to validate_presence_of :entity_type }
  it { is_expected.to validate_presence_of :chatroom_id }

  describe 'with #slug' do
    subject { FactoryBot.create(:message) }

    it { is_expected.to validate_presence_of :slug }
    it { is_expected.to validate_uniqueness_of :slug }
  end

  it { is_expected.to belong_to :chatroom }
  it { is_expected.to belong_to :author }
  it { is_expected.to belong_to(:parent_message).optional }
  it { is_expected.to have_one :workspace }
  it { is_expected.to have_many :pins }
  it { is_expected.to have_many :reads }
  it { is_expected.to have_many :children }
end
