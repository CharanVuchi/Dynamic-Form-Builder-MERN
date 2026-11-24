import { TextInput } from "src/components";

const NumberSettings = ({ field, onUpdate }) => {
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
        <label className="block text-sm font-medium text-[#344054] mb-2">Minimum Value</label>

        <TextInput type="number" value={validation.min ?? null} placeholder="Minimum" className="w-full h-11 flex items-center" onChange={(value) => handleChange("min", value)} />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#344054] mb-2">Maximum Value</label>

        <TextInput type="number" value={validation.max ?? null} placeholder="Maximum" className="w-full h-11 flex items-center" onChange={(value) => handleChange("max", value)} />
      </div>
    </div>
  );
};

export default NumberSettings;
