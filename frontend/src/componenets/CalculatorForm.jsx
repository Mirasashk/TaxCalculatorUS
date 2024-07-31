import { useState } from 'react';
import InteractiveForm from './InteractiveForm';
import ProgressMeter from './ProgressMeter';

const CalculatorForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    income: 0,
    gross: true, // true for gross, false for net
    state: '',
    kids: 0,
    dependants: 0,
    deductions: true, // true for standard, false for itemized
    dectionAmount: 0,
    tax: 0,
  });

  return (
    <div className='grid w-full'>
      <ProgressMeter />
      <InteractiveForm />
    </div>
  );
};

export default CalculatorForm;
