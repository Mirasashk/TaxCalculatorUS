/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const ProgressMeter = ({ step }) => {
  const [value, setValue] = useState(0);
  const [progressActive, setProgressActive] = useState(true);

  useEffect(() => {
    console.log(step);
    if (step === 0) {
      setValue(0);
    } else if (step === 1) {
      setValue(20);
    } else if (step === 2) {
      setValue(40);
    } else if (step === 3) {
      setValue(60);
    } else if (step === 4) {
      setValue(80);
    } else if (step === 5) {
      setProgressActive(false);
    }
  }, [step]);

  return (
    <>
      {progressActive && (
        <div className='flex justify-center'>
          <Box
            sx={{
              width: 300,
              '& .Mui-active': { boxShadow: 'none' },
              '& .Mui-disabled': { color: '#3b82f6' },
            }}>
            <Slider
              aria-label='Custom marks'
              defaultValue={0}
              step={5}
              value={value}
              valueLabelDisplay='off'
              disabled
            />
          </Box>
        </div>
      )}
    </>
  );
};

export default ProgressMeter;
