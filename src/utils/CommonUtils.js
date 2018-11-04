export const calculateAmountFromPercentage = (amount, percentage) => Math.round(percentage * amount) / 100;

export const formatRupees = number => {
  if (!isNaN(number)) {
    const money = new Intl.NumberFormat('en-IN').format(number);
    return money;
  }
  return '';
};

const elmYPosition = eID => {
  const elm = document.getElementById(eID);
  let y = elm.offsetTop;
  let node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
};

export const scrollToId = (id, offsetTop) => {
  const stopY = elmYPosition(id);
  const ofT = offsetTop || 0;
  window.scrollTo({
    top: stopY - ofT,
    behavior: 'smooth',
  });
};
export const formatDate = (date) => {
  let d = null;
  if (date) {
     d = new Date(date);
  } else {
    d = new Date();
  }
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const getUniqueID = () => {
  const x = Date.now();
  const y = parseInt(Math.random() * 1000, 10);
  const z = new Date().toString().substring(0, 3).toLocaleUpperCase();
  const z1 = (x.toString() + y.toString());
  return z + z1.substring(z1.length - 10, z1.length);
}
export default {
  calculateAmountFromPercentage,
  formatRupees,
  formatDate,
  scrollToId,
  getUniqueID,
};