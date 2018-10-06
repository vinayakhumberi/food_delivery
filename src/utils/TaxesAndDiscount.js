import _ from 'lodash';
import { calculateAmountFromPercentage } from './CommonUtils';


export const calculateTaxesAndDiscount = (data, cartPrice) => {
  const activeData = _.filter(data, { 'active': 1 });
  const fixedData = _.filter(activeData, { 'mode': 'fixed' });
  const variableData = _.filter(activeData, { 'mode': 'variable' });
  const newVarData = _.forEach(variableData, function (value) {
    value.calPrice = calculateAmountFromPercentage(cartPrice, value.value);
  });
  const output = _.concat(newVarData, fixedData);
  const finalOutput = {};
  finalOutput.finalPayable = calculateFinalPrice(output, cartPrice);
  finalOutput.taxes = _.filter(output, { 'type': 'tax' });
  finalOutput.service_charge = _.filter(output, { 'type': 'service_charge' });
  return finalOutput;
};

export const calculateFinalPrice = (data, cartPrice) => {
  const additions = _.filter(data, { 'calculation': 'add' });
  const substractions = _.filter(data, { 'calculation': 'substract' });
  const addValue = _.reduce(additions, (sum, n) => {
    const waivePrice = n.waive ? 0 : (n.calPrice || n.value);
    return sum + waivePrice;
  }, 0);
  const substractValue = _.reduce(substractions, (sum, n) => {
    const waivePrice = n.waive ? 0 : (n.calPrice || n.value);
    return sum + waivePrice;
  }, 0);
  return Math.ceil(cartPrice + addValue - substractValue);
};
export default {
  calculateTaxesAndDiscount,
  calculateFinalPrice,
};