import { FiPlus, FiTrash2 } from "react-icons/fi";
import { Button, TextInput } from "src/components";

const toOptionValue = (label, index) => {
  const slug = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return slug || `option_${index + 1}`;
};

const SelectSettings = ({ field, onUpdate }) => {
  const options = field.options || [];

  const updateOptions = (nextOptions) => {
    onUpdate({ options: nextOptions });
  };

  const handleAddOption = () => {
    updateOptions([...options, { label: `Option ${options.length + 1}`, value: `option_${options.length + 1}` }]);
  };

  const handleLabelChange = (index, label) => {
    updateOptions(options.map((option, optionIndex) => (optionIndex === index ? { ...option, label, value: toOptionValue(label, index) } : option)));
  };

  const handleRemoveOption = (index) => {
    updateOptions(options.filter((_, optionIndex) => optionIndex !== index));
  };

  const helperText =
    field.type === "select" ? "Options shown to users in the dropdown." : field.type === "radio" ? "Options shown to users as radio buttons." : "Options shown to users as checkboxes.";

  return (
    <div className="flex flex-col gap-2">
      {options.length === 0 ? (
        <p className="text-xs text-[var(--theme-text-subtle)]">No options added yet. Add at least one option for this field.</p>
      ) : (
        options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-4 shrink-0 text-xs text-[var(--theme-text-subtle)]">{index + 1}.</span>

            <TextInput
              value={option.label}
              placeholder={`Option ${index + 1}`}
              className="h-9 rounded-lg"
              onChange={(value) => handleLabelChange(index, value)}
            />

            <button
              type="button"
              title="Remove option"
              onClick={() => handleRemoveOption(index)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--theme-text-muted)] hover:bg-[var(--theme-danger-surface)] hover:text-[var(--theme-danger-light)] transition-colors shrink-0">
              <FiTrash2 size={15} />
            </button>
          </div>
        ))
      )}

      <Button variant="outline" icon={<FiPlus size={15} />} textContent="Add Option" className="h-9 rounded-lg text-xs font-medium" onClick={handleAddOption} />

      <p className="text-xs text-[var(--theme-text-subtle)]">{helperText}</p>
    </div>
  );
};

export default SelectSettings;
