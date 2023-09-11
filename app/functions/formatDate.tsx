import { format } from 'date-fns';

function formatDate(date: string) {
  const date1 = new Date(date);
  return format(new Date(date), 'yyyy/MM/dd ');
}
export default formatDate;
