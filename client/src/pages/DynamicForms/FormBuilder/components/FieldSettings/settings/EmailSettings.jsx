import { TextInput } from "src/components";

const EmailSettings = ({ field, onUpdate }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--theme-text-neutral-strong)] mb-2">Allowed Domain</label>

      <TextInput
        value={field.validation?.allowedDomain || ""}
        placeholder="example.com"
        className="h-11 rounded-lg"
        onChange={(value) =>
          onUpdate({
            validation: {
              ...field.validation,
              allowedDomain: value,
            },
          })
        }
      />

      <p className="text-xs text-[var(--theme-text-subtle)] mt-2">Allow email addresses from a specific domain. Leave empty to allow all domains.</p>
    </div>
  );
};

export default EmailSettings;
