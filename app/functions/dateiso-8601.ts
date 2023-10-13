export default function dateISO8601(oldDate: string) {
  const date = new Date(oldDate);

  return date.toISOString();
}
