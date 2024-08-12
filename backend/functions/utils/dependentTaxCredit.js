const dependentTaxCredit = (incomeModel) => {
  const dependentCredit = 500;
  const dependentU18Credit = 2000;
  const dependentCount = parseInt(incomeModel.dependents);
  const dependentU18Count = parseInt(incomeModel.dependentsU18);

  let totalCredit =
    dependentU18Credit * dependentU18Count +
    dependentCredit * (dependentCount - dependentU18Count);

  if (dependentU18Count > 0) {
    if (
      (incomeModel.taxableIncome < 200000 &&
        incomeModel.filingStatus === 'single') ||
      (incomeModel.taxableIncome < 400000 &&
        incomeModel.filingStatus === 'marriedJointly')
    ) {
      return totalCredit;
    } else {
      if (incomeModel.filingStatus === 'single') {
        totalCredit -= (incomeModel.taxableIncome - 200000) * 0.05;
      }
      if (incomeModel.filingStatus === 'married') {
        totalCredit -= (incomeModel.taxableIncome - 400000) * 0.05;
      }

      if (totalCredit < 0) {
        return 0;
      } else {
        return totalCredit;
      }
    }
  }
  return totalCredit;
};

module.exports = { dependentTaxCredit };
