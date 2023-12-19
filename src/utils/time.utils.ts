const getTimeElapsed = (timestamp: Date) => {
  const date = new Date(timestamp);
  const now = new Date();

  const elapsed = now.getTime() - date.getTime();
  const seconds = Math.floor(elapsed / 1000);

  if (seconds < 60) {
    return 'Now';
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min${minutes === 1 ? '' : 's '}Ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours === 1 ? '' : 's '}Ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days} day${days === 1 ? '' : 's '}Ago`;
  }
};

export const timeUtils = {
  getTimeElapsed,
};
