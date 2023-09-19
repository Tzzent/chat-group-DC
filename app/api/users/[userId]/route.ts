import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import updateCldImage from '@/app/actions/updateCldImage';
import { uploadCldImage } from '@/app/actions/uploadCldImage';

interface IParams {
  userId?: string,
};

export async function PUT(
  request: Request,
  {
    params
  }: {
    params: IParams
  }
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.formData();

    const name = body.get('name') as string;
    const bio = body.get('bio') as string;
    const image = body.get('image') as string | File;

    if (
      !currentUser?.id || !currentUser?.email ||
      (currentUser?.id !== params.userId)
    ) {
      throw { message: 'Unauthorized', status: 401 };
    }
    
    let updatedUser = null;

    updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        name: name,
        bio: bio,
      }
    });

    if (typeof image === 'object') {
      let secure_url = null;

      if (updatedUser.image) {
        const public_id = updatedUser.image.match(/\/([^/]+)\.jpg$/)?.[1];

        if (public_id) {
          secure_url = await updateCldImage(image, `chat-group/${public_id}`);
        }

      } else {
        secure_url = await uploadCldImage(image);
      }

      updatedUser = await prisma.user.update({
        where: {
          id: currentUser.id
        },
        data: {
          image: secure_url
        }
      });

    }

    return NextResponse.json(updatedUser);

  } catch (error: any) {
    console.log('ERROR_UPDATE_USER', error);
    return new NextResponse(
      error?.message || 'Internal error',
      { status: error?.status || 500 }
    );
  }
}
