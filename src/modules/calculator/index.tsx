import SelectTarget from "./components/SelectTarget";

const Calculator = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-stone-700">
          Kalkulator Tahfiz Al-Qur&apos;an
        </h1>
      </div>
      <div>
        <SelectTarget />
      </div>
    </div>
  );
};

export default Calculator;
