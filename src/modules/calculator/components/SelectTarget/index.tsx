import { useState } from "react";
import { targetTypeOptions } from "@/calculator/utils/constants";
import { RadioGroup, Transition } from "@headlessui/react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

const SelectTarget = () => {
  const [selectedType, setSelectedType] = useState(targetTypeOptions[0].value);
  const R = RadioGroup;
  return (
    <div className="mt-6">
      <R value={selectedType} onChange={setSelectedType}>
        {targetTypeOptions.map(({ value, label, selectable = false }) => (
          <R.Option value={value} key={value}>
            {({ checked }) => (
              <div
                className={clsx(
                  "transition-all border rounded-md mt-2 cursor-pointer hover:shadow text-sm ",
                  { "border-blue-400 ": checked },
                  { "hover:border-blue-200": !checked }
                )}
              >
                <div
                  className={clsx(
                    "flex items-center justify-between py-4 px-5",
                    { "text-blue-600 font-semibold": checked }
                  )}
                >
                  <span>{label}</span>
                  <Transition
                    show={checked && !selectable}
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
                {selectable && (
                  <Transition
                    show={checked}
                    enter="transition-all duration-500"
                    enterFrom="h-[0px] opacity-0"
                    enterTo="h-[200px] opacity-100"
                    leave="transition-all duration-300"
                    leaveFrom="h-[200px] opacity-100"
                    leaveTo="h-[0px] opacity-0"
                  >
                    <div className="border-t"></div>
                    {/* Must Select */}
                  </Transition>
                )}
              </div>
            )}
          </R.Option>
        ))}
      </R>
    </div>
  );
};

export default SelectTarget;
