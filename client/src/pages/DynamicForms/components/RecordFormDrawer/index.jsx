import { useEffect, useState } from "react";
import { Alert, Spin } from "antd";
import { FiFileText } from "react-icons/fi";
import { Button, DynamicFormRenderer, Popup } from "../../../../components";
import { createFormSubmission, getPublicForm } from "../../../../services/formService";
import { useToast } from "../../../../hooks/useToast";

const RecordFormDrawer = ({ form, onClose, onSubmitted }) => {
  const toast = useToast();

  const [formState, setFormState] = useState({ formId: null, schema: null, error: "" });
  const [submitting, setSubmitting] = useState(false);

  const isCurrentForm = formState.formId === form.formId;
  const schema = isCurrentForm ? formState.schema : null;
  const error = isCurrentForm ? formState.error : "";

  useEffect(() => {
    let cancelled = false;

    getPublicForm(form.formId)
      .then((data) => {
        if (!cancelled) setFormState({ formId: form.formId, schema: data, error: "" });
      })
      .catch((requestError) => {
        if (!cancelled) {
          setFormState({ formId: form.formId, schema: null, error: requestError.message || "Unable to load this form." });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [form.formId]);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);

      const submission = await createFormSubmission(schema, values);

      toast.success(`Record ${submission.submissionId} saved successfully`);

      onSubmitted?.(submission);
      onClose?.();
    } catch (submitError) {
      toast.error(submitError.message || "Unable to save the record.");
    } finally {
      setSubmitting(false);
    }
  };

  const isLoading = !schema && !error;

  return (
    <Popup
      open={!!form}
      onClose={onClose}
      title={form.name ? `Add Record · ${form.name}` : "Add Record"}
      width={720}
      centered
      closable
      confirmClose={false}
      footer={
        schema ? (
          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="outline" textContent="Cancel" onClick={onClose} />

            <Button type="submit" form="add-record-form" variant="primary" textContent="Save Record" isLoading={submitting} />
          </div>
        ) : null
      }>
      {isLoading && (
        <div className="min-h-[320px] thin-scrollbar flex flex-col items-center justify-center gap-3">
          <Spin size="large" />

          <p className="text-sm text-[#718096]">Loading form fields...</p>
        </div>
      )}

      {!isLoading && error && <Alert type="error" showIcon message="Unable to load form" description={error} />}

      {schema && (
        <>
          <div className="flex items-center gap-3 rounded-xl bg-[#F0F4FA] p-4 mb-5">
            <div className="w-10 h-10 rounded-lg bg-white text-[#283B80] flex items-center justify-center shrink-0">
              <FiFileText size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#161F42] truncate">{schema.name}</p>

              <p className="text-xs text-[#718096] mt-0.5">
                {schema.formId} · {schema.fields?.length || 0} fields
              </p>
            </div>
          </div>

          <DynamicFormRenderer form={schema} formId="add-record-form" showActions={false} onSubmit={handleSubmit} />
        </>
      )}
    </Popup>
  );
};

export default RecordFormDrawer;
