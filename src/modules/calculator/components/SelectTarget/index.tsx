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
    //  Juz
    case SelectTargetActions.SELECT_ALL_JUZ:
      return {
        ...state,
        selectedJuz: Juz.map((juz) => juz.id),
      };
    case SelectTargetActions.SELECT_JUZ:
      return {
        ...state,
        selectedJuz: [...state.selectedJuz, action.payload.selected],
      };
    case SelectTargetActions.DESELECT_JUZ:
      return {
        ...state,
        selectedJuz: state.selectedJuz.filter(
          (juz) => juz !== action.payload.deselected
        ),
      };
    //  Surah
    case SelectTargetActions.SELECT_ALL_SURAH:
      return {
        ...state,
        selectedSurah: Surah.map((surah) => surah.id),
      };
    case SelectTargetActions.SELECT_SURAH:
      return {
        ...state,
        selectedSurah: [...state.selectedSurah, action.payload.selected],
      };
    case SelectTargetActions.DESELECT_SURAH:
      return {
        ...state,
        selectedSurah: state.selectedSurah.filter(
          (surah) => surah !== action.payload.deselected
        ),
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
  console.log(state);

  const handleSelectedValuesChange = (
    type: string,
    selected: boolean,
    value: string | number
  ) => {
    if (type === "all") return;
    if (type === "juz") {
      if (selected) {
        dispatch({
          type: SelectTargetActions.DESELECT_JUZ,
          payload: { deselected: value },
        });
      } else {
        dispatch({
          type: SelectTargetActions.SELECT_JUZ,
          payload: { selected: value },
        });
      }
    }
    if (type === "surah") {
      if (selected) {
        dispatch({
          type: SelectTargetActions.DESELECT_SURAH,
          payload: { deselected: value },
        });
      } else {
        dispatch({
          type: SelectTargetActions.SELECT_SURAH,
          payload: { selected: value },
        });
      }
    }
  };

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
                    { "text-blue-600 font-semibold": checked },
                    { "border-b border-stone-300": selectable && checked }
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
                      selectedValues={
                        value === "all"
                          ? []
                          : value === "juz"
                          ? state.selectedJuz
                          : state.selectedSurah
                      }
                      onChange={(selected, sentValue) => {
                        handleSelectedValuesChange(value, selected, sentValue);
                      }}
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
