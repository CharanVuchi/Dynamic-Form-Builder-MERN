import { Card, Dropdown } from "antd";
import { FiFileText, FiPlus } from "react-icons/fi";
import { TextInput } from "src/components";
import FormFieldItem from "./FormFieldItem";
import EmptyCanvas from "./EmptyCanvas";
import { FIELD_TYPES } from "../FieldTypes/config";

const FormCanvas = ({ fields = [], formMeta = {}, selectedFieldId, onSelectField, onDeleteField, onReorderFields, onUpdateFormMeta, onAddField }) => {
  const handleDrop = (event, targetIndex) => {
    event.preventDefault();

    const sourceIndex = Number(event.dataTransfer.getData("fieldIndex"));

    if (!Number.isInteger(sourceIndex) || sourceIndex < 0 || sourceIndex >= fields.length || sourceIndex === targetIndex) {
      return;
    }

    const updatedFields = [...fields];
    const [movedField] = updatedFields.splice(sourceIndex, 1);

    updatedFields.splice(targetIndex, 0, movedField);

    onReorderFields?.(updatedFields);
  };

  const handleDropAtEnd = (event) => {
    event.preventDefault();

    const sourceIndex = Number(event.dataTransfer.getData("fieldIndex"));

    if (!Number.isInteger(sourceIndex) || sourceIndex < 0 || sourceIndex >= fields.length || sourceIndex === fields.length - 1) {
      return;
    }

    const updatedFields = [...fields];
    const [movedField] = updatedFields.splice(sourceIndex, 1);

    updatedFields.push(movedField);
    onReorderFields?.(updatedFields);
  };

  const moveField = (index, direction) => {
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= fields.length) {
      return;
    }

    const updatedFields = [...fields];
    const [movedField] = updatedFields.splice(index, 1);

    updatedFields.splice(targetIndex, 0, movedField);
    onReorderFields?.(updatedFields);
  };

  const addFieldMenu = {
    items: FIELD_TYPES.map((fieldType) => ({
      key: fieldType.type,
      label: fieldType.label,
      icon: <fieldType.icon size={16} />,
    })),
    onClick: ({ key }) => onAddField?.(key),
  };

  return (
    <Card className="h-full rounded-xl border border-[var(--theme-border-default)] shadow-sm" styles={{ body: { padding: 20 } }}>
      {/* Default form fields: Form Name and Description */}
      <div className="grid grid-cols-2 gap-4 pb-5 mb-5 border-b border-[var(--theme-border-default)]">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[var(--theme-text-neutral-strong)]">
              Form Name <span className="text-[var(--theme-danger-light)]">*</span>
            </label>
          </div>

          <TextInput value={formMeta.name || ""} placeholder="Enter form name" className="h-10 rounded-lg" onChange={(value) => onUpdateFormMeta?.({ name: value })} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[var(--theme-text-neutral-strong)]">Description</label>
          </div>

          <TextInput
            value={formMeta.description || ""}
            placeholder="Enter form description"
            className="h-10 rounded-lg"
            onChange={(value) => onUpdateFormMeta?.({ description: value })}
          />
        </div>
      </div>

      {/* Fields Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-[var(--theme-brand-primary)]">Form Fields</h3>

            <span className="text-xs font-semibold text-[var(--theme-text-secondary)] bg-[var(--theme-brand-wash)] px-2 py-0.5 rounded-full">{fields.length}</span>
          </div>

          <p className="text-sm text-[var(--theme-text-subtle)] mt-1">Select a field to configure its properties. Use arrows to reorder.</p>
        </div>

        <Dropdown menu={addFieldMenu} trigger={["click"]} placement="bottomRight">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--theme-brand-primary)] text-[var(--theme-white)] text-sm font-medium whitespace-nowrap hover:bg-[var(--theme-brand-hover)] transition-colors shrink-0">
            <FiPlus size={16} />
            Add Field
          </button>
        </Dropdown>
      </div>

      {fields.length === 0 ? (
        <EmptyCanvas />
      ) : (
        <div className="flex flex-col gap-2.5 min-h-[420px]" onDragOver={(event) => event.preventDefault()} onDrop={handleDropAtEnd}>
          {fields?.map((field, index) => (
            <div
              key={field.id}
              draggable
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("fieldIndex", String(index));
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.stopPropagation();
                handleDrop(event, index);
              }}>
              <FormFieldItem
                field={field}
                index={index}
                total={fields.length}
                isSelected={selectedFieldId === field.id}
                onSelect={onSelectField}
                onDelete={onDeleteField}
                onMoveUp={() => moveField(index, -1)}
                onMoveDown={() => moveField(index, 1)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Footer count */}
      <div className="flex items-center gap-2 text-xs text-[var(--theme-text-muted)] mt-4">
        <FiFileText size={14} />
        <span>
          {fields.length} {fields.length === 1 ? "Field" : "Fields"}
        </span>
      </div>
    </Card>
  );
};

export default FormCanvas;
