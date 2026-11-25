import { TextInput } from "src/components";

const TextSettings = ({ field, onUpdate }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--theme-text-neutral-strong)] mb-2">Regex Pattern</label>

      <TextInput
        value={field.validation?.pattern || ""}
        placeholder="^[A-Za-z ]+$"
        className="h-11 rounded-lg"
        onChange={(value) =>
          onUpdate({
            validation: {
              ...field.validation,
              pattern: value,
            },
          })
        }
      />

      <p className="text-xs text-[var(--theme-text-subtle)] mt-2">Define a regular expression to validate the text input.</p>
    </div>
  );
};

export default TextSettings;
