import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { pusherServer } from '@/app/libs/pusher';

interface IParams {
  channelId?: string,
}

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

    if (!currentUser?.id || !currentUser?.email) {
      throw { message: 'Unauthorized', status: 401 };
    }

    const channelUpdated = await prisma.channel.update({
      where: {
        id: params.channelId,
      },
      data: {
        members: {
          connect: {
            id: currentUser.id
          }
        }
      },
      include: {
        members: true,
        owner: true
      }
    });

    pusherServer.trigger(
      channelUpdated.id,
      'members:update',
      channelUpdated,
    );

    return NextResponse.json(channelUpdated);

  } catch (error: any) {
    return new NextResponse(
      error?.message || 'Internal error',
      { status: error?.status || 500 }
    );
  }
}