import { Card } from "antd";
import { FIELD_TYPES } from "./config";

const FieldTypes = ({ onAddField, selectedType }) => {
  return (
    <Card
      className="rounded-xl border border-[var(--theme-border-default)] shadow-sm h-full"
      styles={{
        body: {
          padding: 20,
        },
      }}>
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-[var(--theme-brand-primary)]">Add Fields</h3>

        <p className="text-sm text-[var(--theme-text-subtle)] mt-1">Click a field to add it to your form</p>
      </div>

      {/* Field Types */}
      <div className="grid grid-cols-2 gap-3">
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
                ${isSelected ? "border-[var(--theme-brand-primary)] bg-[var(--theme-brand-wash-transparent)]" : "border-[var(--theme-border-default)] bg-[var(--theme-surface)] hover:border-[var(--theme-brand-accent)] hover:bg-[var(--theme-surface-accent-hover)]"}
              `}>
              {/* Icon */}
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                  ${isSelected ? "bg-[var(--theme-brand-primary)] text-[var(--theme-white)]" : "bg-[var(--theme-brand-wash)] text-[var(--theme-brand-secondary)]"}
                `}>
                <Icon size={19} />
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--theme-brand-primary)]">{field.label}</p>

                <p className="text-xs text-[var(--theme-text-subtle)] mt-1">{field.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default FieldTypes;
