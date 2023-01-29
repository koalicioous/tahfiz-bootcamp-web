import { Transition } from "@headlessui/react";
import { useState } from "react";
import SelectTarget from "./components/SelectTarget";

const steps = ["target", "duration", "result"];

const Calculator = () => {
  const [step, setStep] = useState(steps[0]);
  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-stone-700">
          Kalkulator Tahfiz Al-Qur&apos;an
        </h1>
      </div>
      <div>
        <Transition
          appear
          show={step === "target"}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-2"
        >
          <SelectTarget />
        </Transition>
      </div>
    </div>
  );
};

export default Calculator;
