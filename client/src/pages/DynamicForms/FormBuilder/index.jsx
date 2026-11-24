import { useState } from "react";
import { useDispatch } from "react-redux";
import { BreadCrumbs } from "src/components";
import { CreateFormAction, UpdateFormAction } from "src/redux/actions/forms";
import { BuilderHeader, FieldTypes, FormCanvas, FieldSettings, FormPreview } from "./components";
import useFormBuilder from "../../../hooks/useFormBuilder";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";

const Create = () => {
  const [status, setStatus] = useState("Draft");
  const [formId, setFormId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const { fields, selectedField, selectedFieldId, formMeta, addField, selectField, deleteField, reorderFields, updateField, updateFormMeta } = useFormBuilder();

  const buildPayload = (overrides = {}) => ({
    name: formMeta.name || "",
    description: formMeta.description || "",
    fields,
    ...overrides,
  });

  // Preview Form
  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  // Save Form as Draft
  const handleSaveDraft = async () => {
    try {
      setSaving(true);

      if (formId) {
        const result = await dispatch(UpdateFormAction(buildPayload({ id: formId, status: "Draft" }))).unwrap();
        if (result?.code === 200) {
          toast.success(result?.success?.desc || "Form updated successfully.");
          setStatus(result?.data?.status || "Draft");
          navigate(-1);
        } else {
          toast.error(result?.error?.desc || "Unable to update the form.");
        }
      } else {
        const result = await dispatch(CreateFormAction(buildPayload({ status: "Draft" }))).unwrap();
        if (result?.code === 201) {
          toast.success(result?.success?.desc || "Form created successfully.");
          setFormId(result?.data?.formId);
          setStatus(result?.data?.status || "Draft");
          navigate(-1);
        } else {
          toast.error(result?.error?.desc || "Unable to create the form.");
        }
      }
    } catch (error) {
      const serverError = error?.error || error;
      toast.error(serverError?.desc || serverError?.message || "Unable to save the form.");
    } finally {
      setSaving(false);
    }
  };

  // Publish Form
  const handlePublish = async () => {
    try {
      setPublishing(true);

      if (formId) {
        const result = await dispatch(UpdateFormAction(buildPayload({ id: formId, status: "Published" }))).unwrap();
        if (result?.code === 200) {
          toast.success(result?.success?.desc || "Form updated successfully.");
          setStatus(result?.data?.status || "Published");
          navigate(-1);
        } else {
          toast.error(result?.error?.desc || "Unable to update the form.");
        }
      } else {
        const result = await dispatch(CreateFormAction(buildPayload({ status: "Published" }))).unwrap();
        if (result?.code === 201) {
          toast.success(result?.success?.desc || "Form created successfully.");
          setFormId(result?.data?.formId);
          setStatus(result?.data?.status || "Published");
          navigate(-1);
        } else {
          toast.error(result?.error?.desc || "Unable to create the form.");
        }
      }
    } catch (error) {
      const serverError = error?.error || error;
      toast.error(serverError?.desc || serverError?.message || "Unable to publish the form.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <>
      <BreadCrumbs />

      <div className="flex flex-col gap-6">
        {/* Builder Header */}
        <BuilderHeader status={status} onPreview={handlePreview} onSaveDraft={handleSaveDraft} onPublish={handlePublish} saving={saving} publishing={publishing} />

        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-4">
            <FieldTypes onAddField={addField} selectedType={selectedField?.type} />
          </div>
          <div className="col-span-4">
            <FormCanvas
              fields={fields}
              formMeta={formMeta}
              selectedFieldId={selectedFieldId}
              onSelectField={selectField}
              onDeleteField={deleteField}
              onReorderFields={reorderFields}
              onUpdateFormMeta={updateFormMeta}
              onAddField={addField}
            />
          </div>

          <div className="col-span-4">
            <FieldSettings field={selectedField} onUpdate={updateField} />
          </div>
        </div>
      </div>

      {/* Form Preview */}
      <FormPreview open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} formMeta={formMeta} fields={fields} />
    </>
  );
};

export default Create;
