import { useState } from "react";
import { BreadCrumbs } from "src/components";
import { BuilderHeader, FieldTypes, FormCanvas,FieldSettings } from "./components";
import useFormBuilder from "../../../hooks/useFormBuilder";

const Create = () => {
  const [status, setStatus] = useState("Draft");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const { fields, selectedField, selectedFieldId, addField, selectField, deleteField, duplicateField, reorderFields, updateField } = useFormBuilder();

  // Preview Form
  const handlePreview = () => {
    console.log("Preview Form");
  };

  // Save Form as Draft
  const handleSaveDraft = async () => {
    try {
      setSaving(true);

      console.log("Saving form as draft...");

      // Backend API integration will be added later.
    } catch (error) {
      console.error("Error saving draft:", error);
    } finally {
      setSaving(false);
    }
  };

  // Publish Form
  const handlePublish = async () => {
    try {
      setPublishing(true);

      console.log("Publishing form...");

      // Backend API integration will be added later.
    } catch (error) {
      console.error("Error publishing form:", error);
    } finally {
      setPublishing(false);
    }
  };

  // Add Field
  const handleAddField = (type) => {
    setSelectedType(type);
    console.log("Selected field type:", type);
  };

  return (
    <>
      <BreadCrumbs />

      <div className="flex flex-col gap-6">
        {/* Builder Header */}
        <BuilderHeader status={status} onPreview={handlePreview} onSaveDraft={handleSaveDraft} onPublish={handlePublish} saving={saving} publishing={publishing} />

        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3">
            <FieldTypes onAddField={addField} selectedType={selectedField?.type} />
          </div>
          <div className="col-span-6">
            <FormCanvas
              fields={fields}
              selectedFieldId={selectedFieldId}
              onSelectField={selectField}
              onDeleteField={deleteField}
              onDuplicateField={duplicateField}
              onReorderFields={reorderFields}
            />
          </div>

          <div className="col-span-3">
            <FieldSettings field={selectedField} onUpdate={updateField} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
