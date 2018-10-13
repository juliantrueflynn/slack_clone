class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def generate_slug
    loop do
      self.slug = SecureRandom.hex(12)
      break unless self.class.where(slug: slug).exists?
    end
  end

  def broadcast_create(**params)
    broadcast 'create', params
  end

  def broadcast_update(**params)
    broadcast 'update', params
  end

  def broadcast_destroy(**params)
    broadcast 'destroy', params
  end

  def broadcast(action, **params)
    return if skip_broadcast?
    ActionDispatcherJob.perform_later(self, action, params)
  end

  private

  def skip_broadcast?
    return unless self.class.method_defined? :skip_broadcast
    !!self.skip_broadcast
  end
end
