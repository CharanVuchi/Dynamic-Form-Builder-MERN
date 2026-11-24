import { useCallback, useState } from "react";

const OPTION_FIELD_TYPES = ["select", "radio", "checkbox"];

const createDefaultOptions = () => [
  { label: "Option 1", value: "option_1" },
  { label: "Option 2", value: "option_2" },
];

const createField = (type, order) => ({
  id: crypto.randomUUID(),
  type,
  label: `${type} field`,
  fieldKey: `${type}_${order + 1}`,
  placeholder: "",
  defaultValue: "",
  required: false,
  order,
  validation: {},
  ...(OPTION_FIELD_TYPES.includes(type) ? { options: createDefaultOptions() } : {}),
  ...(type === "textarea" ? { rows: 4 } : {}),
});

const normalizeFieldOrder = (fields) =>
  fields.map((field, index) => ({
    ...field,
    order: index,
  }));

const DEFAULT_FORM_META = {
  name: "Customer Registration",
  description: "Register customer details for service requests.",
  showName: true,
  showDescription: true,
};

const DEFAULT_FIELDS = [
  {
    type: "text",
    label: "Full Name",
    fieldKey: "fullName",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    type: "email",
    label: "Email",
    fieldKey: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    type: "phone",
    label: "Mobile Number",
    fieldKey: "mobile",
    placeholder: "Enter your mobile number",
    required: true,
  },
  {
    type: "select",
    label: "Gender",
    fieldKey: "gender",
    placeholder: "Select gender",
    required: true,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
  {
    type: "select",
    label: "Department",
    fieldKey: "department",
    placeholder: "Select department",
    required: true,
    options: [
      { label: "Engineering", value: "engineering" },
      { label: "Human Resources", value: "human_resources" },
      { label: "Sales", value: "sales" },
      { label: "Marketing", value: "marketing" },
      { label: "Finance", value: "finance" },
    ],
  },
  {
    type: "text",
    label: "Designation",
    fieldKey: "designation",
    placeholder: "Enter designation",
    required: true,
  },
  {
    type: "radio",
    label: "Role",
    fieldKey: "role",
    placeholder: "",
    required: true,
    options: [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
      { label: "Manager", value: "manager" },
    ],
  },
  {
    type: "textarea",
    label: "Description",
    fieldKey: "description",
    placeholder: "Enter description",
    required: false,
    rows: 4,
  },
];

const createDefaultFields = () =>
  DEFAULT_FIELDS.map((field, index) => ({
    id: crypto.randomUUID(),
    placeholder: "",
    defaultValue: "",
    required: false,
    validation: {},
    ...field,
    order: index,
  }));

const useFormBuilder = (initialFields = []) => {
  const [fields, setFields] = useState(() => normalizeFieldOrder(initialFields.length > 0 ? initialFields : createDefaultFields()));
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [formMeta, setFormMeta] = useState(DEFAULT_FORM_META);

  const addField = useCallback(
    (type) => {
      const newField = createField(type, fields.length);

      setFields((previousFields) => [...previousFields, { ...newField, order: previousFields.length }]);

      setSelectedFieldId(newField.id);
    },
    [fields.length],
  );

  const selectField = useCallback((fieldId) => {
    setSelectedFieldId(fieldId);
  }, []);

  const deleteField = useCallback((fieldId) => {
    setFields((previousFields) => {
      const updatedFields = previousFields.filter((field) => field.id !== fieldId);

      return normalizeFieldOrder(updatedFields);
    });

    setSelectedFieldId((currentId) => (currentId === fieldId ? null : currentId));
  }, []);

  const duplicateField = useCallback((fieldId) => {
    setFields((previousFields) => {
      const fieldIndex = previousFields.findIndex((field) => field.id === fieldId);

      if (fieldIndex === -1) return previousFields;

      const originalField = previousFields[fieldIndex];

      const duplicatedField = {
        ...originalField,
        id: crypto.randomUUID(),
        label: `${originalField.label} (Copy)`,
      };

      const updatedFields = [...previousFields];
      updatedFields.splice(fieldIndex + 1, 0, duplicatedField);

      return normalizeFieldOrder(updatedFields);
    });
  }, []);

  const reorderFields = useCallback((updatedFields) => {
    setFields(normalizeFieldOrder(updatedFields));
  }, []);

  const updateField = useCallback((fieldId, updates) => {
    setFields((previousFields) => previousFields.map((field) => (field.id === fieldId ? { ...field, ...updates } : field)));
  }, []);

  const loadFields = useCallback((savedFields = []) => {
    const orderedFields = [...savedFields].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    setFields(normalizeFieldOrder(orderedFields));
    setSelectedFieldId(null);
  }, []);

  const updateFormMeta = useCallback((updates) => {
    setFormMeta((previousMeta) => ({ ...previousMeta, ...updates }));
  }, []);

  return {
    fields,
    selectedFieldId,
    selectedField: fields?.find((field) => field.id === selectedFieldId) || null,
    formMeta,
    addField,
    selectField,
    deleteField,
    duplicateField,
    reorderFields,
    updateField,
    updateFormMeta,
    loadFields,
  };
};

export default useFormBuilder;
