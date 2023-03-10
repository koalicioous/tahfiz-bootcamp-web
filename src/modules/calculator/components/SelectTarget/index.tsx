import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { targetTypeOptions } from "@/calculator/utils/constants";
import { RadioGroup, Transition } from "@headlessui/react";
import {
  CheckBadgeIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/solid";
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
  DESELECT_ALL_JUZ = "DESELECT_ALL_JUZ",
  SELECT_JUZ = "SELECT_JUZ",
  DESELECT_JUZ = "DESELECT_JUZ",
  SELECT_ALL_SURAH = "SELECT_ALL_SURAH",
  DESELECT_ALL_SURAH = "DESELECT_ALL_SURAH",
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
    case SelectTargetActions.DESELECT_ALL_JUZ:
      return {
        ...state,
        selectedJuz: [],
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
    case SelectTargetActions.DESELECT_ALL_SURAH:
      return {
        ...state,
        selectedSurah: [],
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

const SelectTarget = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<string>>;
}) => {
  const [increaseAnimation, setIncreaseAnimation] = useState(false);
  const [decreaseAnimation, setDecreaseAnimation] = useState(false);
  const [state, dispatch] = useReducer(
    SelectTargetReducer,
    initialSelectTargetState
  );
  const R = RadioGroup;
  const { selectedType, selectedJuz, selectedSurah } = state;

  const allJuzSelected = useMemo(() => {
    return selectedJuz.length === Juz.length && selectedType === "juz";
  }, [selectedType, selectedJuz]);

  const allSurahSelected = useMemo(() => {
    return selectedSurah.length === Surah.length && selectedType === "surah";
  }, [selectedType, selectedSurah]);

  const handleSelectedValuesChange = (
    type: string,
    selected: boolean,
    value: string | number
  ) => {
    if (type === "all") return;
    if (type === "juz") {
      if (selected) {
        setDecreaseAnimation(true);
        dispatch({
          type: SelectTargetActions.DESELECT_JUZ,
          payload: { deselected: value },
        });
      } else {
        setIncreaseAnimation(true);
        dispatch({
          type: SelectTargetActions.SELECT_JUZ,
          payload: { selected: value },
        });
      }
    }
    if (type === "surah") {
      if (selected) {
        setDecreaseAnimation(true);
        dispatch({
          type: SelectTargetActions.DESELECT_SURAH,
          payload: { deselected: value },
        });
      } else {
        setIncreaseAnimation(true);
        dispatch({
          type: SelectTargetActions.SELECT_SURAH,
          payload: { selected: value },
        });
      }
    }
  };

  const handleClickBulk = () => {
    if (selectedType === "juz") {
      if (allJuzSelected) {
        setDecreaseAnimation(true);
        dispatch({
          type: SelectTargetActions.DESELECT_ALL_JUZ,
          payload: {},
        });
      } else {
        setIncreaseAnimation(true);
        dispatch({
          type: SelectTargetActions.SELECT_ALL_JUZ,
          payload: {},
        });
      }
    }
    if (selectedType === "surah") {
      if (allSurahSelected) {
        setDecreaseAnimation(true);
        dispatch({
          type: SelectTargetActions.DESELECT_ALL_SURAH,
          payload: {},
        });
      } else {
        setIncreaseAnimation(true);
        dispatch({
          type: SelectTargetActions.SELECT_ALL_SURAH,
          payload: {},
        });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIncreaseAnimation(false);
      setDecreaseAnimation(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [increaseAnimation, decreaseAnimation]);

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
        <R.Label>Pilih Target Hafalan:</R.Label>
        {targetTypeOptions.map(({ value, label, selectable = false }) => (
          <R.Option value={value} key={value}>
            {({ checked }) => (
              <div
                className={clsx(
                  "transition-all border rounded-md mt-2 cursor-pointer hover:shadow text-sm ",
                  { "border-blue-400 bg-white": checked },
                  {
                    "hover:border-blue-200 hover:bg-white hover:font-medium":
                      !checked,
                  }
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
                  <div className="flex items-center justify-center gap-2">
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
                    <Transition
                      show={checked && selectable && increaseAnimation}
                      enter="transition-all duration-150"
                      enterFrom="opacity-0 transform translate-y-2"
                      enterTo="opacity-100 transform translate-y-0"
                      leave="transition-all duration-150"
                      leaveFrom="opacity-100 transform translate-y-0"
                      leaveTo="opacity-0 transform -translate-y-2"
                      appear
                    >
                      <ChevronDoubleUpIcon className="w-5 h-5 text-green-600" />
                    </Transition>
                    <Transition
                      show={checked && selectable && decreaseAnimation}
                      enter="transition-all duration-150"
                      enterFrom="opacity-0 transform -translate-y-2"
                      enterTo="opacity-100 transform translate-y-0"
                      leave="transition-all duration-150"
                      leaveFrom="opacity-100 transform translate-y-0"
                      leaveTo="opacity-0 transform translate-y-2"
                      appear
                    >
                      <ChevronDoubleDownIcon className="w-5 h-5 text-red-600" />
                    </Transition>
                    {checked && selectable && (
                      <div className="text-xs text-stone-700 font-medium">
                        {value === "juz" && (
                          <div>{state.selectedJuz.length} Juz</div>
                        )}
                        {value === "surah" && (
                          <div>{state.selectedSurah.length} Surah</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {selectable && checked && (
                  <div
                    className="mt-2 px-2 pb-2 border-b bg-white flex items-center gap-1 text-xs cursor-pointer"
                    role="button"
                  >
                    <input
                      type="checkbox"
                      checked={
                        value === "juz" ? allJuzSelected : allSurahSelected
                      }
                      id="bulkCheck"
                      onChange={(e) => {
                        if (increaseAnimation || decreaseAnimation) {
                          e.stopPropagation();
                          e.preventDefault();
                          return;
                        }
                        handleClickBulk();
                      }}
                    />
                    <label htmlFor="bulkCheck" className="cursor-pointer">
                      Semua {value === "juz" ? "juz" : "surah"}
                    </label>
                  </div>
                )}
                {selectable && (
                  <Transition
                    show={checked}
                    enter="transition-all duration-500"
                    enterFrom="h-[0px] opacity-0"
                    enterTo="h-[200px] opacity-100"
                    leave="transition-all duration-500"
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
      <div className="mt-4 h-[42px]">
        <Transition
          show={
            selectedType === "all" ||
            (selectedType === "surah" && selectedSurah.length > 0) ||
            (selectedType === "juz" && selectedJuz.length > 0)
          }
          enter="transition-all duration-300"
          enterFrom="opacity-0 transform translate-y-2"
          enterTo="opacity-100 transform translate-y-0"
          leave="transition-all duration-300"
          leaveFrom="opacity-100 transform translate-y-0"
          leaveTo="opacity-0 transform translate-y-2"
        >
          <button
            onClick={() => setStep("duration")}
            className="bg-blue-500 w-full py-2 rounded text-white font-medium border border-blue-400"
          >
            Selanjutnya
          </button>
        </Transition>
      </div>
    </div>
  );
};

export default SelectTarget;
