import { TextInput } from "src/components";

const PhoneSettings = ({ field, onUpdate }) => {
  const validation = field.validation || {};

  const handleChange = (key, value) => {
    onUpdate({
      validation: {
        ...validation,
        [key]: value,
      },
    });
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-sm font-medium text-[var(--theme-text-neutral-strong)] mb-2">Minimum Length</label>

        <TextInput type="number"
          min={1}
          value={validation.minLength ?? null}
          placeholder="Minimum"
          className="w-full h-11 flex items-center"
          onChange={(value) => handleChange("minLength", value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--theme-text-neutral-strong)] mb-2">Maximum Length</label>

        <TextInput type="number"
          min={1}
          value={validation.maxLength ?? null}
          placeholder="Maximum"
          className="w-full h-11 flex items-center"
          onChange={(value) => handleChange("maxLength", value)}
        />
      </div>
    </div>
  );
};

export default PhoneSettings;
