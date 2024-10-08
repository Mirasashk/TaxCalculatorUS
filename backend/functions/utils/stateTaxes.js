const stateTaxes = {
  dataFrom:
    'https://taxfoundation.org/data/all/state/state-income-tax-rates-2024/',

  Alabama: {
    deduction: {
      single: 4803,
      married: 8500,
    },
    taxBracketsSingle: [
      { rate: 0.02, income: 500 },
      { rate: 0.04, income: 3000 },
      { rate: 0.05, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.02, income: 1000 },
      { rate: 0.04, income: 6000 },
      { rate: 0.05, income: 9999999999 },
    ],
  },
  Alaska: {
    deduction: {
      single: 0,
      married: 0,
    },
    taxBracketsSingle: [{ rate: 0.0, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0, income: 9999999999 }],
  },
  Arizona: {
    deduction: {
      single: 14600,
      married: 29200,
    },
    taxBracketsSingle: [{ rate: 0.02, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.02, income: 9999999999 }],
  },

  Arkansas: {
    deduction: {
      single: 2340,
      married: 4680,
    },
    taxBracketsSingle: [
      { rate: 0.02, income: 4400 },
      { rate: 0.04, income: 8800 },
      { rate: 0.044, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.02, income: 4400 },
      { rate: 0.04, income: 8800 },
      { rate: 0.044, income: 9999999999 },
    ],
  },

  California: {
    deduction: {
      single: 5363,
      married: 10726,
    },
    taxBracketsSingle: [
      { rate: 0.01, income: 10412 },
      { rate: 0.02, income: 24684 },
      { rate: 0.04, income: 38959 },
      { rate: 0.06, income: 54081 },
      { rate: 0.08, income: 68350 },
      { rate: 0.093, income: 349137 },
      { rate: 0.103, income: 418961 },
      { rate: 0.113, income: 698271 },
      { rate: 0.123, income: 1000000 },
      { rate: 0.133, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.01, income: 20824 },
      { rate: 0.02, income: 49368 },
      { rate: 0.04, income: 77918 },
      { rate: 0.06, income: 108162 },
      { rate: 0.08, income: 136700 },
      { rate: 0.093, income: 698274 },
      { rate: 0.103, income: 837922 },
      { rate: 0.113, income: 1000000 },
      { rate: 0.123, income: 1396542 },
      { rate: 0.133, income: 9999999999 },
    ],
  },

  Colorado: {
    deduction: {
      single: 14600,
      married: 29200,
    },
    taxBracketsSingle: [{ rate: 0.044, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.044, income: 9999999999 }],
  },

  Connecticut: {
    deduction: {
      single: 15000,
      married: 24000,
    },
    taxBracketsSingle: [
      { rate: 0.02, income: 10000 },
      { rate: 0.045, income: 50000 },
      { rate: 0.055, income: 100000 },
      { rate: 0.06, income: 200000 },
      { rate: 0.065, income: 250000 },
      { rate: 0.069, income: 500000 },
      { rate: 0.0699, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.02, income: 20000 },
      { rate: 0.045, income: 100000 },
      { rate: 0.055, income: 200000 },
      { rate: 0.06, income: 400000 },
      { rate: 0.065, income: 500000 },
      { rate: 0.069, income: 1000000 },
      { rate: 0.0699, income: 9999999999 },
    ],
  },

  Delaware: {
    deduction: {
      single: 3250,
      married: 6500,
    },
    taxBracketsSingle: [
      { rate: 0.0, income: 2000 },
      { rate: 0.022, income: 5000 },
      { rate: 0.039, income: 10000 },
      { rate: 0.048, income: 20000 },
      { rate: 0.052, income: 25000 },
      { rate: 0.0555, income: 60000 },
      { rate: 0.066, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0, income: 2000 },
      { rate: 0.022, income: 5000 },
      { rate: 0.039, income: 10000 },
      { rate: 0.048, income: 20000 },
      { rate: 0.052, income: 25000 },
      { rate: 0.0555, income: 60000 },
      { rate: 0.066, income: 9999999999 },
    ],
  },

  Florida: {
    deduction: {
      single: 0,
      married: 0,
    },
    taxBracketsSingle: [{ rate: 0.0, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0, income: 9999999999 }],
  },

  Georgia: {
    deduction: {
      single: 12000,
      married: 24000,
    },
    taxBracketsSingle: [{ rate: 0.0549, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0549, income: 9999999999 }],
  },

  Hawaii: {
    deduction: {
      single: 2200,
      married: 4400,
    },
    taxBracketsSingle: [
      { rate: 0.014, income: 2400 },
      { rate: 0.032, income: 4800 },
      { rate: 0.055, income: 9600 },
      { rate: 0.064, income: 14400 },
      { rate: 0.068, income: 19200 },
      { rate: 0.072, income: 24000 },
      { rate: 0.076, income: 36000 },
      { rate: 0.079, income: 48000 },
      { rate: 0.0825, income: 150000 },
      { rate: 0.09, income: 175000 },
      { rate: 0.1, income: 200000 },
      { rate: 0.11, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.014, income: 4800 },
      { rate: 0.032, income: 9600 },
      { rate: 0.055, income: 19200 },
      { rate: 0.064, income: 28800 },
      { rate: 0.068, income: 38400 },
      { rate: 0.072, income: 48000 },
      { rate: 0.076, income: 72000 },
      { rate: 0.079, income: 96000 },
      { rate: 0.0825, income: 300000 },
      { rate: 0.09, income: 350000 },
      { rate: 0.1, income: 400000 },
      { rate: 0.11, income: 9999999999 },
    ],
  },

  Idaho: {
    deduction: {
      single: 14600,
      married: 29200,
    },
    taxBracketsSingle: [
      { rate: 0.0, income: 4489 },
      { rate: 0.058, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0, income: 8978 },
      { rate: 0.058, income: 9999999999 },
    ],
  },

  Illinois: {
    deduction: {
      single: 2775,
      married: 5550,
    },
    taxBracketsSingle: [{ rate: 0.0495, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0495, income: 9999999999 }],
  },

  Indiana: {
    deduction: {
      single: 1000,
      married: 2000,
    },
    taxBracketsSingle: [{ rate: 0.0305, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0305, income: 9999999999 }],
  },

  Iowa: {
    deduction: {
      single: 0,
      married: 0,
    },
    taxBracketsSingle: [
      { rate: 0.044, income: 6210 },
      { rate: 0.0482, income: 31050 },
      { rate: 0.057, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.044, income: 12420 },
      { rate: 0.0482, income: 62100 },
      { rate: 0.057, income: 9999999999 },
    ],
  },

  Kansas: {
    deduction: {
      single: 3500,
      married: 8000,
    },
    taxBracketsSingle: [
      { rate: 0.031, income: 15000 },
      { rate: 0.0525, income: 30000 },
      { rate: 0.057, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.031, income: 30000 },
      { rate: 0.0525, income: 60000 },
      { rate: 0.057, income: 9999999999 },
    ],
  },

  Kentucky: {
    deduction: {
      single: 3160,
      married: 6320,
    },
    taxBracketsSingle: [{ rate: 0.04, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.04, income: 9999999999 }],
  },

  Louisiana: {
    deduction: {
      single: 4500,
      married: 9000,
    },
    taxBracketsSingle: [
      { rate: 0.0185, income: 12500 },
      { rate: 0.035, income: 50000 },
      { rate: 0.0425, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0185, income: 25000 },
      { rate: 0.035, income: 100000 },
      { rate: 0.0425, income: 9999999999 },
    ],
  },

  Maine: {
    deduction: {
      single: 14600,
      married: 29200,
    },
    taxBracketsSingle: [
      { rate: 0.058, income: 26050 },
      { rate: 0.0675, income: 61600 },
      { rate: 0.0715, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.058, income: 52100 },
      { rate: 0.0675, income: 123250 },
      { rate: 0.0715, income: 9999999999 },
    ],
  },

  Maryland: {
    deduction: {
      single: 2550,
      married: 5150,
    },
    taxBracketsSingle: [
      { rate: 0.02, income: 1000 },
      { rate: 0.03, income: 2000 },
      { rate: 0.04, income: 3000 },
      { rate: 0.0475, income: 100000 },
      { rate: 0.05, income: 125000 },
      { rate: 0.0525, income: 150000 },
      { rate: 0.055, income: 250000 },
      { rate: 0.0575, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.02, income: 1000 },
      { rate: 0.03, income: 2000 },
      { rate: 0.04, income: 3000 },
      { rate: 0.0475, income: 150000 },
      { rate: 0.05, income: 175000 },
      { rate: 0.0525, income: 225000 },
      { rate: 0.055, income: 300000 },
      { rate: 0.0575, income: 9999999999 },
    ],
  },

  Massachusetts: {
    deduction: {
      single: 4400,
      married: 8800,
    },
    taxBracketsSingle: [
      { rate: 0.05, income: 1000000 },
      { rate: 0.09, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.05, income: 1000000 },
      { rate: 0.09, income: 9999999999 },
    ],
  },

  Michigan: {
    deduction: {
      single: 5600,
      married: 11200,
    },
    taxBracketsSingle: [{ rate: 0.0425, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0425, income: 9999999999 }],
  },

  Minnesota: {
    deduction: {
      single: 14575,
      married: 29150,
    },
    taxBracketsSingle: [
      { rate: 0.0535, income: 31690 },
      { rate: 0.068, income: 104090 },
      { rate: 0.0785, income: 193240 },
      { rate: 0.0985, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0535, income: 46330 },
      { rate: 0.068, income: 184040 },
      { rate: 0.0785, income: 321450 },
      { rate: 0.0985, income: 9999999999 },
    ],
  },

  Mississippi: {
    deduction: {
      single: 2300,
      married: 4600,
    },
    taxBracketsSingle: [
      { rate: 0.0, income: 10000 },
      { rate: 0.047, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0, income: 10000 },
      { rate: 0.047, income: 9999999999 },
    ],
  },

  Missouri: {
    deduction: {
      single: 14600,
      married: 29200,
    },
    taxBracketsSingle: [
      { rate: 0.0, income: 1273 },
      { rate: 0.02, income: 2546 },
      { rate: 0.025, income: 3819 },
      { rate: 0.03, income: 5092 },
      { rate: 0.035, income: 6365 },
      { rate: 0.04, income: 7638 },
      { rate: 0.045, income: 8911 },
      { rate: 0.048, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0, income: 1207 },
      { rate: 0.02, income: 2414 },
      { rate: 0.025, income: 3621 },
      { rate: 0.03, income: 4828 },
      { rate: 0.035, income: 6035 },
      { rate: 0.04, income: 7242 },
      { rate: 0.045, income: 8449 },
      { rate: 0.048, income: 9999999999 },
    ],
  },

  Montana: {
    deduction: {
      single: 14600,
      married: 29200,
    },
    taxBracketsSingle: [
      { rate: 0.047, income: 20500 },
      { rate: 0.059, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.047, income: 41000 },
      { rate: 0.059, income: 9999999999 },
    ],
  },

  Nebraska: {
    deduction: {
      single: 7900,
      married: 15800,
    },
    taxBracketsSingle: [
      { rate: 0.0246, income: 3700 },
      { rate: 0.0351, income: 22170 },
      { rate: 0.0501, income: 35730 },
      { rate: 0.0584, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0246, income: 7390 },
      { rate: 0.0351, income: 44350 },
      { rate: 0.0501, income: 71460 },
      { rate: 0.0584, income: 9999999999 },
    ],
  },

  Nevada: {
    deduction: {
      single: 0,
      married: 0,
    },
    taxBracketsSingle: [{ rate: 0.0, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0, income: 9999999999 }],
  },

  'New Hampshire': {
    deduction: {
      single: 0,
      married: 0,
    },
    taxBracketsSingle: [{ rate: 0.0, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0, income: 9999999999 }],
  },

  'New Jersey': {
    deduction: {
      single: 1000,
      married: 2000,
    },
    taxBracketsSingle: [
      { rate: 0.014, income: 20000 },
      { rate: 0.0175, income: 35000 },
      { rate: 0.035, income: 40000 },
      { rate: 0.0553, income: 75000 },
      { rate: 0.0637, income: 500000 },
      { rate: 0.0897, income: 1000000 },
      { rate: 0.1075, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.014, income: 20000 },
      { rate: 0.0175, income: 50000 },
      { rate: 0.0245, income: 70000 },
      { rate: 0.035, income: 80000 },
      { rate: 0.0553, income: 150000 },
      { rate: 0.0637, income: 500000 },
      { rate: 0.0897, income: 1000000 },
      { rate: 0.1075, income: 9999999999 },
    ],
  },

  'New Mexico': {
    deduction: {
      single: 14600,
      married: 29200,
    },
    taxBracketsSingle: [
      { rate: 0.017, income: 5500 },
      { rate: 0.032, income: 11000 },
      { rate: 0.047, income: 16000 },
      { rate: 0.049, income: 210000 },
      { rate: 0.059, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.017, income: 8000 },
      { rate: 0.032, income: 16000 },
      { rate: 0.047, income: 24000 },
      { rate: 0.049, income: 315000 },
      { rate: 0.059, income: 9999999999 },
    ],
  },

  'New York': {
    deduction: {
      single: 8000,
      married: 16050,
    },
    taxBracketsSingle: [
      { rate: 0.04, income: 8500 },
      { rate: 0.045, income: 11700 },
      { rate: 0.0525, income: 13900 },
      { rate: 0.055, income: 80650 },
      { rate: 0.06, income: 215400 },
      { rate: 0.0685, income: 1077550 },
      { rate: 0.0965, income: 5000000 },
      { rate: 0.103, income: 25000000 },
      { rate: 0.109, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.04, income: 17150 },
      { rate: 0.045, income: 23600 },
      { rate: 0.0525, income: 27900 },
      { rate: 0.055, income: 161550 },
      { rate: 0.06, income: 323200 },
      { rate: 0.0685, income: 2155350 },
      { rate: 0.0965, income: 5000000 },
      { rate: 0.103, income: 25000000 },
      { rate: 0.109, income: 9999999999 },
    ],
  },

  'North Carolina': {
    deduction: {
      single: 12750,
      married: 25500,
    },
    taxBracketsSingle: [{ rate: 0.045, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.045, income: 9999999999 }],
  },

  'North Dakota': {
    deduction: {
      single: 14600,
      married: 29200,
    },
    taxBracketsSingle: [
      { rate: 0.0, income: 44725 },
      { rate: 0.0195, income: 225975 },
      { rate: 0.025, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0, income: 74750 },
      { rate: 0.0195, income: 275100 },
      { rate: 0.025, income: 9999999999 },
    ],
  },

  Ohio: {
    deduction: {
      single: 2400,
      married: 4800,
    },
    taxBracketsSingle: [
      { rate: 0.0, income: 26050 },
      { rate: 0.0275, income: 92150 },
      { rate: 0.035, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0, income: 26050 },
      { rate: 0.0275, income: 92150 },
      { rate: 0.035, income: 9999999999 },
    ],
  },

  Oklahoma: {
    deduction: {
      single: 6350,
      married: 12700,
    },
    taxBracketsSingle: [
      { rate: 0.0025, income: 1000 },
      { rate: 0.0075, income: 2500 },
      { rate: 0.0175, income: 3750 },
      { rate: 0.0275, income: 4900 },
      { rate: 0.0375, income: 7200 },
      { rate: 0.0475, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0025, income: 2000 },
      { rate: 0.0075, income: 5000 },
      { rate: 0.0175, income: 7500 },
      { rate: 0.0275, income: 9800 },
      { rate: 0.0375, income: 12200 },
      { rate: 0.0475, income: 9999999999 },
    ],
  },

  Oregon: {
    deduction: {
      single: 2745,
      married: 5495,
    },
    taxBracketsSingle: [
      { rate: 0.0475, income: 4300 },
      { rate: 0.0675, income: 10750 },
      { rate: 0.0875, income: 125000 },
      { rate: 0.099, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0475, income: 8600 },
      { rate: 0.0675, income: 21500 },
      { rate: 0.0875, income: 250000 },
      { rate: 0.099, income: 9999999999 },
    ],
  },

  Pennsylvania: {
    deduction: {
      single: 0,
      married: 0,
    },
    taxBracketsSingle: [{ rate: 0.0307, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0307, income: 9999999999 }],
  },

  'Rhode Island': {
    deduction: {
      single: 10550,
      married: 21150,
    },
    taxBracketsSingle: [
      { rate: 0.0375, income: 77450 },
      { rate: 0.0475, income: 176050 },
      { rate: 0.0599, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0375, income: 77450 },
      { rate: 0.0475, income: 176050 },
      { rate: 0.0599, income: 9999999999 },
    ],
  },

  'South Carolina': {
    deduction: {
      single: 14600,
      married: 29200,
    },
    taxBracketsSingle: [
      { rate: 0.0, income: 3460 },
      { rate: 0.03, income: 17330 },
      { rate: 0.064, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0, income: 3460 },
      { rate: 0.03, income: 17330 },
      { rate: 0.064, income: 9999999999 },
    ],
  },

  'South Dakota': {
    deduction: {
      single: 0,
      married: 0,
    },
    taxBracketsSingle: [{ rate: 0.0, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0, income: 9999999999 }],
  },

  Tennessee: {
    deduction: {
      single: 0,
      married: 0,
    },
    taxBracketsSingle: [{ rate: 0.0, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0, income: 9999999999 }],
  },

  Texas: {
    deduction: {
      single: 0,
      married: 0,
    },
    taxBracketsSingle: [{ rate: 0.0, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0, income: 9999999999 }],
  },

  Utah: {
    deduction: {
      single: 0,
      married: 0,
    },
    taxBracketsSingle: [{ rate: 0.0465, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0465, income: 9999999999 }],
  },

  Vermont: {
    deduction: {
      single: 7000,
      married: 14050,
    },
    taxBracketsSingle: [
      { rate: 0.0335, income: 45400 },
      { rate: 0.066, income: 110050 },
      { rate: 0.076, income: 229550 },
      { rate: 0.0875, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0335, income: 75850 },
      { rate: 0.066, income: 183400 },
      { rate: 0.076, income: 279450 },
      { rate: 0.0875, income: 9999999999 },
    ],
  },
  Virginia: {
    deduction: {
      single: 8000,
      married: 16000,
    },
    taxBracketsSingle: [
      { rate: 0.02, income: 3000 },
      { rate: 0.03, income: 5000 },
      { rate: 0.05, income: 17000 },
      { rate: 0.0575, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.02, income: 3000 },
      { rate: 0.03, income: 5000 },
      { rate: 0.05, income: 17000 },
      { rate: 0.0575, income: 9999999999 },
    ],
  },

  Washington: {
    deduction: {
      single: 0,
      married: 0,
    },
    taxBracketsSingle: [{ rate: 0.0, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0, income: 9999999999 }],
  },

  'West Virginia': {
    deduction: {
      single: 2000,
      married: 4000,
    },
    taxBracketsSingle: [
      { rate: 0.0236, income: 10000 },
      { rate: 0.0315, income: 25000 },
      { rate: 0.0354, income: 40000 },
      { rate: 0.0472, income: 60000 },
      { rate: 0.0512, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.0236, income: 10000 },
      { rate: 0.0315, income: 25000 },
      { rate: 0.0354, income: 40000 },
      { rate: 0.0472, income: 60000 },
      { rate: 0.0512, income: 9999999999 },
    ],
  },

  Wisconsin: {
    deduction: {
      single: 13230,
      married: 24490,
    },
    taxBracketsSingle: [
      { rate: 0.035, income: 14320 },
      { rate: 0.044, income: 28640 },
      { rate: 0.053, income: 315310 },
      { rate: 0.0765, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.035, income: 19090 },
      { rate: 0.044, income: 38190 },
      { rate: 0.053, income: 420420 },
      { rate: 0.0765, income: 9999999999 },
    ],
  },

  Wyoming: {
    deduction: {
      single: 0,
      married: 0,
    },
    taxBracketsSingle: [{ rate: 0.0, income: 9999999999 }],
    taxBracketsMarried: [{ rate: 0.0, income: 9999999999 }],
  },

  'Washington, DC': {
    deduction: {
      single: 14600,
      married: 29200,
    },
    taxBracketsSingle: [
      { rate: 0.04, income: 10000 },
      { rate: 0.06, income: 40000 },
      { rate: 0.065, income: 60000 },
      { rate: 0.085, income: 250000 },
      { rate: 0.0925, income: 500000 },
      { rate: 0.0975, income: 1000000 },
      { rate: 0.1075, income: 9999999999 },
    ],
    taxBracketsMarried: [
      { rate: 0.04, income: 10000 },
      { rate: 0.06, income: 40000 },
      { rate: 0.065, income: 60000 },
      { rate: 0.085, income: 250000 },
      { rate: 0.0925, income: 500000 },
      { rate: 0.0975, income: 1000000 },
      { rate: 0.1075, income: 9999999999 },
    ],
  },
};

module.exports = { stateTaxes };
