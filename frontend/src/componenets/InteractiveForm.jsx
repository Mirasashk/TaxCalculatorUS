/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaDollarSign } from 'react-icons/fa6';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import states from 'states-us';

const InteractiveForm = ({ step, setStep }) => {
  const [incomeType, setIncomeType] = useState('Gross');
  const [incomePeriod, setIncomePeriod] = useState('Anually');
  const [stdDeduction, setStdDeduction] = useState(true);
  const [dependents, setDependents] = useState(0);
  const [dependentsU18, setDependentsU18] = useState(0);
  const [hasDependents, setHasDependents] = useState(false);
  const [filingStatus, setFilingStatus] = useState('MarriedFilingJointly');

  const [formData, setFormData] = useState({
    income: '',
    gross: true, // true for gross, false for net
    state: '',
    kids: 0,
    dependants: 0,
    deductions: true, // true for standard, false for itemized
    dectionAmount: '',
    tax: 0,
  });

  const handleNext = () => {
    setStep(step + 1);
    console.log(step);
  };

  const handleBack = () => {
    setStep(step - 1);
    console.log(step);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const onPeriodOptionChange = (e) => {
    setIncomePeriod(e.target.value);
    handleChange(e);
  };
  const onTypeOptionChange = (e) => {
    setIncomeType(e.target.value);
    handleChange(e);
  };

  const onStdDeductionChange = (e) => {
    setStdDeduction(!stdDeduction);
    handleChange(e);
  };

  const onHasDependentsChange = (e) => {
    setHasDependents(!hasDependents);
    handleChange(e);
  };

  const onDependentsChange = (e) => {
    setDependents(e.target.value);
    handleChange(e);
  };

  const onDependentsU18Change = (e) => {
    setDependentsU18(e.target.value);
    handleChange(e);
  };

  const onFilingStatusChange = (e) => {
    setFilingStatus(e.target.value);
    handleChange(e);
  };

  const FormatIncomeField = (e) => {
    let income = e.target.value;
    let formattedIncome = income
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    setFormData({ ...formData, income: formattedIncome });
  };

  const FormatDeductionField = (e) => {
    let deduction = e.target.value;
    let formattedDeduction = deduction
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    setFormData({ ...formData, deductionAmount: formattedDeduction });
  };

  const renderStep0 = (
    <>
      <div className=' flex flex-col items-center h-72 w-full'>
        <div className='text-2xl font-semibold pb-4'>Income</div>
        <div className='grid w-[22rem] grid-cols-3 text-sm gap-1 mb-4 rounded-3xl bg-gray-200 p-0'>
          <div>
            <input
              type='radio'
              name='option'
              id='Anually'
              value='Anually'
              className='peer hidden'
              checked={incomePeriod === 'Anually'}
              onChange={onPeriodOptionChange}
            />
            <label
              htmlFor='Anually'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Anually
            </label>
          </div>

          <div>
            <input
              type='radio'
              name='option'
              id='Semi-Monthly'
              value='Semi-Monthly'
              className='peer hidden'
              checked={incomePeriod === 'Semi-Monthly'}
              onChange={onPeriodOptionChange}
            />
            <label
              htmlFor='Semi-Monthly'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Semi-Monthly
            </label>
          </div>

          <div>
            <input
              type='radio'
              name='option'
              id='Bi-Weekly'
              value='Bi-Weekly'
              className='peer hidden'
              checked={incomePeriod === 'Bi-Weekly'}
              onChange={onPeriodOptionChange}
            />
            <label
              htmlFor='Bi-Weekly'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Bi-Weekly
            </label>
          </div>
        </div>
        <div className='grid w-[12rem] grid-cols-2 text-sm gap-1 rounded-3xl bg-gray-200 p-0'>
          <div>
            <input
              type='radio'
              name='grossOrNet'
              id='Gross'
              value='Gross'
              className='peer hidden'
              checked={incomeType === 'Gross'}
              onChange={onTypeOptionChange}
            />
            <label
              htmlFor='Gross'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Gross
            </label>
          </div>

          <div>
            <input
              type='radio'
              name='grossOrNet'
              id='Net'
              value='Net'
              className='peer hidden'
              checked={incomeType === 'Net'}
              onChange={onTypeOptionChange}
            />
            <label
              htmlFor='Net'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Net
            </label>
          </div>
        </div>

        <div className='w-[12rem] flex justify-start items-center relative mt-4'>
          <FaDollarSign
            className='absolute mr-2 w-10 text-slate-600'
            alt='Search Icon'
          />
          <input
            name='income'
            placeholder='Income'
            value={formData.income}
            className='border border-gray-400   rounded-lg py-3 pl-8 w-full'
            onChange={FormatIncomeField}
          />
        </div>
      </div>
      <div className='grid justify-center items-center mb-6'>
        <button
          className='grid items-end justify-center bg-blue-500 drop-shadow-lg px-8 py-2 text-white rounded-3xl'
          onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );

  const renderStep1 = (
    <>
      <div className=' flex flex-col items-center h-72 w-full'>
        <div className='text-2xl font-semibold pb-4 pt-4'>
          Please select your state
        </div>
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          getOptionLabel={(option) => option.name}
          options={states}
          onChange={(e, value) => {
            setFormData({ ...formData, state: value.abbreviation });
          }}
          sx={{
            width: 300,

            backgroundColor: 'white',
            borderRadius: '1rem',
            border: 'none',
            '& fieldset': { border: 'none', helperText: 'none' },
            '#combo-box-demo-label': { visibility: 'hidden' },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label='States'
              sx={{ border: 'none', borderRadius: '2rem' }}
            />
          )}
        />
      </div>
      <div className='flex justify-center items-center space-x-4 mb-6'>
        <button
          className='grid items-end justify-center bg-slate-700 drop-shadow-lg px-8 py-2 text-white rounded-3xl'
          onClick={handleBack}>
          Back
        </button>
        <button
          className='grid items-end justify-center bg-blue-500 drop-shadow-lg px-8 py-2 text-white rounded-3xl'
          onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );

  const renderStep2 = (
    <>
      <div className=' flex flex-col items-center h-72 w-full'>
        <div className='text-2xl font-semibold pb-4 pt-4'>Filing status</div>
        <div className='grid w-[18rem] grid-cols-1 text-sm  mb-4 rounded-3xl bg-gray-200 p-3'>
          <div className='grid justify-center'>
            <div className='flex items-center pb-2'>
              <input
                type='radio'
                name='filingStatus'
                id='MarriedFilingJointly'
                value='MarriedFilingJointly'
                className='peer w-5 h-5 mr-4 '
                checked={filingStatus === 'MarriedFilingJointly'}
                onChange={onFilingStatusChange}
              />
              <label htmlFor='MarriedFilingJointly' className='text-xl'>
                Married Filing Jointly
              </label>
            </div>

            <div className='flex items-center pb-2'>
              <input
                type='radio'
                name='filingStatus'
                id='MarriedFilingSeparately'
                value='MarriedFilingSeparately'
                className='peer w-5 h-5 mr-4 '
                checked={filingStatus === 'MarriedFilingSeparately'}
                onChange={onFilingStatusChange}
              />
              <label htmlFor='MarriedFilingSeparately' className='text-xl'>
                Married Filing Separately
              </label>
            </div>
            <div className='flex items-center pb-2'>
              <input
                type='radio'
                name='filingStatus'
                id='Single'
                value='Single'
                className='peer w-5 h-5 mr-4 '
                checked={filingStatus === 'Single'}
                onChange={onFilingStatusChange}
              />
              <label htmlFor='Single' className='text-xl'>
                Single
              </label>
            </div>
            <div className='flex items-center pb-2'>
              <input
                type='radio'
                name='filingStatus'
                id='HeadOfHousehold'
                value='HeadOfHousehold'
                className='peer w-5 h-5 mr-4 '
                checked={filingStatus === 'HeadOfHousehold'}
                onChange={onFilingStatusChange}
              />
              <label htmlFor='HeadOfHousehold' className='text-xl'>
                Head Of Household
              </label>
            </div>
          </div>
        </div>
        {!stdDeduction ? (
          <div className='w-[12rem] flex justify-start items-center relative '>
            <FaDollarSign
              className='absolute mr-2 w-10 text-slate-600'
              alt='Search Icon'
            />
            <input
              name='itemizedDeduction'
              placeholder='Itemized Decutions'
              value={formData.deductionAmount}
              className='border border-gray-400   rounded-lg py-3 pl-8 w-full'
              onChange={FormatDeductionField}
            />
          </div>
        ) : null}
      </div>
      <div className='flex justify-center items-center space-x-4 mb-6'>
        <button
          className='grid items-end justify-center bg-slate-700 drop-shadow-lg px-8 py-2 text-white rounded-3xl'
          onClick={handleBack}>
          Back
        </button>
        <button
          className='grid items-end justify-center bg-blue-500 drop-shadow-lg px-8 py-2 text-white rounded-3xl'
          onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );

  const renderStep3 = (
    <>
      <div className=' flex flex-col items-center h-72 w-full'>
        <div className='text-2xl font-semibold pb-4 pt-4'>
          Lets figure out deductions
        </div>
        <div className='grid w-[14rem] grid-cols-2 text-sm gap-1 mb-4 rounded-3xl bg-gray-200 p-0'>
          <div>
            <input
              type='radio'
              name='stdDeduction'
              id='Standard'
              value='Standard'
              className='peer hidden'
              checked={stdDeduction}
              onChange={onStdDeductionChange}
            />
            <label
              htmlFor='Standard'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Standard
            </label>
          </div>

          <div>
            <input
              type='radio'
              name='stdDeduction'
              id='Itemized'
              value='Itemized'
              className='peer hidden'
              checked={!stdDeduction}
              onChange={onStdDeductionChange}
            />
            <label
              htmlFor='Itemized'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Itemized
            </label>
          </div>
        </div>
        {!stdDeduction ? (
          <div className='w-[12rem] flex justify-start items-center relative '>
            <FaDollarSign
              className='absolute mr-2 w-10 text-slate-600'
              alt='Search Icon'
            />
            <input
              name='itemizedDeduction'
              placeholder='Itemized Decutions'
              value={formData.deductionAmount}
              className='border border-gray-400   rounded-lg py-3 pl-8 w-full'
              onChange={FormatDeductionField}
            />
          </div>
        ) : null}
      </div>
      <div className='flex justify-center items-center space-x-4 mb-6'>
        <button
          className='grid items-end justify-center bg-slate-700 drop-shadow-lg px-8 py-2 text-white rounded-3xl'
          onClick={handleBack}>
          Back
        </button>
        <button
          className='grid items-end justify-center bg-blue-500 drop-shadow-lg px-8 py-2 text-white rounded-3xl'
          onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );

  const renderStep4 = (
    <>
      <div className=' flex flex-col items-center h-72 w-full'>
        <div className='text-2xl font-semibold pb-4 pt-4'>
          Lets count dependents
        </div>
        <div className='grid w-[20rem] grid-cols-2 text-sm gap-1 mb-4 rounded-3xl bg-gray-200 p-0'>
          <div>
            <input
              type='radio'
              name='dependents'
              id='NoDependents'
              value={hasDependents}
              className='peer hidden'
              checked={hasDependents === false}
              onChange={(e) => {
                onHasDependentsChange(e);
                setDependents(0);
              }}
            />
            <label
              htmlFor='NoDependents'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              No Dependents
            </label>
          </div>

          <div>
            <input
              type='radio'
              name='dependents'
              id='moreThanZero'
              value={hasDependents}
              className='peer hidden'
              checked={hasDependents == true}
              onChange={onHasDependentsChange}
            />
            <label
              htmlFor='moreThanZero'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Have Dependents
            </label>
          </div>
        </div>
        {hasDependents ? (
          <>
            <div className='w-[20rem] grid justify-center items-center '>
              <label htmlFor='numberOfDependents' className='italic'>
                Enter the number of Dependents:
              </label>
              <div className='flex justify-center'>
                <input
                  name='numberOfDependents'
                  type='number'
                  placeholder='Number of Dependents'
                  value={dependents}
                  className='border border-gray-400 w-[10rem] rounded-lg py-3 pl-8 '
                  onChange={onDependentsChange}
                />
              </div>
            </div>
            <div className='w-[20rem] grid justify-center items-center '>
              <label htmlFor='numberOfDependentsU18' className='italic'>
                Enter the number of Dependents under 18:
              </label>
              <div className='flex justify-center'>
                <input
                  name='numberOfDependentsU18'
                  type='number'
                  placeholder='Number of Dependents under 18'
                  value={dependentsU18}
                  className='border border-gray-400 rounded-lg py-3 pl-8 w-[10rem]'
                  onChange={onDependentsU18Change}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div className='flex justify-center items-center space-x-4 mb-6'>
        <button
          className='grid items-end justify-center bg-slate-700 drop-shadow-lg px-8 py-2 text-white rounded-3xl'
          onClick={handleBack}>
          Back
        </button>
        <button
          className='grid items-end justify-center bg-blue-500 drop-shadow-lg px-8 py-2 text-white rounded-3xl'
          onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );

  return (
    <div className='grid justify-center pt-4'>
      {step === 0
        ? renderStep0
        : step === 1
        ? renderStep1
        : step === 2
        ? renderStep2
        : step === 3
        ? renderStep3
        : step === 4
        ? renderStep4
        : 'Results'}
    </div>
  );
};

export default InteractiveForm;
