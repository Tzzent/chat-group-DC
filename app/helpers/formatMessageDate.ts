import {
  isToday,
  isYesterday,
  formatDistanceToNow,
  format,
} from 'date-fns';

export default function formatMessageDate(
  date: Date,
): string {
  let timeAgo = null;

  if (isToday(date)) {
    timeAgo = 'today';
  } else if (isYesterday(date)) {
    timeAgo = 'yesterday';
  } else {
    timeAgo = formatDistanceToNow(new Date(date), {
      addSuffix: false,
      includeSeconds: false,
    });
  }

  const formattedTime = format(new Date(date), 'h:mm a');

  return `${timeAgo} at ${formattedTime}`;
}
