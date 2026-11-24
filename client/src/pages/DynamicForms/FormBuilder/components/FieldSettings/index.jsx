import { Card } from "antd";
import CommonSettings from "./CommonSettings";
import TextSettings from "./settings/TextSettings";
import EmailSettings from "./settings/EmailSettings";
import NumberSettings from "./settings/NumberSettings";
import PhoneSettings from "./settings/PhoneSettings";
import TextAreaSettings from "./settings/TextAreaSettings";
import DateSettings from "./settings/DateSettings";
import SelectSettings from "./settings/SelectSettings";
import RadioSettings from "./settings/RadioSettings";
import CheckboxSettings from "./settings/CheckboxSettings";

const FIELD_LABELS = {
  text: "Text",
  email: "Email",
  number: "Number",
  phone: "Phone",
  textarea: "Textarea",
  date: "Date",
  select: "Select",
  radio: "Radio",
  checkbox: "Checkbox",
};

const OPTIONS_COMPONENTS = {
  select: SelectSettings,
  radio: RadioSettings,
  checkbox: CheckboxSettings,
};

const VALIDATION_COMPONENTS = {
  text: TextSettings,
  email: EmailSettings,
  number: NumberSettings,
  phone: PhoneSettings,
  textarea: TextAreaSettings,
  date: DateSettings,
};

const FieldSettings = ({ field, onUpdate }) => {
  if (!field) {
    return (
      <Card className="rounded-xl border border-[#E5EAF2] shadow-sm h-full" styles={{ body: { padding: 20 } }}>
        <h3 className="text-lg font-semibold text-[#161F42]">Field Settings</h3>

        <div className="min-h-[350px] flex flex-col items-center justify-center text-center">
          <p className="text-sm font-medium text-[#161F42]">No Field Selected</p>

          <p className="text-xs text-[#8190AA] mt-2 max-w-[220px]">Select a field from the form canvas to configure its properties.</p>
        </div>
      </Card>
    );
  }

  const fieldLabel = FIELD_LABELS[field.type] || field.type;
  const OptionsComponent = OPTIONS_COMPONENTS[field.type];
  const ValidationComponent = VALIDATION_COMPONENTS[field.type];

  const handleUpdate = (updates) => {
    onUpdate?.(field.id, updates);
  };

  return (
    <Card className="rounded-xl border border-[#E5EAF2] shadow-sm h-full" styles={{ body: { padding: 20 } }}>
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-[#161F42]">Field Settings</h3>

        <p className="text-sm text-[#8190AA] mt-1">Configure {fieldLabel.toLowerCase()} field</p>
      </div>

      {/* Selected Field */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F0F4FA] mb-5">
        <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center">
          <span className="text-sm font-bold text-[#283B80]">{fieldLabel.charAt(0)}</span>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#161F42]">{fieldLabel}</p>
          <p className="text-xs text-[#8190AA] uppercase mt-1">{field.type} field</p>
        </div>
      </div>

      {/* Common Settings */}
      <CommonSettings field={field} onUpdate={(updates) => onUpdate?.(field.id, updates)} />

      {/* Type-specific options (select, radio, checkbox) */}
      {OptionsComponent && (
        <div className="mt-5 border-t border-[#E5EAF2] pt-5">
          <h4 className="text-sm font-semibold text-[#161F42] mb-3">Options</h4>

          <OptionsComponent field={field} onUpdate={handleUpdate} />
        </div>
      )}

      {/* Type-specific validation */}
      <div className="mt-5 border-t border-[#E5EAF2] pt-5">
        <h4 className="text-sm font-semibold text-[#161F42] mb-3">Validation</h4>

        {ValidationComponent ? (
          <ValidationComponent field={field} onUpdate={handleUpdate} />
        ) : (
          <p className="text-xs text-[#8190AA]">No additional validation settings available yet.</p>
        )}
      </div>
    </Card>
  );
};

export default FieldSettings;
