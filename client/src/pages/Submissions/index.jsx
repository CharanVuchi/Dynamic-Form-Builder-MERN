import { useEffect, useMemo, useState } from "react";
import { App, Tag, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FiClock, FiEye, FiFileText, FiInbox, FiTrash2 } from "react-icons/fi";

import { Button, Popup, Table } from "src/components";
import { useToast } from "src/hooks/useToast";
import { GetFormsAction } from "src/redux/actions/forms";
import { DeleteSubmissionAction, GetSubmissionsAction } from "src/redux/actions/submissions";
import { formatDateTimeIST } from "src/utils/dateTime";

const STATUS_STYLES = {
  New: "!bg-[#E8F8EF] !text-[#16834B]",
  Reviewed: "!bg-[#EDF1FF] !text-[#283B80]",
};

const Submissions = () => {
  const { modal } = App.useApp();
  const toast = useToast();

  const dispatch = useDispatch();

  const { submissions, pagination: paginationInfo, stats: submissionStats, reduxLoading: loading } = useSelector((state) => state.submissions);
  const forms = useSelector((state) => state.forms.forms);
  const [search, setSearch] = useState("");
  const [formFilter, setFormFilter] = useState(undefined);
  const [statusFilter, setStatusFilter] = useState(undefined);
  const [viewRecord, setViewRecord] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8 });

  useEffect(() => {
    dispatch(
      GetSubmissionsAction({
        page: pagination.current,
        limit: pagination.pageSize,
        search,
        formId: formFilter,
        status: statusFilter,
      }),
    );
  }, [dispatch, pagination, search, formFilter, statusFilter]);

  const formOptions = useMemo(() => {
    return forms.map((form) => ({ label: form.name, value: form.formId }));
  }, [forms]);

  useEffect(() => {
    dispatch(GetFormsAction({ page: 1, limit: 100 }));
  }, [dispatch]);

  const stats = useMemo(() => {
    return [
      { label: "Total Submissions", value: submissionStats.totalCount, icon: FiInbox },
      { label: "New Records", value: submissionStats.newCount, icon: FiClock },
      { label: "Forms with Records", value: submissionStats.formsWithRecords, icon: FiFileText },
    ];
  }, [submissionStats]);

  const handleSearch = (value) => {
    setSearch(value);
    setPagination((previous) => ({ ...previous, current: 1 }));
  };

  const handleFilterChange = (key, value) => {
    if (key === "formId") setFormFilter(value);
    if (key === "status") setStatusFilter(value);

    setPagination((previous) => ({ ...previous, current: 1 }));
  };

  const handlePageChange = (page, pageSize) => {
    setPagination((previous) => ({
      current: pageSize !== previous.pageSize ? 1 : page,
      pageSize,
    }));
  };

  const handleDelete = (record) => {
    modal.confirm({
      title: "Delete submission?",
      content: `Submission ${record.submissionId} will be permanently removed.`,
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      centered: true,
      onOk: async () => {
        try {
          const result = await dispatch(DeleteSubmissionAction(record.id)).unwrap();

          if (result?.code === 200) {
            toast.success(result?.success?.desc || `Submission ${record.submissionId} deleted successfully.`);

            if (viewRecord?.id === record.id) {
              setViewRecord(null);
            }
            if (submissions.length === 1 && pagination.current > 1) {
              setPagination((previous) => ({ ...previous, current: previous.current - 1 }));
            } else {
              dispatch(
                GetSubmissionsAction({
                  page: pagination.current,
                  limit: pagination.pageSize,
                  search,
                  formId: formFilter,
                  status: statusFilter,
                }),
              );
            }
          } else {
            toast.error(result?.error?.desc || "Unable to delete the submission.");
          }
        } catch (error) {
          const serverError = error?.error || error;
          toast.error(serverError?.desc || serverError?.message || "Unable to delete the submission.");
        }
      },
    });
  };

  const columns = [
    {
      title: "Submission",
      dataIndex: "submissionId",
      key: "submissionId",
      width: "13%",
      render: (submissionId) => <p className="text-sm font-semibold text-[#161F42]">{submissionId}</p>,
    },
    {
      title: "Form",
      dataIndex: "formName",
      key: "formName",
      width: "18%",
      render: (formName, record) => (
        <div>
          <p className="font-medium text-[#253858]">{formName}</p>

          <p className="text-xs text-[#94A3B8] mt-1">{record.formId}</p>
        </div>
      ),
    },
    {
      title: "Submitted By",
      dataIndex: "submittedBy",
      key: "submittedBy",
      width: "18%",
      render: (submittedBy, record) => (
        <div>
          <p className="font-medium text-[#253858]">{submittedBy}</p>

          <p className="text-xs text-[#94A3B8] mt-1">{record.email}</p>
        </div>
      ),
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile",
      key: "mobile",
      width: "12%",
    },
    {
      title: "Submitted At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "16%",
      render: (createdAt) => formatDateTimeIST(createdAt),
    },
    {
      title: "Actions",
      key: "actions",
      width: "13%",
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <Tooltip title="View submission">
            <button type="button" onClick={() => setViewRecord(record)} className="text-[#283B80] hover:text-[#161F42] cursor-pointer">
              <FiEye size={17} />
            </button>
          </Tooltip>

          <Tooltip title="Delete submission">
            <button type="button" onClick={() => handleDelete(record)} className="text-[#FF3B30] hover:text-red-700 cursor-pointer">
              <FiTrash2 size={17} />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-[24px] font-bold text-[#161F42]">Submissions</h1>

        <p className="text-base text-[#718096]">Review all records submitted through your forms.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5">
        {stats?.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="bg-white rounded-xl border border-[#E5EAF2] shadow-sm p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-[#718096]">{stat.label}</p>

                  <h2 className="text-2xl font-bold text-[#161F42] mt-1">{stat.value}</h2>
                </div>

                <div className="w-11 h-11 rounded-xl bg-[#EDF1FF] text-[#283B80] flex items-center justify-center shrink-0">
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-xl border border-[#E5EAF2] shadow-sm p-6">
        <Table
          loading={loading}
          search={{
            value: search,
            onChange: handleSearch,
          }}
          searchPlaceholder="Search by ID, name, email or form..."
          filters={[
            {
              key: "formId",
              placeholder: "All Forms",
              options: formOptions,
            },
          ]}
          filterValues={{ formId: formFilter, status: statusFilter }}
          onFilterChange={handleFilterChange}
          columns={columns}
          dataSource={submissions}
          rowKey="id"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: paginationInfo.total,
            showSizeChanger: false,
          }}
          onPageChange={handlePageChange}
          itemLabel="submissions"
        />
      </div>

      {/* Submission Details Popup */}
      <Popup
        open={Boolean(viewRecord)}
        onClose={() => setViewRecord(null)}
        title={viewRecord ? `Submission ${viewRecord.submissionId}` : "Submission"}
        width={720}
        centered
        closable
        confirmClose={false}
        footer={
          viewRecord ? (
            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="outline" textContent="Close" onClick={() => setViewRecord(null)} />

              <button
                type="button"
                onClick={() => handleDelete(viewRecord)}
                className="inline-flex items-center gap-2 rounded-lg border border-[#FF3B30] bg-[#FF3B30] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">
                <FiTrash2 size={16} />
                Delete Submission
              </button>
            </div>
          ) : null
        }>
        {viewRecord && (
          <div className="flex flex-col gap-5 thin-scrollbar">
            <div className="rounded-xl bg-[#F0F4FA] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#8190AA]">Form</p>

              <p className="text-sm font-semibold text-[#161F42] mt-1">{viewRecord.formName}</p>

              <p className="text-xs text-[#718096] mt-0.5">{viewRecord.formId}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#8190AA]">Submitted By</p>

                <p className="text-sm text-[#253858] mt-1">{viewRecord.submittedBy}</p>

                <p className="text-xs text-[#8190AA]">{viewRecord.email}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#8190AA]">Submitted At</p>

                <p className="text-sm text-[#253858] mt-1">{formatDateTimeIST(viewRecord.createdAt)}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#8190AA]">Mobile Number</p>

                <p className="text-sm text-[#253858] mt-1">{viewRecord.mobile}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#8190AA]">Status</p>

                <div className="mt-1.5">
                  <Tag variant="filled" className={`!rounded-full !px-3 !py-1 !font-medium ${STATUS_STYLES[viewRecord.status] || STATUS_STYLES.Reviewed}`}>
                    {viewRecord.status}
                  </Tag>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#161F42] mb-3">Submitted Values</h4>

              <div className="rounded-xl border border-[#E5EAF2] overflow-hidden">
                {(viewRecord.answers || []).map((answer) => (
                  <div key={answer.label} className="flex items-start justify-between gap-4 px-4 py-3 border-b border-[#EDF0F5] last:border-0">
                    <p className="text-xs font-medium text-[#8190AA]">{answer.label}</p>

                    <p className="text-sm text-[#253858] text-right break-words">{answer.value || "—"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Submissions;
