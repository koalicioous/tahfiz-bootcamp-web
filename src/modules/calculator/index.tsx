import SelectTarget from "./components/SelectTarget";

const Calculator = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-stone-700">
          Kalkutator Tahfiz Al-Qur&apos;an
        </h1>
        <p className="text-sm text-stone-500">
          Temukan cara mencapai target hafalanmu
        </p>
      </div>
      <div>
        <SelectTarget />
      </div>
    </div>
  );
};

export default Calculator;
