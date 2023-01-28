import { useReducer } from "react";
import { targetTypeOptions } from "@/calculator/utils/constants";
import { RadioGroup, Transition } from "@headlessui/react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import SelectList from "../SelectList";
import { Juz, Surah } from "@/modules/core/QuranCoreData/constant";

type SelectTargetState = {
  selectedType: string;
  selectedJuz: string[];
  selectedSurah: string[];
};

type SelectTargetAction = {
  type: SelectTargetActions;
  payload: any;
};

enum SelectTargetActions {
  SELECT_TYPE = "SELECT_TYPE",
  SELECT_ALL_JUZ = "SELECT_ALL_JUZ",
  SELECT_JUZ = "SELECT_JUZ",
  DESELECT_JUZ = "DESELECT_JUZ",
  SELECT_ALL_SURAH = "SELECT_ALL_SURAH",
  SELECT_SURAH = "SELECT_SURAH",
  DESELECT_SURAH = "DESELECT_SURAH",
}

const SelectTargetReducer = (
  state: SelectTargetState,
  action: SelectTargetAction
): SelectTargetState => {
  switch (action.type) {
    case SelectTargetActions.SELECT_TYPE:
      return {
        ...state,
        ...action.payload,
        selectedJuz: [],
        selectedSurah: [],
      };
    default:
      return state;
  }
};

const initialSelectTargetState: SelectTargetState = {
  selectedType: targetTypeOptions[0].value,
  selectedJuz: [],
  selectedSurah: [],
};

const SelectTarget = () => {
  const [state, dispatch] = useReducer(
    SelectTargetReducer,
    initialSelectTargetState
  );
  const R = RadioGroup;

  return (
    <div className="mt-6">
      <R
        value={state.selectedType}
        onChange={(e: string) => {
          dispatch({
            type: SelectTargetActions.SELECT_TYPE,
            payload: { selectedType: e },
          });
        }}
      >
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
                    className="overflow-y-scroll"
                  >
                    <div className="border-t"></div>
                    <SelectList
                      options={
                        value === "juz"
                          ? Juz.map(({ id, label }) => ({
                              value: id,
                              label,
                            }))
                          : Surah.map(({ id, name }) => ({
                              value: id,
                              label: name,
                            }))
                      }
                      value={1}
                      onChange={() => {}}
                    />
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
