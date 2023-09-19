import prisma from '@/app/libs/prismadb';

export default async function getMessages(
  channelId: string,
) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        channelId: channelId,
      },
      include: {
        sender: true
      }
    });

    return messages;
  } catch (error: any) {
    return [];
  }
}