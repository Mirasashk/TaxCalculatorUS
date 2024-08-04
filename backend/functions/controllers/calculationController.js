const { calculateFedTax } = require('../utils/calculateFedTax');
const { taxableIncome } = require('../utils/calculateTaxableIncome');
const { stateTaxes } = require('../utils/calculateStateTax');
const { dependentTaxCredit } = require('../utils/dependentTaxCredit');
const IncomeModel = require('../models/incomeModel');

const calculateTax = async (req, res) => {
  console.log(req.body);
  const incomeModel = new IncomeModel();
  incomeModel.setData(req.body);
  console.log(incomeModel);
  incomeModel.taxableIncome = await taxableIncome(incomeModel);
  incomeModel.fedTaxes = await calculateFedTax(incomeModel);
  incomeModel.stateTaxes = await stateTaxes(incomeModel);
  if (incomeModel.hasDependents) {
    incomeModel.dependentTaxCredit = dependentTaxCredit(incomeModel);
  }

  incomeModel.netIncome =
    incomeModel.income -
    incomeModel.fedTaxes -
    incomeModel.stateTaxes +
    incomeModel.dependentTaxCredit;

  incomeModel.effectiveTaxRate =
    (1 - incomeModel.netIncome / incomeModel.income) * 100;

  res.send({ incomeModel });
};

module.exports = { calculateTax };
