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

    //console.log(taxBrackets);

    const taxAmount = await calculations(
      incomeModel.taxableIncome,
      taxBrackets
    );
    //console.log(taxAmount);
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
    console.log(taxableIncome * bracket.rate);
    remainingIncome -= taxableIncome;

    i++;
  }
  return tax;
};

module.exports = { calculateFedTax };

const taxBracketsSample = [
  { min: 0, max: 10000, rate: 0.1 },
  { min: 10000, max: 50000, rate: 0.2 },
  { min: 50000, max: Infinity, rate: 0.3 },
];
