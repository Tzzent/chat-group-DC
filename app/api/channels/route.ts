import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
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
      name,
      description,
    } = body;

    const newChannel = await prisma.channel.create({
      data: {
        name,
        description,
        ownerId: currentUser.id,
        members: {
          connect: {
            id: currentUser.id
          }
        }
      },
      include: {
        members: true
      }
    });

    pusherServer.trigger(
      'channels',
      'channel:new',
      newChannel,
    )

    return NextResponse.json(newChannel);

  } catch (error: any) {
    return new NextResponse(
      error?.message || 'Internal error',
      { status: error?.status || 500 }
    );
  }
}


export async function GET(
  request: Request,
) {
  try {
    const url = new URL(request.url);

    const query = url.searchParams.get('query') as string;

    if (query) {
      const channels = await prisma.channel.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive',
              }
            },
            {
              description: {
                contains: query,
                mode: 'insensitive',
              }
            }
          ]
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return NextResponse.json(channels);
    }

    const page = parseInt(url.searchParams.get('page')!, 10) || 1;
    const limit = parseInt(url.searchParams.get('limit')!, 10) || 10;

    const channels = await prisma.channel.findMany({
      skip: (page - 1) * 10,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(channels);

  } catch (error: any) {
    return new NextResponse(
      error?.message || 'Internal error',
      { status: error?.status || 500 }
    );
  }
}