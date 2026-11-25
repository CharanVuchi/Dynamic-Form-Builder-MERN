import { useEffect, useState } from "react";
import { Alert, Spin } from "antd";
import { FiFileText } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { Button, DynamicFormRenderer, Popup } from "../../../../components";
import { GetPublicFormAction } from "../../../../redux/actions/forms";
import { CreateSubmissionAction } from "../../../../redux/actions/submissions";
import { useToast } from "../../../../hooks/useToast";

const RecordFormDrawer = ({ form, onClose, onSubmitted }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const publicForm = useSelector((state) => state.forms.publicForm);
  const publicFormError = useSelector((state) => state.forms.reduxError);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(GetPublicFormAction(form.formId));
  }, [form.formId, dispatch]);

  const isLoading = !publicForm && !publicFormError;

  const error = publicFormError ? publicFormError.error?.desc || publicFormError.desc || "Unable to load this form." : "";

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);

      const result = await dispatch(CreateSubmissionAction({ formId: form.formId, values })).unwrap();

      toast.success(`Record ${result?.data?.submissionId || ""} saved successfully`);

      onSubmitted?.(result?.data);
      onClose?.();
    } catch (submitError) {
      const serverError = submitError?.error || submitError;

      toast.error(serverError?.desc || serverError?.message || "Unable to save the record.");
    } finally {
      setSubmitting(false);
    }
  };

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
        publicForm ? (
          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="outline" textContent="Cancel" onClick={onClose} />

            <Button type="submit" form="add-record-form" variant="primary" textContent="Save Record" isLoading={submitting} />
          </div>
        ) : null
      }>
      {isLoading && (
        <div className="min-h-[320px] thin-scrollbar flex flex-col items-center justify-center gap-3">
          <Spin size="large" />

          <p className="text-sm text-[var(--theme-text-muted)]">Loading form fields...</p>
        </div>
      )}

      {!isLoading && error && <Alert type="error" showIcon message="Unable to load form" description={error} />}

      {publicForm && (
        <>
          <div className="flex items-center gap-3 rounded-xl bg-[var(--theme-surface-muted)] p-4 mb-5">
            <div className="w-10 h-10 rounded-lg bg-[var(--theme-surface)] text-[var(--theme-brand-secondary)] flex items-center justify-center shrink-0">
              <FiFileText size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--theme-brand-primary)] truncate">{publicForm.name}</p>

              <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                {publicForm.formId} · {publicForm.fields?.length || 0} fields
              </p>
            </div>
          </div>

          <DynamicFormRenderer form={publicForm} formId="add-record-form" showActions={false} onSubmit={handleSubmit} />
        </>
      )}
    </Popup>
  );
};

export default RecordFormDrawer;
