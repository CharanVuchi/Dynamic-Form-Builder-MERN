import { Alert } from "antd";
import { Button, DynamicFormRenderer, Popup } from "../../../../../components";

const FormPreview = ({ open = false, onClose, formMeta = {}, fields = [] }) => {
  const form = {
    name: formMeta.name || "Form Preview",
    description: formMeta.description,
    fields,
  };

  return (
    <Popup open={open} onClose={onClose} title={`Preview · ${formMeta.name || "Form"}`} width={720} centered closable footer={null} confirmClose={false}>
      {fields.length === 0 && (
        <Alert type="info" showIcon message="Empty preview" description="Add at least one field to see a preview." className="mb-4" />
      )}

      {fields.length > 0 && (
        <div className="rounded-xl border border-[#E5EAF2] bg-white p-6">
          <DynamicFormRenderer form={form} showActions={false} formId="form-preview" />
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <Button type="button" variant="outline" textContent="Close" onClick={onClose} />
      </div>
    </Popup>
  );
};

export default FormPreview;
