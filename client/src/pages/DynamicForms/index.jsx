import { useEffect, useState } from "react";
import { App, Tag, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Table } from "src/components";

import RecordFormDrawer from "./components/RecordFormDrawer";
import { useNavigate } from "react-router-dom";
import { DeleteFormAction, GetFormAction, GetFormsAction } from "src/redux/actions/forms";
import { useToast } from "src/hooks/useToast";
import { formatDateTimeIST } from "src/utils/dateTime";
import { FormPreview } from "./FormBuilder/components";

const DynamicForms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modal } = App.useApp();
  const toast = useToast();

  const { forms, pagination: paginationInfo, reduxLoading: loading } = useSelector((state) => state.forms);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(undefined);
  const [recordForm, setRecordForm] = useState(null);
  const [viewedForm, setViewedForm] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(
      GetFormsAction({
        page: pagination.current,
        limit: pagination.pageSize,
        search,
        status,
      }),
    );
  }, [dispatch, pagination, search, status]);

  // Reset page when search or filter changes
  const handleSearch = (value) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleFilterChange = (key, value) => {
    setStatus(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  // Action handlers
  const handleCreateForm = () => {
    navigate("/dynamic-forms/create");
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
  };

  const handleView = async (record) => {
    try {
      const result = await dispatch(GetFormAction(record.id)).unwrap();

      if (result?.code === 200 && result?.data) {
        setViewedForm(result.data);
      } else {
        toast.error(result?.error?.desc || "Unable to load the form.");
      }
    } catch (error) {
      const serverError = error?.error || error;
      toast.error(serverError?.desc || serverError?.message || "Unable to load the form.");
    }
  };

  const handleEdit = (record) => {
    navigate(`/dynamic-forms/${record.id}/edit`);
  };

  const handleDelete = (record) => {
    modal.confirm({
      title: "Delete form?",
      content: `Form "${record.name}" will be permanently removed.`,
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      centered: true,
      onOk: async () => {
        try {
          const result = await dispatch(DeleteFormAction(record.id)).unwrap();

          if (result?.code === 200) {
            toast.success(result?.success?.desc || "Form deleted successfully.");
            if (forms.length === 1 && pagination.current > 1) {
              setPagination((previous) => ({ ...previous, current: previous.current - 1 }));
            } else {
              dispatch(
                GetFormsAction({
                  page: pagination.current,
                  limit: pagination.pageSize,
                  search,
                  status,
                }),
              );
            }
          } else {
            toast.error(result?.error?.desc || "Unable to delete the form.");
          }
        } catch (error) {
          const serverError = error?.error || error;
          toast.error(serverError?.desc || serverError?.message || "Unable to delete the form.");
        }
      },
    });
  };

  const handleOpenAddRecord = (record) => {
    setRecordForm(record);
  };

  const handleRecordSubmitted = () => {
    dispatch(
      GetFormsAction({
        page: pagination.current,
        limit: pagination.pageSize,
        search,
        status,
      }),
    );
  };

  // Table columns
  const columns = [
    {
      title: "Form Name",
      dataIndex: "name",
      key: "name",
      width: "24%",
      render: (name, record) => (
        <div>
          <p className="font-semibold text-[var(--theme-text-primary)]">{name}</p>

          <p className="text-xs text-[var(--theme-text-disabled)] mt-1">{record.formId}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "12%",
      render: (status) => (
        <Tag variant="filled" className={`!rounded-full !px-3 !py-1 !font-medium ${status === "Published" ? "!bg-[var(--theme-success-surface)] !text-[var(--theme-success-text)]" : "!bg-[var(--theme-warning-background)] !text-[var(--theme-warning-text)]"}`}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Fields",
      dataIndex: "fields",
      key: "fields",
      width: "8%",
    },
    {
      title: "Submissions",
      dataIndex: "submissions",
      key: "submissions",
      width: "12%",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "18%",
      render: (updatedAt) => formatDateTimeIST(updatedAt),
    },
    {
      title: "Actions",
      key: "actions",
      width: "28%",
      render: (_, record) => {
        const isPublished = record.status === "Published";

        return (
          <div className="flex items-center gap-2.5">
            <Tooltip title={isPublished ? "Add a record to this form" : "Publish this form to add records"}>
              <button
                type="button"
                disabled={!isPublished}
                onClick={() => handleOpenAddRecord(record)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--theme-brand-accent-hover)] bg-[var(--theme-surface-accent)] px-2.5 py-1.5 text-xs font-semibold text-[var(--theme-success-text)] whitespace-nowrap transition-colors hover:bg-[var(--theme-success-surface)] disabled:cursor-not-allowed disabled:border-[var(--theme-border-default)] disabled:bg-[var(--theme-surface-disabled)] disabled:text-[var(--theme-text-disabled-light)] cursor-pointer">
                <FiPlus size={14} />
                Add Record
              </button>
            </Tooltip>

            <Tooltip title="View">
              <button type="button" onClick={() => handleView(record)} className="text-[var(--theme-brand-secondary)] hover:text-[var(--theme-brand-primary)] cursor-pointer">
                <FiEye size={16} />
              </button>
            </Tooltip>

            <Tooltip title="Edit">
              <button type="button" onClick={() => handleEdit(record)} className="text-[var(--theme-brand-secondary)] hover:text-[var(--theme-brand-primary)] cursor-pointer">
                <FiEdit2 size={16} />
              </button>
            </Tooltip>

            <Tooltip title="Delete">
              <button type="button" onClick={() => handleDelete(record)} className="text-[var(--theme-danger)] hover:text-[var(--theme-danger-hover)] cursor-pointer">
                <FiTrash2 size={16} />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-7">
      {/* Page Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-[var(--theme-brand-primary)]">Forms</h1>

          <p className="text-base text-[var(--theme-text-muted)]">Create, manage and publish your forms.</p>
        </div>
      </div>

      {/* Forms Table Container */}
      <div className="bg-[var(--theme-surface)] rounded-xl border border-[var(--theme-border-default)] shadow-sm p-6">
        <Table
          search={{
            value: search,
            onChange: handleSearch,
          }}
          searchPlaceholder="Search forms..."
          filters={[
            {
              key: "status",
              placeholder: "All Status",
              options: [
                { label: "Published", value: "Published" },
                { label: "Draft", value: "Draft" },
              ],
            },
          ]}
          filterValues={{ status }}
          onFilterChange={handleFilterChange}
          columns={columns}
          dataSource={forms}
          loading={loading}
          rowKey="id"
          showAdd={true}
          onAdd={handleCreateForm}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: paginationInfo.total,
            showSizeChanger: false,
          }}
          onPageChange={handlePageChange}
          itemLabel="forms"
        />
      </div>

      {recordForm && <RecordFormDrawer form={recordForm} onClose={() => setRecordForm(null)} onSubmitted={handleRecordSubmitted} />}

      {viewedForm && <FormPreview open={true} onClose={() => setViewedForm(null)} formMeta={viewedForm} fields={viewedForm.fields || []} />}
    </div>
  );
};

export default DynamicForms;
