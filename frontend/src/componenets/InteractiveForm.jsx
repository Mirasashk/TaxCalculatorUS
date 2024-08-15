/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import ProfileContext from '../contexts/ProfileContext';
import { FaDollarSign } from 'react-icons/fa6';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import states from 'states-us';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const InteractiveForm = ({ step, setStep }) => {
  // eslint-disable-next-line no-unused-vars
  const [resultModel, setResultModel] = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
    }
  }, [isSubmit]);

  const [formData, setFormData] = useState({
    income: '',
    stdDeduction: true, // true for standard, false for itemized
    deductionAmount: '',
    incomeType: 'gross', // true for gross, false for net
    incomePeriod: 'anually',
    state: '',
    filingStatus: 'marriedJointly',
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
      deductionAmount: parseInt(
        String(formData.deductionAmount).replace(/,/g, '')
      ),
    });

    console.log(formData.income);
    setIsSubmit(true);
  };

  const handleSubmit = () => {
    //dev http://localhost:5000/calculations
    //prod https://taxcalculatorus-api.web.app/calculations
    console.log('This processes firtst');
    axios.post('http://localhost:5000/calculations', formData).then((res) => {
      console.log(res.data);
      setResultModel(res.data);
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
        <div className='text-2xl font-semibold pb-4'>Income Information</div>
        <div className='grid w-[22rem] grid-cols-3 text-sm gap-1 mb-4 rounded-3xl bg-slate-300 p-0'>
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
      <div className='grid'>
        <div className='flex justify-center items-end mb-6'>
          <button
            disabled={formData.income === ''}
            className='grid disabled:bg-slate-600 items-end justify-center bg-blue-500 drop-shadow-lg px-8 py-2 text-white rounded-3xl'
            onClick={(e) => {
              handleNext(e);
            }}>
            Next
          </button>
        </div>
      </div>
    </>
  );

  const renderStep1 = (
    <>
      <div className=' flex flex-col items-center h-72 w-full'>
        <div className='text-2xl font-semibold pb-4 '>
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
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder='Select a state'
              label='Select a state'
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
        <div className='text-2xl font-semibold pb-4 '>Filing status</div>
        <div className='grid w-[18rem] grid-cols-1 text-sm   rounded-3xl bg-slate-300 p-3'>
          <div className='grid justify-center'>
            <div className='flex items-center pb-1'>
              <input
                type='radio'
                name='filingStatus'
                id='marriedJointly'
                value='marriedJointly'
                className='peer w-5 h-5 mr-4 '
                checked={formData.filingStatus === 'marriedJointly'}
                onChange={handleChange}
              />
              <label htmlFor='marriedJointly' className='text-xl w-full'>
                Married Filing Jointly
              </label>
            </div>

            <div className='flex items-center w-full pb-1'>
              <input
                type='radio'
                name='filingStatus'
                id='marriedSeperate'
                value='marriedSeperate'
                className='peer w-5 h-5 mr-4 '
                checked={formData.filingStatus === 'marriedSeperate'}
                onChange={handleChange}
              />
              <label htmlFor='marriedSeperate' className='text-xl w-full'>
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
              <label htmlFor='single' className='text-xl w-full'>
                Single
              </label>
            </div>
            <div className='flex items-center pb-2'>
              <input
                type='radio'
                name='filingStatus'
                id='headOfHouse'
                value='headOfHouse'
                className='peer w-5 h-5 mr-4 '
                checked={formData.filingStatus === 'headOfHouse'}
                onChange={handleChange}
              />
              <label htmlFor='headOfHouse' className='text-xl w-full'>
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
        <div className='grid w-[14rem] grid-cols-2 text-sm gap-1 mb-4 rounded-3xl bg-slate-300'>
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
          disabled={
            formData.stdDeduction === false && formData.deductionAmount === ''
          }
          className='grid items-end justify-center disabled:bg-slate-500 bg-blue-500 drop-shadow-lg px-8 py-2 text-white rounded-3xl'
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
        <div className='grid w-[20rem] grid-cols-2 text-sm gap-1 mb-4 rounded-3xl bg-slate-300 '>
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
                Enter total number of Dependents:
              </label>
              <div className='flex justify-center'>
                <input
                  name='dependents'
                  type='number'
                  min={0}
                  value={formData.dependents}
                  className='border border-slate-400 w-[6rem] rounded-lg py-3 text-center'
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='w-[20rem] grid justify-center items-center '>
              <label htmlFor='numberOfDependentsU18' className='italic'>
                Enter number of Dependents under 16:
              </label>
              <div className='flex justify-center'>
                <input
                  name='dependentsU18'
                  type='number'
                  min={0}
                  max={formData.dependents}
                  value={formData.dependentsU18}
                  className='border border-slate-400 rounded-lg py-3 w-[6rem] text-center'
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value > formData.dependents) {
                      e.target.value = formData.dependents;
                    }
                    handleChange(e);
                  }}
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
    <>
      {!loading ? (
        <div className='grid justify-center pt-4'>
          <div className='flex flex-col items-center w-full'>
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
        </div>
      ) : (
        <div className='flex justify-center items-center h-[23rem]'>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default InteractiveForm;
