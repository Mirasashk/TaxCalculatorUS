/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import ProfileContext from '../contexts/ProfileContext';
import { Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { FaDollarSign } from 'react-icons/fa';
import {
  OutlinedInput,
  Autocomplete,
  Select,
  MenuItem,
  InputAdornment,
  TextField,
} from '@mui/material';
import states from 'states-us';

const ResultView = () => {
  // eslint-disable-next-line no-unused-vars
  const [resultModel, setResultModel] = useContext(ProfileContext);
  const [newCalculation, setNewCalculation] = useState(resultModel.incomeModel);

  const modifiedStates = states
    .map((state) => {
      if (state.territory === false) {
        return state.name;
      }
    })
    .filter((state) => state !== undefined);

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

  //   resultModel.incomeModel.income
  //   .toFixed(2)
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const inputs = (
    <div className='grid grid-flow-row grid-cols-2 '>
      <div className='grid col-span-2 grid-cols-2 pr-2 space-y-2'>
        <div className='flex col-span-1 items-center'>
          <label htmlFor='income'>Income:</label>
        </div>
        <div className='col-span-1'>
          <OutlinedInput
            name='income'
            sx={{
              width: '12rem',
              backgroundColor: 'white',
              height: '3rem',
            }}
            id='standard-adornment-amount'
            onChange={handleUpdate}
            value={newCalculation.income}
            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          />
        </div>

        <div className='flex col-span-1 items-center'>
          <label htmlFor='income period'>Income Period:</label>
        </div>
        <div className='flex col-span-1'>
          <div>
            <Select
              value={newCalculation.incomePeriod}
              onChange={handleUpdate}
              sx={{
                width: '12rem',
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

        <div className='flex col-span-1 items-center'>
          <label htmlFor='state'>State:</label>
        </div>
        <div className='flex col-span-1'>
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
                width: '12rem',

                backgroundColor: 'white',
                borderRadius: 1,
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
            {}
          </div>
        </div>

        <div className='flex col-span-1 items-center'>
          <label htmlFor='deduction'>Deduction:</label>
        </div>
        <div className='grid w-[12rem] grid-cols-2 text-sm gap-1 mb-4 rounded-3xl bg-gray-200 p-0'>
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
            <div className='flex col-span-1 items-center'>
              <label htmlFor='deduction'>Deduction Amount:</label>
            </div>
            <div className='w-[12rem] flex col-span-1 justify-start items-center relative '>
              <FaDollarSign
                className='absolute mr-2 w-10 text-slate-600'
                alt='Search Icon'
              />
              <input
                name='itemizedDeduction'
                placeholder='Deduction Amount'
                value={newCalculation.deductionAmount}
                className='border border-gray-400   rounded-lg py-3 pl-8 w-full'
                onChange={FormatDeductionField}
              />
            </div>
          </>
        ) : null}

        <div className='flex col-span-1 items-center'>
          <label htmlFor='deduction'>Dependents:</label>
        </div>

        <div className='grid w-[12rem] grid-cols-2 text-sm gap-1 mb-4 rounded-3xl bg-gray-200 p-0'>
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
            <div className='flex col-span-1 items-center'>
              <label htmlFor='deduction'># of Dependents:</label>
            </div>
            <div className='w-[12rem] grid justify-center items-center '>
              <div className='flex justify-center'>
                <input
                  name='dependents'
                  type='number'
                  min={0}
                  placeholder='Number of Dependents'
                  value={newCalculation.dependents}
                  className='border border-gray-400 w-[12rem] rounded-lg py-3 pl-8 '
                  onChange={(e) => {
                    setNewCalculation({
                      ...newCalculation,
                      dependents: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className='flex col-span-1 items-center'>
              <label htmlFor='deduction'>Dependents under 17:</label>
            </div>
            <div className='w-[12rem] grid justify-center items-center '>
              <div className='flex justify-center'>
                <input
                  name='dependents'
                  type='number'
                  min={0}
                  placeholder='Number of Dependents'
                  value={newCalculation.dependents}
                  className='border border-gray-400 w-[12rem] rounded-lg py-3 pl-8 '
                  onChange={(e) => {
                    setNewCalculation({
                      ...newCalculation,
                      dependents: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </>
        ) : null}

        <div className='flex col-span-2 justify-center items-center pt-4'>
          <button
            className='w-40 h-12 bg-[#254081] rounded-3xl font-semibold text-white'
            onClick={() => {
              setResultModel({ incomeModel: newCalculation });
            }}>
            Re-Calculate
          </button>
        </div>
      </div>
    </div>
  );

  const results = (
    <div className='grid grid-flow-row col-span-4 pt-10'>
      <div className='grid grid-flow-row grid-cols-8 '>
        <div className='flex flex-col col-span-4 pr-2 text-xl pl-10'>
          <label htmlFor='income'>Gross Income:</label>
          <label htmlFor='deduction'>Taxable Income:</label>
          <label htmlFor='income period'>Federal Taxes:</label>
          <label htmlFor='dependents'>Dependent Credits:</label>
          <label htmlFor='state'>State Tax:</label>

          <label htmlFor='deduction'>Effective Tax Rate:</label>
          <label htmlFor='dependents'>Net Income:</label>
        </div>
        <div className='flex flex-col col-span-4 text-xl font-medium pl-2'>
          <div>
            $
            {resultModel.incomeModel.income
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div>
            $
            {resultModel.incomeModel.taxableIncome
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div className='text-red-700'>
            $
            {resultModel.incomeModel.fedTaxes
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div className='flex text-green-700'>
            $
            {resultModel.incomeModel.dependentTaxCredit
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            <p className='flex items-center pl-2 text-sm text-black'>
              *Included in federal taxes
            </p>
          </div>
          <div className='text-red-700'>
            $
            {resultModel.incomeModel.stateTaxes
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>

          <div>{resultModel.incomeModel.effectiveTaxRate.toFixed(2)}%</div>
          <div className='text-green-700'>
            $
            {resultModel.incomeModel.netIncome
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
        </div>
        <div className='col-span-2'></div>
      </div>
    </div>
  );

  return (
    <div className=' flex flex-col items-center h-[36rem] w-full px-8'>
      <div className='grid grid-cols-12 w-full '>
        <div className='flex flex-col col-span-4 w-full'>
          <div className='grid justify-center text-2xl font-semibold pb-4'>
            Your information
          </div>
          {inputs}
        </div>
        <div className='flex justify-center col-span-1'>
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

        <div className='flex flex-col col-span-7 w-full'>
          <div className='grid col-span-5 justify-center text-2xl font-semibold pb-4'>
            Tax year 2024 Breakdown
          </div>
          {results}
          <div className='pt-4'>
            <PieChart
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
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: 'gray',
                  },
                },
              ]}
              sx={{ '& .MuiPieArc-root': { strokeWidth: '0px' } }}
              width={400}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
