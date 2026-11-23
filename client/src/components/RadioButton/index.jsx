import { Radio } from "antd";

const RadioButton = ({ label, name, value, options = [], onChange, required = false, disabled = false, direction = "vertical", className = "", ...rest }) => {
  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <Radio.Group
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={direction === "horizontal" ? "flex flex-row flex-wrap gap-4" : "flex flex-col gap-2"}
        {...rest}>
        {options.map((option) => (
          <Radio key={option.value} value={option.value} disabled={option.disabled || disabled}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default RadioButton;
