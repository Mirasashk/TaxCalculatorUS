const dependentTaxCredit = (incomeModel) => {
  const dependentCredit = 500;
  const dependentU18Credit = 2000;
  const dependentCount = incomeModel.dependents;
  const dependentU18Count = incomeModel.dependentsU18;
  if (dependentU18Count > 0) {
    return (
      dependentU18Credit * dependentU18Count +
      dependentCredit * (dependentCount - dependentU18Count)
    );
  }

  return dependentCredit * dependentCount;
};

module.exports = { dependentTaxCredit };
