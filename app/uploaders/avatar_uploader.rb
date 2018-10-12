class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def default_url(*args)
    "images/default/default.jpg"
  end

  process :resize_to_fit => [600, 600]

  version :thumb do
    process resize_to_fill: [36, 36]
  end

  def extension_whitelist
    %w(jpg jpeg gif png)
  end
end
