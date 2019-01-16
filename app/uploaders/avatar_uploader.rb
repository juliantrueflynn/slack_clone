class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def default_url(*args)
    "images/default/" + [version_name, "default.jpg"].compact.join('_')
  end

  def extension_whitelist
    %w(jpg jpeg gif png)
  end

  version :banner do
    process :resize_to_fill => [500, 0]
  end

  version :thumb do
    process resize_to_fill: [36, 36]
  end

  version :large do
    process :resize_to_fill => [200, 200]
  end
end
