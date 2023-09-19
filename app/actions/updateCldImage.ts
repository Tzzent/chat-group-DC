import { updateCloudinaryPhoto } from '../libs/cloudinary';
import {
  deletePhotoFromLocal,
  savePhotoToLocal
} from '../libs/localFileActions';

export default async function updateCldImage(
  image: File,
  public_id: string,
): Promise<string | null> {
  try {
    const { filePath } = await savePhotoToLocal(image);

    const { secure_url } = await updateCloudinaryPhoto(filePath, public_id);

    await deletePhotoFromLocal(filePath);

    return secure_url as string;

  } catch (error: any) {
    throw new Error('Error in updateCldImage()');
  }
}