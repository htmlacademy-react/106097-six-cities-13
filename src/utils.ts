export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const months = new Map<number, string>([
  [1, 'January'],
  [2, 'February'],
  [3, 'March'],
  [4, 'April'],
  [5, 'May'],
  [6, 'June'],
  [7, 'July'],
  [8, 'August'],
  [9, 'September'],
  [10, 'October'],
  [11, 'November'],
  [12, 'December'],
]);

export function formatDate(date: string) {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = months.get(dateObject.getMonth());
  return {
    'year': year,
    'month': month
  };
}
