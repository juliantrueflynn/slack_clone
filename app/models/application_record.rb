class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

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
    ActionDispatcherJob.perform_now(self, action, params)
  end

  private

  def skip_broadcast?
    return unless self.class.method_defined? :skip_broadcast
    !!self.skip_broadcast
  end
end
