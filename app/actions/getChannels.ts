import prisma from '@/app/libs/prismadb';

export default async function getChannels() {
  try {
    const channels = await prisma.channel.findMany({
      take: 20,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return channels;
  } catch (err) {
    return [];
  }
}