import { FiCopy,  FiTrash2 } from "react-icons/fi";
import { LuGripVertical } from "react-icons/lu";

const FormFieldItem = ({ field, index, isSelected, onSelect, onDelete, onDuplicate }) => {
  return (
    <div
      onClick={() => onSelect?.(field.id)}
      className={`group flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
        isSelected ? "border-[#161F42] bg-[#F7F9FF] shadow-sm" : "border-[#E5EAF2] bg-white hover:border-[#9CD3BB]"
      }`}>
      <div className="text-[#A0AEC0] cursor-grab">
        <LuGripVertical size={20} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-[#161F42]">{field.label || `Untitled ${field.type} field`}</p>

          {field.required && <span className="text-xs text-red-500">*</span>}
        </div>

        <p className="text-xs text-[#8190AA] mt-1">
          {field.type}
          {field.placeholder ? ` · ${field.placeholder}` : ""}
        </p>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          title="Duplicate field"
          onClick={(event) => {
            event.stopPropagation();
            onDuplicate?.(field.id);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-[#718096] hover:bg-[#EDF1FF] hover:text-[#161F42]">
          <FiCopy size={16} />
        </button>

        <button
          type="button"
          title="Delete field"
          onClick={(event) => {
            event.stopPropagation();
            onDelete?.(field.id);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-[#718096] hover:bg-red-50 hover:text-red-500">
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default FormFieldItem;
