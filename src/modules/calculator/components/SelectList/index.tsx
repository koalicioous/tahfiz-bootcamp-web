import clsx from "clsx";

const SelectList = ({
  options,
  selectedValues,
  onChange,
}: {
  options: {
    value: string;
    label: string;
  }[];
  selectedValues: string[];
  onChange: (selected: boolean, value: string | number) => void;
}) => {
  return (
    <div className="p-2">
      {options.map((item) => {
        const { value, label } = item;
        const selected = selectedValues.includes(value);

        const handleClickItem = () => {
          onChange(selected, value);
        };

        return (
          <div
            key={value}
            className={clsx(
              "transition-all duration-300 p-2 border mb-2 rounded hover:border-stone-400 hover:shadow",
              {
                "border-blue-500 font-semibold text-blue-800 hover:border-blue-600 bg-blue-50":
                  selected,
              },
              { "text-stone-700 border-stone-300": !selected }
            )}
            onClick={handleClickItem}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default SelectList;
