export function convertDatetoNormalFormat(date: Date | string): string {
  const dateObject = new Date(date);

  if (isNaN(dateObject.getTime())) {
    console.error("Invalid date provided:", date);
    return "Invalid Date";
  }

  const year = dateObject.getFullYear();
  const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObject.getDate()).slice(-2);

  const formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}
