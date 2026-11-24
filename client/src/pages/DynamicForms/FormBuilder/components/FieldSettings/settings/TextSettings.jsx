import { Input } from "antd";

const TextSettings = ({ field, onUpdate }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#344054] mb-2">Regex Pattern</label>

      <Input
        value={field.validation?.pattern || ""}
        placeholder="^[A-Za-z ]+$"
        className="h-11 rounded-lg"
        onChange={(event) =>
          onUpdate({
            validation: {
              ...field.validation,
              pattern: event.target.value,
            },
          })
        }
      />

      <p className="text-xs text-[#8190AA] mt-2">Define a regular expression to validate the text input.</p>
    </div>
  );
};

export default TextSettings;
