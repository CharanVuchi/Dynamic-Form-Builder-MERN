import { Switch, ConfigProvider } from "antd";
import { SelectMenu, TextInput } from "src/components";

const FIELD_TYPE_OPTIONS = [
  { label: "Text", value: "text" },
  { label: "Email", value: "email" },
  { label: "Number", value: "number" },
  { label: "Phone", value: "phone" },
  { label: "Textarea", value: "textarea" },
  { label: "Date", value: "date" },
  { label: "Select", value: "select" },
  { label: "Radio", value: "radio" },
  { label: "Checkbox", value: "checkbox" },
];

const CommonSettings = ({ field, onUpdate }) => {
  if (!field) return null;

  const handleChange = (key, value) => {
    onUpdate?.({ [key]: value });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Field Type */}
      <div>
        <label className="block text-sm font-medium text-[#344054] mb-2">Field Type</label>

        <SelectMenu value={field.type} options={FIELD_TYPE_OPTIONS} className="w-full h-11" onChange={(value) => handleChange("type", value)} />
      </div>

      {/* Label */}
      <div>
        <label className="block text-sm font-medium text-[#344054] mb-2">
          Label <span className="text-red-500">*</span>
        </label>

        <TextInput value={field.label || ""} placeholder="Enter field label" className="h-11 rounded-lg" onChange={(value) => handleChange("label", value)} />
      </div>

      {/* Field Key */}
      <div>
        <label className="block text-sm font-medium text-[#344054] mb-2">
          Field Key <span className="text-red-500">*</span>
        </label>

        <TextInput value={field.fieldKey || ""} placeholder="Enter field key" className="h-11 rounded-lg" onChange={(value) => handleChange("fieldKey", value)} />
      </div>

      {/* Placeholder */}
      <div>
        <label className="block text-sm font-medium text-[#344054] mb-2">Placeholder</label>

        <TextInput value={field.placeholder || ""} placeholder="Enter placeholder" className="h-11 rounded-lg" onChange={(value) => handleChange("placeholder", value)} />
      </div>

      {/* Default Value */}
      <div>
        <label className="block text-sm font-medium text-[#344054] mb-2">Default Value</label>

        <TextInput
          value={field.defaultValue || ""}
          placeholder="Enter default value"
          className="h-11 rounded-lg"
          onChange={(value) => handleChange("defaultValue", value)}
        />
      </div>

      {/* Required */}
      <div className="flex items-center justify-between border-t border-[#E5EAF2] pt-4">
        <div>
          <p className="text-sm font-medium text-[#344054]">Required field</p>
          <p className="text-xs text-[#8190AA] mt-1">Users must complete this field</p>
        </div>

        <ConfigProvider
          theme={{
            components: {
              Switch: {
                colorPrimary: "#161F42",
                colorPrimaryHover: "#161F42",
              },
            },
          }}>
          <Switch checked={Boolean(field.required)} onChange={(checked) => handleChange("required", checked)} />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default CommonSettings;
