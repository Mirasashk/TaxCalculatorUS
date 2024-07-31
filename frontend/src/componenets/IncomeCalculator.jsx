import React from 'react';
import CalculatorForm from './CalculatorForm';

const IncomeCalculator = () => {
  return (
    <div className='w-full rounded-3xl bg-slate-50 bg-opacity-60 shadow-xl'>
      <div className='grid px-4 pt-4'>
        <CalculatorForm />
      </div>
    </div>
  );
};

export default IncomeCalculator;
