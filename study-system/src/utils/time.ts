export function formatUtcTime(_utcTime: string) {
    let date = new Date(_utcTime);
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
      " " +
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
      ":" +
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":" +
      (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
    );
}

export function checkDate(_dateStr: string) {
  var a = /^(\d{4})-(\d{2})-(\d{2}) (\d(2)):(\d(2)):(\d(2))$/
  if (!a.test(_dateStr)) {
    return false
  } else{
      return true;
  }
}
  