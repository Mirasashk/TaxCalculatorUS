/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { FaDollarSign } from 'react-icons/fa6';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import states from 'states-us';
import axios from 'axios';

const InteractiveForm = ({ step, setStep }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const modifiedStates = states
    .map((state) => {
      if (state.territory === false) {
        return state.name;
      }
    })
    .filter((state) => state !== undefined);

  useEffect(() => {
    if (isSubmit) {
      handleSubmit();
    }
  }, [isSubmit]);

  const [formData, setFormData] = useState({
    income: '',
    stdDeduction: true, // true for standard, false for itemized
    itemizedDeduction: '',
    incomeType: 'gross', // true for gross, false for net
    incomePeriod: 'anually',
    state: '',
    filingStatus: 'marriedFilingJointly',
    hasDependents: false,
    dependents: 0,
    dependentsU18: 0,
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    console.log(e.target);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const modifyFormData = () => {
    let incomeMult = parseInt(String(formData.income).replace(/,/g, ''));

    if (formData.incomePeriod === 'semi-monthly') {
      incomeMult = incomeMult * 24;
    } else if (formData.incomePeriod === 'bi-weekly') {
      incomeMult = incomeMult * 26;
    }
    setFormData({
      ...formData,
      income: incomeMult,
      state: formData.state.toLowerCase(),
      itemizedDeduction: parseInt(
        String(formData.itemizedDeduction).replace(/,/g, '')
      ),
    });

    console.log(formData.income);
    setIsSubmit(true);
  };

  const handleSubmit = () => {
    console.log('This processes firtst');
    axios.post('http://localhost:5000/calculations', formData).then((res) => {
      console.log(res.data);
    });
    //navigate to results page
    console.log(formData);
  };

  const onStdDeductionChange = (e) => {
    if (e.target.value === 'true') {
      setFormData({ ...formData, stdDeduction: true });
    } else {
      setFormData({ ...formData, stdDeduction: false });
    }
    //handleChange(e);
  };

  const onHasDependentsChange = (e) => {
    console.log(e.target);
    if (e.target.value === 'true') {
      setFormData({ ...formData, hasDependents: true });
    } else {
      setFormData({ ...formData, hasDependents: false });
    }
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
              name='incomePeriod'
              id='anually'
              value='anually'
              className='peer hidden'
              checked={formData.incomePeriod === 'anually'}
              onChange={handleChange}
            />
            <label
              htmlFor='anually'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Anually
            </label>
          </div>

          <div>
            <input
              type='radio'
              name='incomePeriod'
              id='semi-monthly'
              value='semi-monthly'
              className='peer hidden'
              checked={formData.incomePeriod === 'semi-monthly'}
              onChange={handleChange}
            />
            <label
              htmlFor='semi-monthly'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Semi-Monthly
            </label>
          </div>

          <div>
            <input
              type='radio'
              name='incomePeriod'
              id='bi-weekly'
              value='bi-weekly'
              className='peer hidden'
              checked={formData.incomePeriod == 'bi-weekly'}
              onChange={handleChange}
            />
            <label
              htmlFor='bi-weekly'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Bi-Weekly
            </label>
          </div>
        </div>
        <div className='grid w-[12rem] grid-cols-2 text-sm gap-1 rounded-3xl bg-gray-200 p-0'>
          <div>
            <input
              type='radio'
              name='incomeType'
              id='gross'
              value='gross'
              className='peer hidden'
              checked={formData.incomeType === 'gross'}
              onChange={handleChange}
            />
            <label
              htmlFor='gross'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Gross
            </label>
          </div>

          <div>
            <input
              type='radio'
              name='incomeType'
              id='net'
              value='net'
              className='peer hidden'
              checked={formData.incomeType === 'net'}
              onChange={handleChange}
            />
            <label
              htmlFor='net'
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
          disabled={formData.income === ''}
          className='grid disabled:bg-slate-600 items-end justify-center bg-blue-500 drop-shadow-lg px-8 py-2 text-white rounded-3xl'
          onClick={(e) => {
            setFormData({
              ...formData,
              income: parseInt(String(formData.income).replace(/,/g, '')),
            });
            handleNext(e);
          }}>
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
          autoComplete
          disableClearable
          name='state'
          value={formData.state ? formData.state : null}
          id='combo-box-demo'
          getOptionLabel={(option) => option}
          options={modifiedStates}
          isOptionEqualToValue={(option, value) => {
            return option === value;
          }}
          onChange={(event, value) => {
            setFormData({ ...formData, state: value });
          }}
          sx={{
            width: 300,

            backgroundColor: 'white',
            borderRadius: '1rem',
            border: 'none',
            '& fieldset': { border: 'none' },
            '#combo-box-demo-label': { visibility: 'hidden' },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder='Select a state'
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
          disabled={formData.state === ''}
          className='grid items-end justify-center disabled:bg-slate-600 bg-blue-500 drop-shadow-lg px-8 py-2 text-white rounded-3xl'
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
                id='marriedFilingJointly'
                value='marriedFilingJointly'
                className='peer w-5 h-5 mr-4 '
                checked={formData.filingStatus === 'marriedFilingJointly'}
                onChange={handleChange}
              />
              <label htmlFor='marriedFilingJointly' className='text-xl'>
                Married Filing Jointly
              </label>
            </div>

            <div className='flex items-center pb-2'>
              <input
                type='radio'
                name='filingStatus'
                id='marriedFilingSeparately'
                value='marriedFilingSeparately'
                className='peer w-5 h-5 mr-4 '
                checked={formData.filingStatus === 'marriedFilingSeparately'}
                onChange={handleChange}
              />
              <label htmlFor='marriedFilingSeparately' className='text-xl'>
                Married Filing Separately
              </label>
            </div>
            <div className='flex items-center pb-2'>
              <input
                type='radio'
                name='filingStatus'
                id='single'
                value='single'
                className='peer w-5 h-5 mr-4 '
                checked={formData.filingStatus === 'single'}
                onChange={handleChange}
              />
              <label htmlFor='single' className='text-xl'>
                Single
              </label>
            </div>
            <div className='flex items-center pb-2'>
              <input
                type='radio'
                name='filingStatus'
                id='headOfHousehold'
                value='headOfHousehold'
                className='peer w-5 h-5 mr-4 '
                checked={formData.filingStatus === 'headOfHousehold'}
                onChange={handleChange}
              />
              <label htmlFor='headOfHousehold' className='text-xl'>
                Head Of Household
              </label>
            </div>
          </div>
        </div>
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
              id='stdDeduction'
              value={true}
              className='peer hidden'
              checked={formData.stdDeduction}
              onChange={onStdDeductionChange}
            />
            <label
              htmlFor='stdDeduction'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Standard
            </label>
          </div>

          <div>
            <input
              type='radio'
              name='stdDeduction'
              id='itemized'
              value={false}
              className='peer hidden'
              checked={!formData.stdDeduction}
              onChange={onStdDeductionChange}
            />
            <label
              htmlFor='itemized'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Itemized
            </label>
          </div>
        </div>
        {!formData.stdDeduction ? (
          <div className='w-[12rem] flex justify-start items-center relative '>
            <FaDollarSign
              className='absolute mr-2 w-10 text-slate-600'
              alt='Search Icon'
            />
            <input
              name='itemizedDeduction'
              placeholder='Itemized Deductions'
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
              name='hasDependents'
              id='noDependents'
              value={false}
              className='peer hidden'
              checked={formData.hasDependents === false}
              onChange={onHasDependentsChange}
            />
            <label
              htmlFor='noDependents'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              No Dependents
            </label>
          </div>

          <div>
            <input
              type='radio'
              name='hasDependents'
              id='moreThanZero'
              value={true}
              className='peer hidden'
              checked={formData.hasDependents == true}
              onChange={onHasDependentsChange}
            />
            <label
              htmlFor='moreThanZero'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
              Have Dependents
            </label>
          </div>
        </div>
        {formData.hasDependents ? (
          <>
            <div className='w-[20rem] grid justify-center items-center '>
              <label htmlFor='numberOfDependents' className='italic'>
                Enter the number of Dependents:
              </label>
              <div className='flex justify-center'>
                <input
                  name='dependents'
                  type='number'
                  placeholder='Number of Dependents'
                  value={formData.dependents}
                  className='border border-gray-400 w-[10rem] rounded-lg py-3 pl-8 '
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='w-[20rem] grid justify-center items-center '>
              <label htmlFor='numberOfDependentsU18' className='italic'>
                Enter the number of Dependents under 18:
              </label>
              <div className='flex justify-center'>
                <input
                  name='dependentsU18'
                  type='number'
                  placeholder='Number of Dependents under 18'
                  value={formData.dependentsU18}
                  className='border border-gray-400 rounded-lg py-3 pl-8 w-[10rem]'
                  onChange={handleChange}
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
          onClick={modifyFormData}>
          Submit
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
