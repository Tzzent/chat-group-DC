import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { pusherServer } from '@/app/libs/pusher';

export async function POST(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      throw { message: 'Unauthorized', status: 401 };
    }

    const body = await request.json();
    const {
      message,
      channelId,
    } = body;

    const channel = await prisma.channel.findUnique({
      where: {
        id: channelId,
      }
    });

    if (!channel) {
      throw { message: 'Invalid channelID', status: 400 };
    }

    const isMember = channel.memberIds.find((memberId) => {
      return memberId === currentUser.id;
    });

    if (!isMember) {
      throw { message: 'Your not a member!', status: 401 }
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        channel: {
          connect: {
            id: channelId,
          }
        },
        sender: {
          connect: {
            id: currentUser.id,
          }
        },
      },
      include: {
        sender: true
      }
    });

    await prisma.channel.update({
      where: {
        id: channelId,
      },
      data: {
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        members: true,
      }
    });

    await pusherServer.trigger(
      channelId,
      'messages:new',
      newMessage,
    );

    return NextResponse.json(newMessage);

  } catch (error: any) {
    return new NextResponse(
      error?.message || 'Internal error',
      { status: error?.status || 500 }
    );
  }
}