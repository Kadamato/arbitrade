import moment from "moment";

export default function getCurrentTime(): string {
  const currentTime = moment.utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
  return currentTime;
}
