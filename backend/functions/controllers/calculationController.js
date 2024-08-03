const { calculateFedTax } = require('../utils/calculateFedTax');
const { taxableIncome } = require('../utils/calculateTaxableIncome');
const { stateTaxes } = require('../utils/calculateStateTax');
const IncomeModel = require('../models/incomeModel');

const calculateTax = async (req, res) => {
  //   console.log(req.body);
  const incomeModel = new IncomeModel();
  incomeModel.setData(req.body);
  incomeModel.taxableIncome = await taxableIncome(incomeModel);
  incomeModel.fedTaxes = await calculateFedTax(incomeModel);
  incomeModel.netIncome = incomeModel.income - incomeModel.fedTaxes;
  incomeModel.stateTaxes = await stateTaxes(incomeModel);

  res.send({ incomeModel });
};

module.exports = { calculateTax };
