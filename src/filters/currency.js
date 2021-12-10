export const moneyFormat = function formatMoney(string) {
  const price = Number.prototype.toFixed.call(parseFloat(string) || 0, 2);
  return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};
