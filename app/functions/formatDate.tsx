import { format, isValid } from 'date-fns';

function formatDate(date: string | Date | number) {
  const parsed = date instanceof Date ? date : new Date(date);
  if (!isValid(parsed)) {
    return '';
  }
  return format(parsed, 'yyyy/MM/dd ');
}
export default formatDate;
