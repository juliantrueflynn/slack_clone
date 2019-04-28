require 'rails_helper'

RSpec.describe Favorite, type: :model do
  it { is_expected.to belong_to :workspace }
  it { is_expected.to belong_to :message }
  it { is_expected.to belong_to :user }
end
