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
        isSelected ? "border-[var(--theme-brand-primary)] bg-[var(--theme-surface-selected)] shadow-sm" : "border-[var(--theme-border-default)] bg-[var(--theme-surface)] hover:border-[var(--theme-brand-accent)]"
      }`}>
      <div className="text-[var(--theme-text-disabled-light)] cursor-grab shrink-0">
        <LuGripVertical size={18} />
      </div>

      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-[var(--theme-brand-primary)] text-[var(--theme-white)]" : "bg-[var(--theme-brand-wash)] text-[var(--theme-brand-secondary)]"}`}>
        {Icon && <Icon size={17} />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-[var(--theme-brand-primary)] truncate">{field.label || `Untitled ${field.type} field`}</p>

          {field.required && <span className="text-xs text-[var(--theme-danger-light)]">*</span>}
        </div>

        <p className="text-xs text-[var(--theme-text-subtle)] mt-1 truncate">
          {field.fieldKey || field.type}
          {field.defaultValue ? ` · Default: ${field.defaultValue}` : ""}
        </p>
      </div>

      <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-[var(--theme-surface-slate)] text-[10px] font-semibold uppercase tracking-wide text-[var(--theme-text-slate)] shrink-0">{field.type}</span>

      <div className="flex items-center gap-0.5 shrink-0">
        <button
          type="button"
          title="Delete field"
          onClick={(event) => {
            event.stopPropagation();
            onDelete?.(field.id);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--theme-text-muted)] hover:bg-[var(--theme-danger-surface)] hover:text-[var(--theme-danger-light)] transition-colors">
          <FiTrash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default FormFieldItem;
