import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
    } = body;

    if (!email || !name || !password) {
      throw { message: 'Invalid credentials', status: 400 };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      }
    });

    return NextResponse.json(user);

  } catch (error: any) {
    console.log('REGISTRATION_ERROR', error);
    return new NextResponse(
      error?.message || 'Internal error',
      { status: error?.status || 500 }
    );
  }
};