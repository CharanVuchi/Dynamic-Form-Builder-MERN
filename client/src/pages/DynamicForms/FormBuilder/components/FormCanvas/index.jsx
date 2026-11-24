import { FiFileText } from "react-icons/fi";
import { Card } from "antd";
import FormFieldItem from "./FormFieldItem";
import EmptyCanvas from "./EmptyCanvas";

const FormCanvas = ({ fields = [], selectedFieldId, onSelectField, onDeleteField, onDuplicateField, onReorderFields }) => {
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

  return (
    <Card className="h-full rounded-xl border border-[#E5EAF2] shadow-sm" styles={{ body: { padding: 20 } }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-[#161F42]">Form Canvas</h3>
          <p className="text-sm text-[#8190AA] mt-1">Arrange and manage your form fields</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#718096]">
          <FiFileText size={15} />
          <span>{fields.length} Fields</span>
        </div>
      </div>

      {fields.length === 0 ? (
        <EmptyCanvas />
      ) : (
        <div className="flex flex-col gap-3 min-h-[420px]" onDragOver={(event) => event.preventDefault()} onDrop={handleDropAtEnd}>
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
                isSelected={selectedFieldId === field.id}
                onSelect={onSelectField}
                onDelete={onDeleteField}
                onDuplicate={onDuplicateField}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default FormCanvas;
