const UnixTimestampToHumanReadable = (unixTimestamp) => {
  const dtObject = new Date(unixTimestamp * 1000);

  // Format the Date object as a human-readable string with the month name
  const options = {
    year: "numeric",
    month: "long", // Use 'long' for the full month name, 'short' for the abbreviated name
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Use true for 12-hour format, false for 24-hour format
  };

  const humanReadableDateTime = dtObject.toLocaleString("en-US", options);

  return <span>{humanReadableDateTime}</span>;
};

export default UnixTimestampToHumanReadable;
