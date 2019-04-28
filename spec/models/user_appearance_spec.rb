require 'rails_helper'

RSpec.describe UserAppearance, type: :model do
  it { is_expected.to validate_inclusion_of(:status).in_array(UserAppearance::STATUS) }

  it { is_expected.to belong_to :workspace }
  it { is_expected.to belong_to :user }
end
