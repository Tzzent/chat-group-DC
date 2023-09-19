import {
  Channel,
  Message,
  User,
} from '@prisma/client';

export type FullChannelType = Channel & {
  members: User[],
  owner: User,
}

export type FullMessageType = Message & {
  sender: User,
}