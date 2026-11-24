import { useMemo, useState } from "react";
import { Button, Tag, Tooltip } from "antd";
import { FiPlus, FiInbox, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Table } from "src/components";

import formsData from "./data.json";
import { useNavigate } from "react-router-dom";

const DynamicForms = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(undefined);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Search and filter
  const filteredForms = useMemo(() => {
    return formsData.forms.filter((form) => {
      const matchesSearch = form.name.toLowerCase().includes(search.toLowerCase()) || form.formId.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = !status || form.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

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

  const handleSubmissions = (record) => {
    console.log("View Submissions:", record);
  };

  const handleDelete = (record) => {
    console.log("Delete Form:", record);
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
      width: "13%",
      render: (status) => (
        <Tag bordered={false} className={`rounded-full px-3 py-1 font-medium ${status === "Published" ? "bg-[#E8F8EF] text-[#16834B]" : "bg-[#FFF3DC] text-[#B7791F]"}`}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Fields",
      dataIndex: "fields",
      key: "fields",
      width: "9%",
    },
    {
      title: "Submissions",
      dataIndex: "submissions",
      key: "submissions",
      width: "14%",
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
      width: "24%",
      render: (_, record) => (
        <div className="flex items-center gap-5">
          <Tooltip title="Submissions">
            <button type="button" onClick={() => handleSubmissions(record)} className="text-[#283B80] hover:text-[#161F42]">
              <FiInbox size={20} />
            </button>
          </Tooltip>

          <Tooltip title="View">
            <button type="button" onClick={() => handleView(record)} className="text-[#283B80] hover:text-[#161F42]">
              <FiEye size={20} />
            </button>
          </Tooltip>

          <Tooltip title="Edit">
            <button type="button" onClick={() => handleEdit(record)} className="text-[#283B80] hover:text-[#161F42]">
              <FiEdit2 size={20} />
            </button>
          </Tooltip>

          <Tooltip title="Delete">
            <button type="button" onClick={() => handleDelete(record)} className="text-[#FF3B30] hover:text-red-700">
              <FiTrash2 size={20} />
            </button>
          </Tooltip>
        </div>
      ),
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
    </div>
  );
};

export default DynamicForms;
