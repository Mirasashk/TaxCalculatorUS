const { db } = require('../services/Firebase');

const taxableIncome = async (incomeModel) => {
  let deductionAmount = 0;
  if (incomeModel.stdDeduction == true) {
    const deductionsRef = db.collection('deductions').doc('2024');
    const doc = (await deductionsRef.get()).data();
    const deductions = Object.entries(doc.stdDeduction);

    [deductionAmount] = deductions.map(([key, value]) => {
      if (key === incomeModel.filingStatus) {
        return value;
      }
    });
  } else {
    deductionAmount = incomeModel.itemizedDeduction;
  }
  return incomeModel.income - deductionAmount;
};

module.exports = { taxableIncome };
