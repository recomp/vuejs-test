export const filterDate = function formatDate(string) {
  const date = new Date(string);
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  return `${dd < 10 ? '0' : ''}${dd}.${mm < 10 ? '0' : ''}${mm}.${yyyy}`;
};
