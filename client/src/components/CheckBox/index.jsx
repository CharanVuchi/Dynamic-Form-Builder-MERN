import { Checkbox } from "antd";

const Checkbox = ({ label, name, checked = false, onChange, disabled = false, required = false, className = "", ...rest }) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <Checkbox name={name} checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} {...rest}>
        <span className="text-sm text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </span>
      </Checkbox>
    </div>
  );
};

export default Checkbox;
