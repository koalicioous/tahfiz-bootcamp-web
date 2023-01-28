import { useState } from "react";
import { targetTypeOptions } from "@/calculator/utils/constants";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";

const SelectTarget = () => {
  const [selectedType, setSelectedType] = useState(targetTypeOptions[0].value);
  const R = RadioGroup;
  return (
    <div className="mt-5">
      <R value={selectedType} onChange={setSelectedType}>
        {targetTypeOptions.map(({ value, label }) => (
          <R.Option value={value} key={value}>
            {({ checked }) => (
              <div
                className={clsx(
                  "transition-all py-4 px-5 border rounded-md mb-2 cursor-pointer hover:shadow text-sm hover:border-blue-200",
                  { "border-blue-400 text-blue-800 font-semibold": checked }
                )}
              >
                {label}
              </div>
            )}
          </R.Option>
        ))}
      </R>
    </div>
  );
};

export default SelectTarget;
