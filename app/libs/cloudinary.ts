import {
  v2 as cloudinary,
  UploadApiResponse,
} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
});

export async function updateCloudinaryPhoto(
  photoPath: string,
  public_id: string,
): Promise<UploadApiResponse> {
  try {
    const deleted = await deleteCloudinaryPhoto(public_id);

    if (!deleted) {
      throw new Error('Error removing cloudinary photo!');
    }

    const result = await uploadPhotoToCloudinary(photoPath);

    return result;

  } catch (error: any) {
    throw new Error('Error updating cloudinary photo!', error);
  }
}

export async function uploadPhotoToCloudinary(
  photoPath: string,
): Promise<UploadApiResponse> {
  try {
    const result = await cloudinary.uploader.upload(photoPath, {
      folder: 'chat-group'
    })

    return result;

  } catch (error: any) {
    throw new Error('Error uploading photo to cloudinary!', error);
  }
}

export async function deleteCloudinaryPhoto(
  public_id: string,
): Promise<boolean> {
  try {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result === 'ok') {
      return true;
    }

    return false;
  } catch (error: any) {
    throw new Error('Error removing cloudinary photo!', error);
  }
}
