import { ChangeEvent } from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

export const Checkbox = (props: CheckboxProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setChecked(e.target.checked);
  };

  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-blue-600"
        checked={props.checked}
        onChange={handleOnChange}
      />
      <span className="text-xs">{props.label}</span>
    </label>
  );
};
