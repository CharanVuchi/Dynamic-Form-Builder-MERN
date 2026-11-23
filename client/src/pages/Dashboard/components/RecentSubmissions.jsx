import { Table } from "../../../components";
import { FiEye, FiTrash2 } from "react-icons/fi";

const RecentSubmissions = ({ submissions = [], onView, onDelete }) => {
  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div>
          <p className="font-medium text-[#253858]">{name}</p>
          <p className="text-xs text-[#94A3B8] mt-1">{record.submissionId}</p>
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
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <div className="flex items-center gap-5">
          <button type="button" onClick={() => onView?.(record)} className="text-[#283B80]">
            <FiEye size={20} />
          </button>

          <button type="button" onClick={() => onDelete?.(record)} className="text-red-500">
            <FiTrash2 size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E5EAF2] shadow-sm p-6">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-[#161F42]">Recent Submissions</h3>
        <p className="text-sm text-[#8190AA]">Latest responses received</p>
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
