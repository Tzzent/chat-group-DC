import { uploadPhotoToCloudinary } from '../libs/cloudinary';
import { deletePhotoFromLocal, savePhotoToLocal } from '../libs/localFileActions';

export async function uploadCldImage(
  image: File,
): Promise<string> {
  try {
    const { filePath } = await savePhotoToLocal(image);

    const { secure_url } = await uploadPhotoToCloudinary(filePath);

    await deletePhotoFromLocal(filePath);

    return secure_url;

  } catch (error: any) {
    throw new Error('Error in uploadCldImage()');
  }
}