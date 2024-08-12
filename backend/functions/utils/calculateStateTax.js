const { db } = require('../services/Firebase');

const stateTaxes = async (incomeModel) => {
  const taxBracketRef = db
    .collection('statesTaxInfo')
    .doc('2024')
    .collection('stateTaxes')
    .doc(incomeModel.state);

  const doc = await taxBracketRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    const filingStatus =
      incomeModel.filingStatus === 'single' || 'marriedSeperate'
        ? 'single'
        : 'married';
    const deductions = Object.entries(doc.data().deduction);
    const deductionAmount = deductions
      .map(([key, value]) => {
        if (key === filingStatus) {
          return value;
        }
      })
      .filter((value) => value !== undefined)[0];

    const taxableIncome = incomeModel.income - deductionAmount;
    console.log(taxableIncome);
    let taxBrackets = [];
    if (filingStatus === 'single') {
      taxBrackets = Object.values(doc.data().taxBracketsSingle);
    } else {
      taxBrackets = Object.values(doc.data().taxBracketsMarried);
    }

    let tax = 0;
    let remainingIncome = taxableIncome;
    let i = 0;
    let = minIncome = 0;

    while (remainingIncome > 0 && i < taxBrackets.length) {
      const bracket = taxBrackets[i];
      const { income, rate } = bracket;

      if (taxableIncome > income) {
        tax += (income - minIncome) * rate;
      } else {
        tax += (taxableIncome - minIncome) * rate;
        remainingIncome = 0;
      }

      minIncome = income;
      i++;
    }

    return tax;
  }
};

module.exports = { stateTaxes };
