const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async ({ file, publicId }) => {
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(file, {
      public_id: publicId,
      overwrite: true,
      invalidate: true,
    })
    .catch((error) => {
      console.log(error);
    });

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url(uploadResult.public_id, {
    fetch_format: "auto",
    quality: "auto",
    version: uploadResult.version,
  });

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url(uploadResult.public_id, {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
    version: uploadResult.version,
  });

  return autoCropUrl;
};

module.exports = uploadToCloudinary;
