import clsx from "clsx";

const SelectList = ({
  options,
  value,
  onChange,
}: {
  options: {
    value: string;
    label: string;
  }[];
  value: string | number;
  onChange: (value: string | number) => void;
}) => {
  const selected = value;
  return (
    <div className="p-2">
      {options.map((item) => {
        const { value, label } = item;
        return (
          <div
            key={value}
            className={clsx(
              "transition-all p-2 border mb-2 rounded hover:border-stone-400"
            )}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default SelectList;
