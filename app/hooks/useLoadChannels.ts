import axios from 'axios';
import { Channel } from '@prisma/client';
import { useState } from 'react';

const LIMIT = 10;

interface Response {
  hasNextPage: boolean,
  data: Channel[],
}

async function loadChannels(
  page: number
): Promise<Response> {
  console.log('loadChannels')
  try {
    const response = await axios.get(
      `/api/channels?page=${page}&limit=${LIMIT}`
    );
    const channels: Channel[] = await response.data;
    console.log(channels);

    const hasNextPage = channels.length === LIMIT;

    return {
      hasNextPage,
      data: channels,
    };
  } catch (error) {
    throw error;
  }
}

export function useLoadChannels() {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setChannels] = useState<Channel[] | []>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  async function loadMore() {
    console.log('loadMore')
    if (loading || !hasNextPage) {
      return;
    }

    setLoading(true);
    try {
      const {
        data,
        hasNextPage: newHasNextPage,
      } = await loadChannels(
        items.length / LIMIT,
      );
      setChannels((current) => [...current, ...data]);
      setHasNextPage(newHasNextPage);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    items,
    hasNextPage,
    error,
    loadMore,
  };
}