class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def generate_slug
    loop do
      self.slug = SecureRandom.hex(10)
      break unless self.class.where(slug: slug).exists?
    end
  end

  def has_custom_class_name?
    self.respond_to?(:class_name)
  end

  def payload_name
    (has_custom_class_name? ? class_name : self.class.name).underscore
  end

  def action_type(action = nil)
    type = payload_name
    type << "_#{action}" if action
    type << "_RECEIVE"
    type.upcase
  end

  def broadcast_create
    broadcast 'create'
  end

  def broadcast_update
    broadcast 'update'
  end

  def broadcast_destroy
    broadcast 'destroy'
  end

  def broadcast(type = nil)
    ActionDispatcherJob.perform_later(action_type(type), self) unless skip_broadcast?
  end

  private

  def skip_broadcast?
    !!self.skip_broadcast
  end
end
