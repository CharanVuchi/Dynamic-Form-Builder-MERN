import { Card } from "antd";
import { FIELD_TYPES } from "./config";

const FieldTypes = ({ onAddField, selectedType }) => {
  return (
    <Card
      className="rounded-xl border border-[#E5EAF2] shadow-sm h-full"
      styles={{
        body: {
          padding: 20,
        },
      }}>
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-[#161F42]">Add Fields</h3>

        <p className="text-sm text-[#8190AA] mt-1">Click a field to add it to your form</p>
      </div>

      {/* Field Types */}
      <div className="flex flex-col gap-3">
        {FIELD_TYPES.map((field) => {
          const Icon = field.icon;

          const isSelected = selectedType === field.type;

          return (
            <button
              key={field.type}
              type="button"
              onClick={() => onAddField?.(field.type)}
              className={`
                w-full flex items-center gap-3
                p-3 rounded-lg border text-left
                transition-all duration-200
                ${isSelected ? "border-[#161F42] bg-[#E7ECFF4D]" : "border-[#E5EAF2] bg-white hover:border-[#9CD3BB] hover:bg-[#F8FBF9]"}
              `}>
              {/* Icon */}
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                  ${isSelected ? "bg-[#161F42] text-white" : "bg-[#EDF1FF] text-[#283B80]"}
                `}>
                <Icon size={19} />
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#161F42]">{field.label}</p>

                <p className="text-xs text-[#8190AA] mt-1">{field.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default FieldTypes;
