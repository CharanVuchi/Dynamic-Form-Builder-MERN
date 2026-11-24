import { useEffect, useMemo, useState } from "react";
import { Tag, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Table } from "src/components";

import RecordFormDrawer from "./components/RecordFormDrawer";
import { useNavigate } from "react-router-dom";
import { GetFormsAction } from "src/redux/actions/forms";

const DynamicForms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const forms = useSelector((state) => state.forms.forms);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(undefined);
  const [recordForm, setRecordForm] = useState(null);

  useEffect(() => {
    dispatch(GetFormsAction());
  }, [dispatch]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Search and filter
  const filteredForms = useMemo(() => {
    return forms.filter((form) => {
      const matchesSearch = form.name.toLowerCase().includes(search.toLowerCase()) || form.formId.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = !status || form.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [forms, search, status]);

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

  const handleView = (record) => {
    console.log("View Form:", record);
  };

  const handleEdit = (record) => {
    console.log("Edit Form:", record);
  };

  const handleDelete = (record) => {
    console.log("Delete Form:", record);
  };

  const handleOpenAddRecord = (record) => {
    setRecordForm(record);
  };

  const handleRecordSubmitted = (submission) => {
    dispatch(GetFormsAction());
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
          <p className="font-semibold text-[#1F1F1F]">{name}</p>

          <p className="text-xs text-[#94A3B8] mt-1">{record.formId}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "12%",
      render: (status) => (
        <Tag variant="filled" className={`!rounded-full !px-3 !py-1 !font-medium ${status === "Published" ? "!bg-[#E8F8EF] !text-[#16834B]" : "!bg-[#FFF3DC] !text-[#B7791F]"}`}>
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
      width: "16%",
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
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#BDE2D1] bg-[#F3FBF7] px-2.5 py-1.5 text-xs font-semibold text-[#16834B] whitespace-nowrap transition-colors hover:bg-[#E8F8EF] disabled:cursor-not-allowed disabled:border-[#E5EAF2] disabled:bg-[#F8FAFC] disabled:text-[#A0AEC0]">
                <FiPlus size={14} />
                Add Record
              </button>
            </Tooltip>

            <Tooltip title="View">
              <button type="button" onClick={() => handleView(record)} className="text-[#283B80] hover:text-[#161F42]">
                <FiEye size={16} />
              </button>
            </Tooltip>

            <Tooltip title="Edit">
              <button type="button" onClick={() => handleEdit(record)} className="text-[#283B80] hover:text-[#161F42]">
                <FiEdit2 size={16} />
              </button>
            </Tooltip>

            <Tooltip title="Delete">
              <button type="button" onClick={() => handleDelete(record)} className="text-[#FF3B30] hover:text-red-700">
                <FiTrash2 size={16} />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  // Current page data
  const startIndex = (pagination.current - 1) * pagination.pageSize;

  const currentForms = filteredForms.slice(startIndex, startIndex + pagination.pageSize);

  return (
    <div className="flex flex-col gap-7">
      {/* Page Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-[#161F42]">Forms</h1>

          <p className="text-base text-[#718096]">Create, manage and publish your forms.</p>
        </div>
      </div>

      {/* Forms Table Container */}
      <div className="bg-white rounded-xl border border-[#E5EAF2] shadow-sm p-6">
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
          dataSource={currentForms}
          rowKey="id"
          showAdd={true}
          onAdd={handleCreateForm}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: filteredForms.length,
            showSizeChanger: false,
          }}
          onPageChange={handlePageChange}
          itemLabel="forms"
        />
      </div>

      {recordForm && <RecordFormDrawer form={recordForm} onClose={() => setRecordForm(null)} onSubmitted={handleRecordSubmitted} />}
    </div>
  );
};

export default DynamicForms;
