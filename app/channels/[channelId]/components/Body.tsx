'use client';

import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { find } from 'lodash';

import { FullMessageType } from '@/app/types';
import DividingDate from './DividingDate';
import MessageBox from './MessageBox';
import EmptyBody from './EmptyBody';
import { pusherClient } from '@/app/libs/pusher';
import useChannel from '@/app/hooks/useChannel';

interface BodyProps {
  initialMessages: FullMessageType[],
}

export default function Body({
  initialMessages,
}: BodyProps) {
  const [messages, setMessages] = useState<FullMessageType[] | []>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { channelId } = useChannel();

  useEffect(() => {
    pusherClient.subscribe(channelId);

    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });

    const messageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => {
        if (find(current, { id: newMessage.id })) {
          return current;
        }

        return [...current, newMessage];
      });

      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    };

    pusherClient.bind(
      'messages:new',
      messageHandler,
    );

    return () => {
      pusherClient.unsubscribe(channelId);
      pusherClient.unbind(
        'messages:new',
        messageHandler,
      );
    };
  }, [
    channelId,
  ]);

  if (messages.length === 0) {
    return (
      <EmptyBody />
    )
  }

  return (
    <div
      className="
      p-5
      lg:px-20
      flex-1
      space-y-6
      overflow-y-auto
      scrollbar-thin
      scrollbar-thumb-rounded-full
      scrollbar-track-rounded-full
      scrollbar-thumb-gray-600 
      scrollbar-track-gray-950
      "
    >
      {
        messages?.map((message, idx) => (
          <React.Fragment key={message.id}>
            {
              (idx > 0 && format(new Date(message.createdAt), 'MMMM d, yyyy') !== format(new Date(messages[idx - 1].createdAt), 'MMMM d, yyyy'))
                ? (
                  <DividingDate date={format(new Date(message.createdAt), 'MMMM d, yyyy')} />
                ) : idx === 0 && (
                  <DividingDate date={format(new Date(message.createdAt), 'MMMM d, yyyy')} />
                )
            }
            <MessageBox key={idx} message={message} />
          </React.Fragment>
        ))
      }
      <div ref={bottomRef} className="pt-12" />
    </div>
  )
}
