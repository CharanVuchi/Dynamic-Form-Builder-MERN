import { Input } from "antd";

const EmailSettings = ({ field, onUpdate }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#344054] mb-2">Allowed Domain</label>

      <Input
        value={field.validation?.allowedDomain || ""}
        placeholder="example.com"
        className="h-11 rounded-lg"
        onChange={(event) =>
          onUpdate({
            validation: {
              ...field.validation,
              allowedDomain: event.target.value,
            },
          })
        }
      />

      <p className="text-xs text-[#8190AA] mt-2">Allow email addresses from a specific domain. Leave empty to allow all domains.</p>
    </div>
  );
};

export default EmailSettings;
