import { useState } from "react";
import { targetTypeOptions } from "@/calculator/utils/constants";
import { RadioGroup, Transition } from "@headlessui/react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
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
                  "transition-all py-4 px-5 border rounded-md mb-2 cursor-pointer hover:shadow text-sm flex items-center justify-between",
                  { "border-blue-400 text-blue-500 font-semibold": checked },
                  { "hover:border-blue-200": !checked }
                )}
              >
                <span>{label}</span>
                <Transition
                  show={checked}
                  enter="transition-opacity duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <CheckBadgeIcon className="w-5 h-5 text-blue-400" />
                </Transition>
              </div>
            )}
          </R.Option>
        ))}
      </R>
    </div>
  );
};

export default SelectTarget;
