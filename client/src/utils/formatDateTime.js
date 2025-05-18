import { format, subDays } from "date-fns";

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert to 12-hour format
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHour}:${formattedMinutes} ${ampm}`;
};

export const insertDateDividers = (messages) => {
  const result = [];
  let lastDate = null;

  const todayDate = format(new Date(), "yyyy-MM-dd");
  const yesterdayDate = format(subDays(new Date(), 1), "yyyy-MM-dd");

  messages.forEach((msg) => {
    const messageDate = format(new Date(msg.time), "yyyy-MM-dd");

    if (messageDate !== lastDate) {
      let dateLabel = format(new Date(msg.time), "MMMM d, yyyy"); // default full date

      if (messageDate === todayDate) {
        dateLabel = "Today";
      } else if (messageDate === yesterdayDate) {
        dateLabel = "Yesterday";
      }

      result.push({
        type: "date",
        date: dateLabel,
        id: `divider-${dateLabel}`
      });

      lastDate = messageDate;
    }

    result.push(msg);
  });

  return result;
};
