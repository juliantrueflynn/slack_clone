require 'rails_helper'

RSpec.describe Chatroom, type: :model do
  it do
    is_expected.to validate_length_of(:title).is_at_least(2).is_at_most(55).allow_nil
  end

  describe 'with #slug' do
    subject { FactoryBot.create(:chatroom) }

    it { is_expected.to validate_presence_of :slug }
    it { is_expected.to validate_uniqueness_of :slug }
  end

  describe 'generates #chatroom_sub' do
    before(:each) { @chatroom = FactoryBot.create(:chatroom) }

    it 'has 1 #chatroom_sub' do
      expect(@chatroom.chatroom_subs.length).to be(1)
    end
  end

  it { is_expected.to belong_to :workspace }
  it { is_expected.to belong_to(:owner).optional }
  it { is_expected.to have_many :chatroom_subs }
  it { is_expected.to have_many :users }
  it { is_expected.to have_many :entries_parents }
  it { is_expected.to have_many :pins }
  it { is_expected.to have_many :reads }
end
