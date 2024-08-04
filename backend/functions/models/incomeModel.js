class IncomeModel {
  constructor(
    income,
    taxableIncome,
    netIncome,
    fedTaxes,
    stateTaxes,
    effectiveTaxRate,
    stdDeduction,
    itemizedDeduction,
    incomeType,
    incomePeriod,
    state,
    filingStatus,
    hasDependents,
    dependents,
    dependentsU18,
    dependentTaxCredit
  ) {
    this.income = income;
    this.taxableIncome = taxableIncome;
    this.netIncome = netIncome;
    this.fedTaxes = fedTaxes;
    this.stateTaxes = stateTaxes;
    this.effectiveTaxRate = effectiveTaxRate;
    this.stdDeduction = stdDeduction;
    this.itemizedDeduction = itemizedDeduction;
    this.incomeType = incomeType;
    this.incomePeriod = incomePeriod;
    this.state = state;
    this.filingStatus = filingStatus;
    this.hasDependents = hasDependents;
    this.dependents = dependents;
    this.dependentsU18 = dependentsU18;
    this.dependentTaxCredit = dependentTaxCredit;
  }

  setData(data) {
    this.income = Number(data.income);
    this.taxableIncome = 0;
    this.netIncome = 0;
    this.fedTaxes = 0;
    this.stateTaxes = 0;
    this.effectiveTaxRate = 0;
    this.stdDeduction = data.stdDeduction;
    this.itemizedDeduction = data.itemizedDeduction;
    this.incomeType = data.incomeType;
    this.incomePeriod = data.incomePeriod;
    this.state = data.state;
    this.filingStatus = data.filingStatus;
    this.hasDependents = data.hasDependents;
    this.dependents = data.dependents;
    this.dependentsU18 = data.dependentsU18;
    this.dependentTaxCredit = 0;
  }
}

module.exports = IncomeModel;
