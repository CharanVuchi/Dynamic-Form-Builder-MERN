import { Table } from "../../../components";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { formatDateTimeIST } from "src/utils/dateTime";

const RecentSubmissions = ({ submissions = [], onView, onDelete }) => {
  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div>
          <p className="font-medium text-[var(--theme-text-body)]">{name}</p>
          <p className="text-xs text-[var(--theme-text-disabled)] mt-1">{record.submissionId}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Submitted At",
      dataIndex: "submittedAt",
      key: "submittedAt",
      render: (submittedAt) => formatDateTimeIST(submittedAt),
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   width: 150,
    //   render: (_, record) => (
    //     <div className="flex items-center gap-5">
    //       <button type="button" onClick={() => onView?.(record)} className="text-[var(--theme-brand-secondary)]">
    //         <FiEye size={20} />
    //       </button>

    //       <button type="button" onClick={() => onDelete?.(record)} className="text-[var(--theme-danger-light)]">
    //         <FiTrash2 size={20} />
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="bg-[var(--theme-surface)] rounded-xl border border-[var(--theme-border-default)] shadow-sm p-6">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-[var(--theme-brand-primary)]">Recent Submissions</h3>
        <p className="text-sm text-[var(--theme-text-subtle)]">Latest responses received</p>
      </div>

      <Table
        columns={columns}
        dataSource={submissions}
        rowKey="id"
        pagination={{
          current: 1,
          pageSize: 5,
          total: submissions.length,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default RecentSubmissions;
