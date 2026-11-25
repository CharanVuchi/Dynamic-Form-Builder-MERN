import { Input } from "antd";

const { TextArea } = Input;

const TextAreaComponent = ({
  label,
  name,
  value,
  onChange,
  placeholder = "Enter your text",
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  showCount = false,
  allowClear = true,
  className = "",
  ...rest
}) => {
  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-[var(--theme-text-neutral-dark)]">
          {label}
          {required && <span className="ml-1 text-[var(--theme-danger-light)]">*</span>}
        </label>
      )}

      <TextArea
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        showCount={showCount}
        allowClear={allowClear}
        className="w-full"
        {...rest}
      />
    </div>
  );
};

export default TextAreaComponent;
