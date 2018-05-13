require 'oj'

require 'multi_json'
MultiJson.use :oj

unless Rails.env.production?
  MultiJson.dump_options = {:pretty=>true}
end

Jbuilder.key_format camelize: :lower