import { TextInput } from "src/components";

const TextAreaSettings = ({ field, onUpdate }) => {
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
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-[var(--theme-text-neutral-strong)] mb-2">Minimum Length</label>

          <TextInput type="number"
            min={0}
            value={validation.minLength ?? null}
            placeholder="Minimum"
            className="w-full h-10 flex items-center"
            onChange={(value) => handleChange("minLength", value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--theme-text-neutral-strong)] mb-2">Maximum Length</label>

          <TextInput type="number"
            min={1}
            value={validation.maxLength ?? null}
            placeholder="Maximum"
            className="w-full h-10 flex items-center"
            onChange={(value) => handleChange("maxLength", value)}
          />
        </div>
      </div>

      <p className="text-xs text-[var(--theme-text-subtle)]">Restrict how many characters users can enter in the text area. Leave empty for no limit.</p>
    </div>
  );
};

export default TextAreaSettings;
