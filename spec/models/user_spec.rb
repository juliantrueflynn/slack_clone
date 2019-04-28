require 'rails_helper'

RSpec.describe User, type: :model do
  it { is_expected.to validate_presence_of :username }
  it { is_expected.to validate_presence_of :email }
  it { is_expected.to validate_presence_of :password_digest }
  it { is_expected.to validate_length_of(:password).is_at_least(6) }

  describe 'with #slug' do
    subject { FactoryBot.create(:user) }

    it { is_expected.to validate_presence_of :slug }
    it { is_expected.to validate_uniqueness_of :slug }
  end

  describe 'with #password' do
    let!(:user) { FactoryBot.create(:user) }

    it 'expects changed #password_digest on #password update' do
      old_password_digest = user.password_digest
      user.update_attribute(:password, 'another_random_password')

      expect(user.password_digest).to_not be(old_password_digest)
    end
  end

  describe 'with #session_token' do
    subject { FactoryBot.create(:user) }
    it { is_expected.to validate_presence_of :session_token }
  end

  describe 'generating #session_token' do
    let!(:user) { FactoryBot.create(:user) }

    it 'expects #reset_session_token! to generate new token' do
      old_session_token = user.session_token
      user.reset_session_token!

      expect(user.session_token).to_not be(old_session_token)
    end
  end

  it { is_expected.to have_many :created_workspaces }
  it { is_expected.to have_many :created_chatrooms }
  it { is_expected.to have_many :workspace_subs }
  it { is_expected.to have_many :workspaces }
  it { is_expected.to have_many :chatrooms }
  it { is_expected.to have_many :chatroom_subs }
  it { is_expected.to have_many :messages }
  it { is_expected.to have_many :favorites }
  it { is_expected.to have_many :reactions }
  it { is_expected.to have_many :appears }
  it { is_expected.to have_many :reads }
  it { is_expected.to have_many :pins }
end
