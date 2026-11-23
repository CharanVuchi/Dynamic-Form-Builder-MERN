import { Select } from "antd";

const SelectMenu = ({
  label,
  name,
  value,
  options = [],
  onChange,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  allowClear = true,
  showSearch = false,
  mode,
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

      <Select
        name={name}
        value={value}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        showSearch={showSearch}
        mode={mode}
        optionFilterProp="label"
        className="w-full"
        {...rest}
      />
    </div>
  );
};

export default SelectMenu;
