module Concerns
  module Sluggable
    extend ActiveSupport::Concern

    included do
      before_validation :generate_slug, on: :create
    end

    private

    def generate_slug
      return if slug?
      self.slug = SecureRandom.hex(12)
    end
  end
end
