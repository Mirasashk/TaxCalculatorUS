const { db } = require('../services/Firebase');

const calculateFedTax = async (incomeModel) => {
  //   const snapshot = await db.collection('federalTaxBrackets').doc('2024').get();

  const taxBracketRef = db.collection('federalTaxBrackets').doc('2024');
  const doc = await taxBracketRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    const data = doc.data();

    const taxBrackets = Object.values(data);

    const taxAmount = await calculations(
      incomeModel.taxableIncome,
      taxBrackets
    );

    return taxAmount;
  }
};

const calculations = (income, taxBrackets) => {
  let tax = 0;
  let remainingIncome = income;
  let i = 0;
  while (remainingIncome > 0) {
    const bracket = taxBrackets[i];
    const taxableIncome = Math.min(
      remainingIncome,
      bracket.maxValue - bracket.minValue
    );
    tax += taxableIncome * bracket.rate;
    remainingIncome -= taxableIncome;
    i++;
  }
  return tax;
};

module.exports = { calculateFedTax };
