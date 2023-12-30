import { v2 as cloudinary } from "cloudinary";

export default async function deleteImage(publicId) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  const imageDeleteResult = await cloudinary.uploader.destroy(publicId);

  if (imageDeleteResult?.result === "ok") return imageDeleteResult;

  return false;
}
