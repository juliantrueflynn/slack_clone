require 'rails_helper'

RSpec.describe Workspace, type: :model do
  it { is_expected.to validate_presence_of :title }
  it { is_expected.to validate_presence_of :slug }
  it do
    is_expected.to validate_length_of(:title).is_at_least(3).is_at_most(55)
  end

  describe 'generates default chatrooms' do
    let!(:workspace) { FactoryBot.create(:workspace) }

    it 'has 2 chatrooms' do
      expect(workspace.chatrooms.length).to be(2)
    end
  end

  it { is_expected.to belong_to :owner }
  it { is_expected.to have_many :workspace_subs }
  it { is_expected.to have_many :users }
  it { is_expected.to have_many :reads }
  it { is_expected.to have_many :chatrooms }
  it { is_expected.to have_many :chatroom_subs }
  it { is_expected.to have_many :messages }
end
