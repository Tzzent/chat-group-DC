import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import os from 'os';

export async function savePhotoToLocal(
  file: File
): Promise<{
  filePath: string, fileName: string
}> {
  try {
    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);

    const name = uuidv4();
    const extention = file.type.split('/')[1];

    const temporalDir = os.tmpdir();
    const uploadDir = path.join(
      temporalDir,
      `/${name}.${extention}`,
    );

    await new Promise<void>((res, rej) => {
      fs.writeFile(uploadDir, buffer, (err) => {
        if (err) {
          rej(err);
        }

        res();
      });
    })
    return {
      filePath: uploadDir,
      fileName: file.name,
    }

  } catch (error) {
    throw new Error('Error saving photo to local!');
  }
}


export async function deletePhotoFromLocal(pathName: string) {
  fs.unlink(pathName, (err) => {
    if (err) {
      throw err;
    }
  });
}
