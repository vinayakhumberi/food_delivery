import { filter, reduce, concat,forEach } from 'lodash';
import { calculateAmountFromPercentage } from './CommonUtils';


export const calculateTaxesAndDiscount = (data, cartPrice) => {
  const activeData = filter(data, { 'active': 1 });
  const fixedData = filter(activeData, { 'mode': 'fixed' });
  const variableData = filter(activeData, { 'mode': 'variable' });
  const newVarData = forEach(variableData, function (value) {
    value.calPrice = calculateAmountFromPercentage(cartPrice, value.value);
  });
  const output = concat(newVarData, fixedData);
  const finalOutput = {};
  finalOutput.finalPayable = calculateFinalPrice(output, cartPrice);
  finalOutput.taxes = filter(output, { 'type': 'tax' });
  finalOutput.service_charge = filter(output, { 'type': 'service_charge' });
  return finalOutput;
};

export const calculateFinalPrice = (data, cartPrice) => {
  const additions = filter(data, { 'calculation': 'add' });
  const substractions = filter(data, { 'calculation': 'substract' });
  const addValue = reduce(additions, (sum, n) => {
    const waivePrice = n.waive ? 0 : (n.calPrice || n.value);
    return sum + waivePrice;
  }, 0);
  const substractValue = reduce(substractions, (sum, n) => {
    const waivePrice = n.waive ? 0 : (n.calPrice || n.value);
    return sum + waivePrice;
  }, 0);
  return Math.ceil(cartPrice + addValue - substractValue);
};
export default {
  calculateTaxesAndDiscount,
  calculateFinalPrice,
};
