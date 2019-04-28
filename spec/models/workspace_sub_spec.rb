require 'rails_helper'

RSpec.describe WorkspaceSub, type: :model do
  it { is_expected.to belong_to :workspace }
  it { is_expected.to belong_to :user }
end
