import IncomeCalculator from './componenets/IncomeCalculator';

function App() {
  return (
    <>
      <div className='h-[110vh] overflow-x-hidden'>
        <div className='-z-10 absolute left-0 top-0 bg-hero-pattern  w-full  h-[110vh] bg-cover'></div>
        <div className='-z-10 absolute left-0 top-0 bg-black bg-opacity-60 w-full  h-[110vh] bg-cover'></div>

        <div className='grid justify-center items-start mt-4 w-full'>
          <div className='grid justify-center text-5xl font-normal text-white '>
            Income Tax Calulator
          </div>
          <div className='grid justify-center font-light px-96 text-white mt-2'>
            <p className='font-sans text-center'>
              Welcome to the Effortless Income Tax Calculator, your tool for
              easy and accurate tax estimation. Whether you&apos;re salaried,
              self-employed, or have multiple income sources, our user-friendly
              calculator simplifies tax calculations. Just input your financial
              details, and get a clear tax breakdown in minutes. Say goodbye to
              tax-time stress and manage your finances smarter with our precise
              and up-to-date tool.
            </p>
          </div>
          <div className='px-72 pt-4 pb-20'>
            <IncomeCalculator />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
