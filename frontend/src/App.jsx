import IncomeCalculator from './componenets/IncomeCalculator';

function App() {
  return (
    <>
      <div className='-z-10 absolute left-0 top-0 bg-hero-pattern  w-screen h-screen bg-cover'></div>
      <div className='-z-10 absolute left-0 top-0 bg-black bg-opacity-60 w-screen h-screen bg-cover'></div>
      <div className='grid justify-center items-start mt-20 w-full'>
        <div className='grid justify-center text-5xl font-normal text-white '>
          Income Tax Calulator
        </div>
        <div className='grid justify-center font-light px-96 text-white mt-2'>
          <p className='font-sans text-center'>
            Welcome to the Effortless Income Tax Calculator, your tool for easy
            and accurate tax estimation. Whether you're salaried, self-employed,
            or have multiple income sources, our user-friendly calculator
            simplifies tax calculations. Just input your financial details, and
            get a clear tax breakdown in minutes. Say goodbye to tax-time stress
            and manage your finances smarter with our precise and up-to-date
            tool.
          </p>
        </div>
        <div className='px-96 pt-8'>
          <IncomeCalculator />
        </div>
      </div>
    </>
  );
}

export default App;
