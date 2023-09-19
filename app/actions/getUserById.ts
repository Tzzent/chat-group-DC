import prisma from '@/app/libs/prismadb';

export default async function getUserById(
  profileId: string,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: profileId
      }
    });

    if (!user) {
      return null;
    }

    return user;

  } catch (error: any) {
    console.log('ERROR_GETTING_PROFILE', error);
    return null;
  }
}