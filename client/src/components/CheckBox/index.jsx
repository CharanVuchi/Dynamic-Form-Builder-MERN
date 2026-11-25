import { Checkbox } from "antd";

const CheckboxComponent = ({ label, name, checked = false, onChange, disabled = false, required = false, className = "", ...rest }) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <Checkbox name={name} checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} {...rest}>
        <span className="text-sm text-[var(--theme-text-neutral-dark)]">
          {label}
          {required && <span className="ml-1 text-[var(--theme-danger-light)]">*</span>}
        </span>
      </Checkbox>
    </div>
  );
};

export default CheckboxComponent;
