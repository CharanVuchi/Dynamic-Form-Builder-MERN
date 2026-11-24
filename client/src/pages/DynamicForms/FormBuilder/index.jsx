import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BreadCrumbs } from "src/components";
import { Spin } from "antd";
import { CreateFormAction, GetFormAction, UpdateFormAction } from "src/redux/actions/forms";
import { BuilderHeader, FieldTypes, FormCanvas, FieldSettings, FormPreview } from "./components";
import useFormBuilder from "../../../hooks/useFormBuilder";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";

const Create = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("Draft");
  const [formId, setFormId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [loadedFormId, setLoadedFormId] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const { fields, selectedField, selectedFieldId, formMeta, addField, selectField, deleteField, reorderFields, updateField, updateFormMeta, loadFields } = useFormBuilder();

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const loadForm = async () => {
      try {
        const result = await dispatch(GetFormAction(id)).unwrap();
        if (cancelled) return;

        if (result?.code !== 200 || !result?.data) {
          toast.error(result?.error?.desc || "Unable to load the form.");
          navigate("/dynamic-forms", { replace: true });
          return;
        }

        const form = result.data;
        setFormId(form._id || form.id || id);
        setStatus(form.status || "Draft");
        updateFormMeta({
          name: form.name || "",
          description: form.description || "",
          showName: form.showName ?? true,
          showDescription: form.showDescription ?? true,
        });
        loadFields(
          (form.fields || []).map((field, index) => ({
            ...field,
            id: field.id || field._id || crypto.randomUUID(),
            order: field.order ?? index,
          })),
        );
        setLoadedFormId(id);
      } catch (error) {
        if (cancelled) return;

        const serverError = error?.error || error;
        toast.error(serverError?.desc || serverError?.message || "Unable to load the form.");
        navigate("/dynamic-forms", { replace: true });
      }
    };

    loadForm();

    return () => {
      cancelled = true;
    };
  }, [dispatch, id, loadFields, navigate, toast, updateFormMeta]);
  const loadingForm = Boolean(id) && loadedFormId !== id;

  const buildPayload = (overrides = {}) => ({
    name: formMeta.name || "",
    description: formMeta.description || "",
    showName: formMeta.showName ?? true,
    showDescription: formMeta.showDescription ?? true,
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

  if (loadingForm) {
    return (
      <>
        <BreadCrumbs />
        <div className="flex min-h-[320px] items-center justify-center">
          <Spin size="large" />
        </div>
      </>
    );
  }

  return (
    <>
      <BreadCrumbs />

      <div className="flex flex-col gap-6">
        {/* Builder Header */}
        <BuilderHeader
          title={id ? "Edit Form" : "Create Form"}
          status={status}
          onPreview={handlePreview}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
          saving={saving}
          publishing={publishing}
        />

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
