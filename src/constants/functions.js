
export function formatDate(date, withTime) {
  const dateOptions = { month: '2-digit', day: '2-digit', year: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const options = withTime ? { ...dateOptions, ...timeOptions } : dateOptions;
  return date ? new Intl.DateTimeFormat(undefined, options).format(date.toDate ? date.toDate() : null) : 'n/a';
}
