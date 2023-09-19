import {
  formatDistanceToNow,
  format,
} from 'date-fns';
import { useCallback } from 'react';

export default function useFormatMessageDate() {

  const formatMessageDate = useCallback((date: Date) => {
    const timeAgo = formatDistanceToNow(date,
      {
        addSuffix: true
      });

    const formattedTime = format(date, 'h:mm a');

    return `${timeAgo} at ${formattedTime}`;

  }, []);

  return {
    formatMessageDate
  }
}