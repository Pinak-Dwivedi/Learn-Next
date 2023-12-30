import { v2 as cloudinary } from "cloudinary";

export default async function uploadImage(imageFile) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  const result = await cloudinary.uploader.upload(imageFile, {
    folder: "learn-next/profile-images",
    crop: "scale",
  });

  if (result?.public_id != null) return result;

  return false;
}
