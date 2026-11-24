import { useMemo } from "react";
import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select } from "antd";
import dayjs from "dayjs";

import Button from "../Button";

const { TextArea } = Input;

const FULL_WIDTH_TYPES = ["textarea", "radio", "checkbox"];

const buildRules = (field) => {
  const rules = [];
  const validation = field.validation || {};

  if (field.required) {
    rules.push({ required: true, message: `${field.label} is required` });
  }

  if (field.type === "email") {
    rules.push({ type: "email", message: "Enter a valid email address" });
  }

  if (field.type === "phone") {
    rules.push({ pattern: /^[0-9+\-\s()]{7,15}$/, message: "Enter a valid mobile number" });
  }

  if (validation.minLength !== null && validation.minLength !== undefined) {
    rules.push({ min: validation.minLength, message: `Minimum ${validation.minLength} characters required` });
  }

  if (validation.maxLength !== null && validation.maxLength !== undefined) {
    rules.push({ max: validation.maxLength, message: `Maximum ${validation.maxLength} characters allowed` });
  }

  if (validation.pattern) {
    try {
      rules.push({ pattern: new RegExp(validation.pattern), message: "The value does not match the expected format" });
    } catch {
      // Ignore an invalid regex saved in the builder.
    }
  }

  if (validation.allowedDomain) {
    const domains = validation.allowedDomain
      .split(",")
      .map((domain) => domain.trim().toLowerCase())
      .filter(Boolean);

    if (domains.length > 0) {
      rules.push({
        validator: (_, value) => {
          if (!value) return Promise.resolve();

          const domain = String(value).split("@")[1]?.toLowerCase();

          return domains.includes(domain) ? Promise.resolve() : Promise.reject(new Error(`Email must be from ${domains.join(", ")}`));
        },
      });
    }
  }

  if (field.type === "number") {
    if (validation.min !== null && validation.min !== undefined) {
      rules.push({ type: "number", min: validation.min, message: `Value must be at least ${validation.min}` });
    }

    if (validation.max !== null && validation.max !== undefined) {
      rules.push({ type: "number", max: validation.max, message: `Value must be at most ${validation.max}` });
    }
  }

  return rules;
};

const getInitialValues = (fields = []) =>
  fields.reduce((values, field) => {
    if (field.defaultValue === undefined || field.defaultValue === null || field.defaultValue === "") {
      return values;
    }

    values[field.fieldKey] = field.type === "date" ? dayjs(field.defaultValue) : field.defaultValue;

    return values;
  }, {});

const renderControl = (field, disabled) => {
  const validation = field.validation || {};

  switch (field.type) {
    case "number":
      return <InputNumber className="w-full" placeholder={field.placeholder} min={validation.min ?? undefined} max={validation.max ?? undefined} disabled={disabled} />;

    case "textarea":
      return <TextArea rows={field.rows || 4} placeholder={field.placeholder} maxLength={validation.maxLength ?? undefined} showCount={Boolean(validation.maxLength)} disabled={disabled} />;

    case "date":
      return (
        <DatePicker
          className="w-full"
          format="DD-MM-YYYY"
          placeholder={field.placeholder || "Select date"}
          disabled={disabled}
          disabledDate={(current) => {
            if (!current) return false;

            const beforeStart = validation.minDate && current.isBefore(dayjs(validation.minDate), "day");
            const afterEnd = validation.maxDate && current.isAfter(dayjs(validation.maxDate), "day");

            return Boolean(beforeStart || afterEnd);
          }}
        />
      );

    case "select":
      return <Select placeholder={field.placeholder || "Select an option"} options={field.options || []} allowClear optionFilterProp="label" disabled={disabled} />;

    case "radio":
      return <Radio.Group options={field.options || []} disabled={disabled} />;

    case "checkbox":
      return <Checkbox.Group options={field.options || []} disabled={disabled} />;

    case "email":
      return <Input type="email" placeholder={field.placeholder} disabled={disabled} />;

    case "phone":
      return <Input type="tel" maxLength={15} placeholder={field.placeholder} disabled={disabled} />;

    case "text":
    default:
      return <Input placeholder={field.placeholder} disabled={disabled} />;
  }
};

const DynamicFormRenderer = ({ form, submitting = false, onSubmit, onCancel, submitLabel = "Submit", showActions = true, disabled = false, formId = "dynamic-form" }) => {
  const initialValues = useMemo(() => getInitialValues(form?.fields), [form]);

  const handleFinish = (values) => {
    const normalizedValues = Object.entries(values).reduce((result, [key, value]) => {
      result[key] = dayjs.isDayjs(value) ? value.format("YYYY-MM-DD") : value;

      return result;
    }, {});

    onSubmit?.(normalizedValues);
  };

  return (
    <Form id={formId} layout="vertical" initialValues={initialValues} onFinish={handleFinish} requiredMark="optional" className="flex flex-col gap-1">
      {form?.description && <p className="text-sm text-[#718096] mb-4">{form.description}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        {(form?.fields || []).map((field) => {
          const isFullWidth = FULL_WIDTH_TYPES.includes(field.type);

          return (
            <Form.Item
              key={field.id || field.fieldKey}
              name={field.fieldKey}
              label={field.label}
              rules={buildRules(field)}
              className={isFullWidth ? "sm:col-span-2" : undefined}>
              {renderControl(field, disabled)}
            </Form.Item>
          );
        })}
      </div>

      {showActions && (
        <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 border-t border-[#E5EAF2] bg-white pt-4 mt-2 pb-1">
          <Button type="button" variant="outline" textContent="Cancel" onClick={onCancel} />

          <Button type="submit" variant="primary" textContent={submitLabel} isLoading={submitting} />
        </div>
      )}
    </Form>
  );
};

export default DynamicFormRenderer;
