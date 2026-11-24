import { FiTrash2 } from "react-icons/fi";
import { LuGripVertical } from "react-icons/lu";
import { FIELD_TYPES } from "../FieldTypes/config";

const FormFieldItem = ({ field, isSelected, onSelect, onDelete }) => {
  const typeConfig = FIELD_TYPES.find((fieldType) => fieldType.type === field.type);
  const Icon = typeConfig?.icon;

  return (
    <div
      onClick={() => onSelect?.(field.id)}
      className={`group flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
        isSelected ? "border-[#161F42] bg-[#F7F9FF] shadow-sm" : "border-[#E5EAF2] bg-white hover:border-[#9CD3BB]"
      }`}>
      <div className="text-[#A0AEC0] cursor-grab shrink-0">
        <LuGripVertical size={18} />
      </div>

      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-[#161F42] text-white" : "bg-[#EDF1FF] text-[#283B80]"}`}>
        {Icon && <Icon size={17} />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-[#161F42] truncate">{field.label || `Untitled ${field.type} field`}</p>

          {field.required && <span className="text-xs text-red-500">*</span>}
        </div>

        <p className="text-xs text-[#8190AA] mt-1 truncate">
          {field.fieldKey || field.type}
          {field.defaultValue ? ` · Default: ${field.defaultValue}` : ""}
        </p>
      </div>

      <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[10px] font-semibold uppercase tracking-wide text-[#64748B] shrink-0">{field.type}</span>

      <div className="flex items-center gap-0.5 shrink-0">
        <button
          type="button"
          title="Delete field"
          onClick={(event) => {
            event.stopPropagation();
            onDelete?.(field.id);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-[#718096] hover:bg-red-50 hover:text-red-500 transition-colors">
          <FiTrash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default FormFieldItem;
