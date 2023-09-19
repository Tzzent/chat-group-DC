import { useEffect, useMemo, useState, } from 'react';
import { FullChannelType } from '../types';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function useChannel() {
  const [channel, setChannel] = useState<FullChannelType | null>(null);
  const params = useParams();

  const channelId = useMemo(() => {
    if (!params?.channelId) {
      return '';
    }

    return params.channelId as string;
  }, [params?.channelId]);

  const isOpen = useMemo(() => {
    return !!channelId;
  }, [channelId]);

  useEffect(() => {
    axios.get(`/api/channels/${channelId}`)
      .then((response) => setChannel(response.data))
      .catch((err) => setChannel(null));
  }, [channelId]);

  return useMemo(() => ({
    isOpen,
    channelId,
    channel,
  }), [
    isOpen,
    channelId,
    channel,
  ]);
}