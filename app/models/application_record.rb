class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  # def render_to_json
  #   name = self.class.name.downcase
  #   pluralized = class_name.pluralize
  #   locals = Hash[pluralized, self]

  #   json = ApplicationController.render partial: "api/#{pluralized}/#{name}", locals: locals
  #   JSON.parse(json)
  # end
end
