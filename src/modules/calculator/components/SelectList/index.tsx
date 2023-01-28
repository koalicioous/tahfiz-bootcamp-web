const SelectList = ({
  options,
  value,
  onChange,
  renderItem,
}: {
  options: {
    value: string;
    label: string;
  }[];
  value: string | number;
  onChange: (value: string | number) => void;
  renderItem: ({}) => JSX.Element;
}) => {
  const selected = value;
  return (
    <div>
      {options.map(({ value, label }: { value: string; label: string }) =>
        renderItem({
          value,
          label,
          checked: value === selected,
          onChange: () => onChange(value),
        })
      )}
    </div>
  );
};

export default SelectList;
