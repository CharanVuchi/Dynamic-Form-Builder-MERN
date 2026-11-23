import { DatePicker } from "antd";

const DatePickerComponent = ({
  label,
  name,
  value,
  onChange,
  placeholder = "Select date",
  required = false,
  disabled = false,
  allowClear = true,
  format = "DD-MM-YYYY",
  className = "",
  ...rest
}) => {
  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <DatePicker
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        format={format}
        className="w-full"
        {...rest}
      />
    </div>
  );
};

export default DatePickerComponent;
