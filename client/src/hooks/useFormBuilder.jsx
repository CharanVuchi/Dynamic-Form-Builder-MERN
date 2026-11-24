import { useCallback, useState } from "react";

const createField = (type, order) => ({
  id: crypto.randomUUID(),
  type,
  label: `${type} field`,
  fieldKey: `${type}_${order + 1}`,
  placeholder: "",
  defaultValue: "",
  required: false,
  order,
});

const normalizeFieldOrder = (fields) =>
  fields.map((field, index) => ({
    ...field,
    order: index,
  }));

const useFormBuilder = (initialFields = []) => {
  const [fields, setFields] = useState(() => normalizeFieldOrder(initialFields));
  const [selectedFieldId, setSelectedFieldId] = useState(null);

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

  return {
    fields,
    selectedFieldId,
    selectedField: fields.find((field) => field.id === selectedFieldId) || null,
    addField,
    selectField,
    deleteField,
    duplicateField,
    reorderFields,
    updateField,
    loadFields,
  };
};

export default useFormBuilder;
