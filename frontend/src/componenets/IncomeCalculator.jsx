import { useState, useEffect } from 'react';
import ProfileContext from '../contexts/ProfileContext';
import CalculatorForm from './CalculatorForm';
import ResultView from './ResultView';

const IncomeCalculator = () => {
  const [isResultReady, setIsResultReady] = useState(false);
  const [resultModel, setResultModel] = useState(null);

  useEffect(() => {
    if (resultModel != null) {
      setIsResultReady(true);
    }
  }, [resultModel]);

  return (
    <ProfileContext.Provider value={[resultModel, setResultModel]}>
      <div className='w-full rounded-3xl bg-slate-50 bg-opacity-60 shadow-xl'>
        <div className='grid px-4 pt-4 pb-4'>
          {!isResultReady ? (
            <CalculatorForm setResultModel={setResultModel} />
          ) : (
            <ResultView resultModel={resultModel} />
          )}
        </div>
      </div>
    </ProfileContext.Provider>
  );
};

export default IncomeCalculator;
