import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { pusherServer } from '@/app/libs/pusher';

interface IParams {
  channelId?: string,
}

export async function GET(
  request: Request,
  {
    params
  }: {
    params: IParams
  }
) {
  try {
    const channel = await prisma.channel.findUnique({
      where: {
        id: params.channelId,
      },
      include: {
        owner: true,
        members: true
      }
    });

    return NextResponse.json(channel);

  } catch (error: any) {
    return new NextResponse(
      error?.message || 'Internal error',
      { status: error?.status || 500 }
    );
  }
}

export async function DELETE( // -> DELETE a channel with members and messages
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

    const channelDeleted = await prisma.channel.delete({
      where: {
        id: params.channelId,
        ownerId: currentUser.id,
      }
    });

    if (!channelDeleted) {
      throw { message: 'Invalid ChannelID', status: 400 };
    }

    pusherServer.trigger(
      'channels',
      'channel:remove',
      channelDeleted,
    );

    return NextResponse.json(channelDeleted);

  } catch (error: any) {
    return new NextResponse(
      error?.message || 'Internal error',
      { status: error?.status || 500 }
    );
  }
}