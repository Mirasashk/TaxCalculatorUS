/* eslint-disable react/prop-types */
import { useState } from 'react';
import InteractiveForm from './InteractiveForm';
import ProgressMeter from './ProgressMeter';

const CalculatorForm = () => {
  const [step, setStep] = useState(0);
  return (
    <div className='grid w-full'>
      <ProgressMeter step={step} />
      <InteractiveForm step={step} setStep={setStep} />
    </div>
  );
};

export default CalculatorForm;
