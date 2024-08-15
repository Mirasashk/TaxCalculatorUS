import IncomeCalculator from './componenets/IncomeCalculator';

/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The JSX element representing the main application component.
 */
function App() {
  return (
    <div className='bg-slate-300 min-h-screen'>
      <div className='max-w-screen mx-auto px-4 tablet:px-20 laptop:px-40 desktop:px-80 pb-8'>
        <h1 className='text-center pt-4 text-3xl md:text-4xl lg:text-5xl font-normal'>
          Income Tax Calulator
        </h1>
        <p className='font-light laptop:font-normal text-center max-w-screen text-pretty my-2'>
          Welcome to the Effortless Income Tax Calculator, your tool for easy
          and accurate tax estimation. Just input your financial details, and
          get a clear tax breakdown in minutes.
        </p>
        <IncomeCalculator />
      </div>
    </div>
  );
}

export default App;
