import { supabase } from "@/library/supabaseClient";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export async function uploadImageToStorage({
  file,
  bucket,
  folder,
  prefix,
  userId,
}: {
  file: File;
  bucket: string;
  folder: string;
  prefix: string;
  userId: number;
}) {
  if (!file) {
    throw new Error("No image file provided");
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Invalid image type. Please upload JPEG, PNG, GIF, or WebP");
  }

  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image size must be less than 5MB");
  }

  const buffer = await file.arrayBuffer();
  const extension = file.name.split(".").pop() || "jpg";
  const filename = `${prefix}-${userId}-${Date.now()}.${extension}`;
  const filePath = `${folder}/${filename}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  if (!data?.publicUrl) {
    throw new Error("Failed to generate image public URL");
  }

  return {
    filePath,
    publicUrl: data.publicUrl,
  };
}