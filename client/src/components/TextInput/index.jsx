import { Input, InputNumber } from "antd";

const TextInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  allowClear = false,
  prefix,
  suffix,
  className = "",
  ...rest
}) => {
  const inputTypes = {
    text: Input,
    email: Input,
    password: Input.Password,
    search: Input.Search,
    number: InputNumber,
  };

  const InputComponent = inputTypes[type] || Input;

  const handleChange = (inputValue) => {
    onChange?.(inputValue);
  };

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <InputComponent
        name={name}
        type={type === "email" ? "email" : undefined}
        value={value}
        onChange={(e) => handleChange(type === "number" ? e : e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        prefix={prefix}
        suffix={suffix}
        className="w-full"
        {...rest}
      />
    </div>
  );
};

export default TextInput;
