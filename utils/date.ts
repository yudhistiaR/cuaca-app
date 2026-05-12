export const getDateTime = (offset: string): string => {
  const now = new Date();

  const sign = offset.startsWith("+") ? 1 : -1;
  const hours = parseInt(offset.substring(1, 3));
  const minutes = parseInt(offset.substring(3, 5));

  const totalOffsetMs = sign * (hours * 60 + minutes) * 60 * 1000;

  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const targetDate = new Date(utc + totalOffsetMs);

  return targetDate
    .toLocaleString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(".", ":");
};

export const formatWeatherTime = (isoString: string) => {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    year: "numeric",
    minute: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(".", ":");
};

export const toAmPm = (isoString: string) => {
  const date = new Date(isoString);

  return date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    })
    .toLowerCase()
    .replace(" ", "");
};

export const simpleDate = (isoString: string) => {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
  }).format(date);
};
