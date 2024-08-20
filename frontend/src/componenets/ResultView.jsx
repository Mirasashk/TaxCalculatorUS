/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import ProfileContext from '../contexts/ProfileContext';
import { Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import NumberInput from './NumberInput';
import {
  OutlinedInput,
  Autocomplete,
  Select,
  MenuItem,
  InputAdornment,
  TextField,
} from '@mui/material';
import states from 'states-us';

const modifiedStates = states
  .map((state) => {
    if (state.territory === false) {
      return state.name;
    }
  })
  .filter((state) => state !== undefined);

const ResultView = () => {
  // eslint-disable-next-line no-unused-vars
  const [resultModel, setResultModel] = useContext(ProfileContext);
  const [newCalculation, setNewCalculation] = useState(resultModel.incomeModel);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      handleSubmit();
      setLoading(true);
    }
  }, [isSubmit]);

  useEffect(() => {
    setNewCalculation(resultModel.incomeModel);
  }, [resultModel]);

  const handleSubmit = () => {
    //dev http://localhost:5000/calculations
    //prod https://taxcalculatorus-api.web.app/calculations
    console.log('This processes for recalculation');
    axios
      .post('http://localhost:5000/calculations', newCalculation)
      .then((res) => {
        console.log(res.data);
        setResultModel(res.data);
        setLoading(false);
        setIsSubmit(false);
      });
    // navigate to results page
    console.log(resultModel);
  };

  const handleUpdate = (e) => {
    console.log('we are editing', e.target.name);
    setNewCalculation({
      ...newCalculation,
      [e.target.name]: e.target.value,
    });
  };

  const FormatDeductionField = (e) => {
    let deduction = e.target.value;
    let formattedDeduction = deduction
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    setNewCalculation({
      ...newCalculation,
      deductionAmount: formattedDeduction,
    });
  };

  const modifyFormData = (e) => {
    e.preventDefault();
    let incomeMult = parseInt(String(newCalculation.income).replace(/,/g, ''));

    if (newCalculation.incomePeriod === 'semi-monthly') {
      incomeMult = incomeMult * 24;
    } else if (newCalculation.incomePeriod === 'bi-weekly') {
      incomeMult = incomeMult * 26;
    }
    setNewCalculation({
      ...newCalculation,
      income: incomeMult,
      state: newCalculation.state.toLowerCase(),
      incomePeriod: 'anually',
      deductionAmount: parseInt(
        String(newCalculation.deductionAmount).replace(/,/g, '')
      ),
    });
    setIsSubmit(true);
  };

  const inputs = (
    <div className='grid grid-flow-row grid-cols-12 '>
      <div className='grid col-span-12 grid-cols-12 pl-3 desktop:pl-8 space-y-4'>
        <div className='flex col-span-5 items-center pt-4'>
          <label htmlFor='income'>Income:</label>
        </div>
        <div className='col-span-7'>
          <OutlinedInput
            name='income'
            sx={{
              width: '10rem',
              backgroundColor: 'white',
              height: '3rem',
            }}
            id='standard-adornment-amount'
            onChange={handleUpdate}
            value={newCalculation.income}
            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          />
        </div>

        <div className='flex col-span-5 items-center'>
          <label htmlFor='income period'>Income Period:</label>
        </div>
        <div className='flex col-span-7'>
          <div>
            <Select
              value={newCalculation.incomePeriod}
              onChange={handleUpdate}
              sx={{
                width: '10rem',
                backgroundColor: 'white',
                height: '3rem',
              }}
              displayEmpty
              name='incomePeriod'
              inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value={'anually'}>Anually</MenuItem>
              <MenuItem value={'semi-monthly'}>Semi-Monthly</MenuItem>
              <MenuItem value={'bi-weekly'}>Bi-Weekly</MenuItem>
            </Select>
            {}
          </div>
        </div>

        <div className='flex col-span-5 items-center'>
          <label htmlFor='state'>State:</label>
        </div>
        <div className='flex col-span-7'>
          <div className='w-[12rem]'>
            <Autocomplete
              disablePortal
              autoComplete
              disableClearable
              name='state'
              value={
                newCalculation.state.charAt(0).toUpperCase() +
                newCalculation.state.slice(1)
              }
              id='combo-box-demo'
              getOptionLabel={(option) => option}
              options={modifiedStates}
              isOptionEqualToValue={(option, value) => {
                return option === value;
              }}
              onChange={(event, value) => {
                setNewCalculation({
                  ...newCalculation,
                  state: value,
                });
              }}
              sx={{
                width: '10rem',

                backgroundColor: 'white',
                borderRadius: 1,
                border: 'none',
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='State'
                  label='State'
                  sx={{ border: 'none', borderRadius: '2rem' }}
                />
              )}
            />
            {}
          </div>
        </div>

        <div className='flex col-span-5 items-center'>
          <label htmlFor='deduction'>Deduction:</label>
        </div>
        <div className='grid w-[10rem] grid-cols-2 col-span-7 text-sm gap-1 mb-4 rounded-3xl bg-slate-300 p-0'>
          <div>
            <input
              type='radio'
              name='stdDeduction'
              id='stdDeduction'
              value={true}
              className='peer hidden'
              checked={newCalculation.stdDeduction}
              onChange={() =>
                setNewCalculation({ ...newCalculation, stdDeduction: true })
              }
            />
            <label
              htmlFor='stdDeduction'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-[#254081] peer-checked:font-bold peer-checked:text-white'>
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
              checked={!newCalculation.stdDeduction}
              onChange={() =>
                setNewCalculation({ ...newCalculation, stdDeduction: false })
              }
            />
            <label
              htmlFor='itemized'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-[#254081] peer-checked:font-bold peer-checked:text-white'>
              Itemized
            </label>
          </div>
        </div>
        {!newCalculation.stdDeduction ? (
          <>
            <div className='flex col-span-5 items-center'>
              <label htmlFor='deduction'>Deduction Amount:</label>
            </div>
            <div className='col-span-7'>
              <OutlinedInput
                name='itemizedDeduction'
                sx={{
                  width: '10rem',
                  backgroundColor: 'white',
                  height: '3rem',
                }}
                id='standard-adornment-amount'
                onChange={FormatDeductionField}
                value={
                  newCalculation.deductionAmount == null
                    ? 0
                    : newCalculation.deductionAmount
                }
                startAdornment={
                  <InputAdornment position='start'>$</InputAdornment>
                }
              />
            </div>
          </>
        ) : null}

        <div className='flex col-span-5 items-center'>
          <label htmlFor='deduction'>Dependents:</label>
        </div>

        <div className='grid w-[10rem] col-span-7 grid-cols-2 text-sm gap-1 mb-4 rounded-3xl bg-slate-300'>
          <div>
            <input
              type='radio'
              name='hasDependents'
              id='noDependents'
              value={false}
              className='peer hidden'
              checked={newCalculation.hasDependents === false}
              onChange={() => {
                setNewCalculation({ ...newCalculation, hasDependents: false });
              }}
            />
            <label
              htmlFor='noDependents'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-[#254081] peer-checked:font-bold peer-checked:text-white'>
              None
            </label>
          </div>

          <div>
            <input
              type='radio'
              name='hasDependents'
              id='moreThanZero'
              value={true}
              className='peer hidden'
              checked={newCalculation.hasDependents == true}
              onChange={() => {
                setNewCalculation({ ...newCalculation, hasDependents: true });
              }}
            />
            <label
              htmlFor='moreThanZero'
              className='block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-[#254081] peer-checked:font-bold peer-checked:text-white'>
              Have
            </label>
          </div>
        </div>

        {newCalculation.hasDependents ? (
          <>
            <div className='flex col-span-5 items-center'>
              <label htmlFor='deduction'># of Dependents:</label>
            </div>
            <div className=' col-span-7 grid justify-center items-center '>
              <div className='flex justify-center'>
                <NumberInput
                  name='dependents'
                  aria-label='Quantity Input'
                  min={0}
                  max={99}
                  value={newCalculation.dependents}
                  onChange={(event, newValue) => {
                    setNewCalculation({
                      ...newCalculation,
                      dependents: newValue,
                    });
                  }}
                />
              </div>
            </div>

            <div className='flex col-span-5 items-center'>
              <label htmlFor='deduction'>Dependents under 17:</label>
            </div>
            <div className='col-span-7 grid justify-center items-center '>
              <div className='flex '>
                <NumberInput
                  name='dependentsU18'
                  min={0}
                  max={newCalculation.dependents}
                  value={newCalculation.dependentsU18}
                  onChange={(event, newValue) => {
                    setNewCalculation({
                      ...newCalculation,
                      dependentsU18: newValue,
                    });
                  }}
                />
              </div>
            </div>
          </>
        ) : null}

        <div className='flex col-span-12 justify-center items-center pt-4'>
          <button
            className='w-40 h-12 bg-[#254081] rounded-3xl font-semibold text-white'
            onClick={modifyFormData}>
            Re-Calculate
          </button>
        </div>
      </div>
    </div>
  );

  const results = (
    <div className='grid grid-flow-row col-span-4 pt-4 desktop:px-2 pb-4'>
      <div className='grid grid-cols-8 text-xl '>
        <div className='flex col-span-5'>
          <label htmlFor='income'>Gross Income:</label>
        </div>
        <div className='flex col-span-3 font-semibold justify-end'>
          <div>
            $
            {resultModel.incomeModel.income
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
        </div>

        <div className='flex col-span-5'>
          <label htmlFor='income'>Deduction Amount:</label>
        </div>
        <div className='flex col-span-3 font-semibold justify-end'>
          <div className='text-green-700'>
            $
            {resultModel.incomeModel.deductionAmount
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
        </div>
        <div className='col-span-8 py-2'>
          <Divider
            orientation='horizontal'
            sx={{
              height: '2px',
              width: '100%',

              borderRightWidth: '1.8px',
              borderColor: '#192841',
              opacity: 0.5,
            }} // Modify the thickness here
            textAlign='center'
          />
        </div>

        <div className='flex col-span-5'>Taxable Income:</div>
        <div className='flex col-span-3 font-semibold justify-end'>
          <div>
            $
            {resultModel.incomeModel.taxableIncome
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
        </div>

        <div className='flex col-span-5'>Federal Taxes:</div>
        <div className='flex col-span-3 font-semibold justify-end'>
          <div className='text-red-700'>
            $
            {(
              resultModel.incomeModel.fedTaxes +
              resultModel.incomeModel.dependentTaxCredit
            )
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
        </div>

        <div className='flex col-span-5'>State Tax:</div>
        <div className='flex col-span-3 font-semibold justify-end'>
          <div className='text-red-700'>
            $
            {resultModel.incomeModel.stateTaxes
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
        </div>

        <div className='flex col-span-5'>Dependent Credits:</div>
        <div className='flex col-span-3 font-semibold justify-end'>
          <div className='text-green-700'>
            $
            {resultModel.incomeModel.dependentTaxCredit
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
        </div>

        <div className='col-span-8 pb-3 pt-2'>
          <Divider
            orientation='horizontal'
            sx={{
              height: '2px',
              width: '100%',

              borderRightWidth: '1.8px',
              borderColor: '#192841',
              opacity: 0.5,
            }} // Modify the thickness here
            textAlign='center'
          />
        </div>

        <div className='flex col-span-5 font-semibold text-xl '>
          Net Income:
        </div>
        <div className='flex col-span-3 font-semibold justify-end'>
          <div className='font-bold text-xl'>
            $
            {resultModel.incomeModel.netIncome
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
        </div>

        <div className='flex col-span-5 font-semibold text-xl'>
          Effective Tax Rate:
        </div>
        <div className='flex justify-end col-span-3 font-bold text-xl'>
          <div>{resultModel.incomeModel.effectiveTaxRate.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className=' flex flex-col items-center w-full px-0'>
          <div className='grid grid-cols-12 w-full '>
            <div className='laptop:flex flex-col col-span-5 w-full hidden '>
              <div className='grid justify-center text-2xl font-semibold pb-4'>
                Your information
              </div>
              {inputs}
            </div>
            <div className='flex justify-center col-span-1 '>
              <Divider
                orientation='vertical'
                sx={{
                  width: '2px',

                  borderRightWidth: '1.8px',
                  borderColor: '#192841',
                  opacity: 0.5,
                }} // Modify the thickness here
                textAlign='center'
              />
            </div>

            <div className='flex flex-col col-span-12 laptop:col-span-6 w-full tablet:px-16 laptop:px-0'>
              <div className='grid col-span-5 justify-center text-2xl text-center font-semibold pb-4'>
                Tax year 2024 Breakdown
              </div>
              {results}
              <div className='flex justify-center '>
                <div className='flex justify-center h-[18rem] w-[10rem]'>
                  <PieChart
                    slotProps={{
                      legend: {
                        position: { vertical: 'bottom', horizontal: 'middle' },
                      },
                    }}
                    margin={{
                      left: 50,
                      right: 50,
                      top: 0,
                      bottom: 100,
                    }}
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: resultModel.incomeModel.netIncome,
                            color: '#254081',
                            label: 'Net Income',
                          },
                          {
                            id: 1,
                            value: resultModel.incomeModel.fedTaxes,
                            color: 'red',
                            label: 'Federal Taxes',
                          },
                          {
                            id: 2,
                            value: resultModel.incomeModel.stateTaxes,
                            color: 'yellow',
                            label: 'State Taxes',
                          },
                        ],

                        outerRadius: 80,
                        innerRadius: 0,
                        paddingAngle: 1,
                        cornerRadius: 8,
                        startAngle: 180,
                        endAngle: 540,
                        highlightScope: {
                          faded: 'global',
                          highlighted: 'item',
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: 'gray',
                        },
                      },
                    ]}
                    sx={{
                      '& .MuiPieArc-root': { strokeWidth: '0px' },
                    }}
                  />
                </div>
              </div>

              <div className='grid pt-8'>
                <div className='flex justify-center items-end mb-6'>
                  <button
                    className='grid disabled:bg-slate-600 items-end justify-center bg-[#254081] drop-shadow-lg px-16 py-2 text-white rounded-3xl'
                    onClick={() => window.location.reload()}>
                    Start Over
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultView;
