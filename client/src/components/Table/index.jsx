import { Table, Pagination, Button, ConfigProvider } from "antd";
import { FiPlus } from "react-icons/fi";

const AntTable = ({
  columns = [],
  dataSource = [],
  loading = false,
  rowKey = "id",
  pagination = {},
  onPageChange,
  onAdd,
  showAdd = false,
  addLabel = "Add New",
  rowSelection,
  scroll,
  className = "",
  customColorBgContainer,
  customHeaderBg,
  ...rest
}) => {
  const { current = 1, pageSize = 10, total = dataSource.length, showSizeChanger = true } = pagination;

  return (
    <ConfigProvider
      theme={{
        token: {},
        components: {
          Table: {
            colorBgContainer: customColorBgContainer ?? "#fff",
            headerBg: customHeaderBg ?? "#B0DADB",
            headerSplitColor: "transparent",
          },
        },
      }}>
      <div className={`w-full ${className}`}>
        {/* Table */}
        <div className="w-full overflow-hidden rounded-lg border border-gray-200">
          <Table
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            rowKey={rowKey}
            pagination={false}
            rowSelection={rowSelection}
            scroll={scroll}
            className="custom-ant-table"
            {...rest}
          />
        </div>

        {/* Add Button - Bottom Right */}
        {showAdd && (
          <div className="flex justify-end mt-4">
            <Button type="primary" icon={<FiPlus />} onClick={onAdd} className="h-10 font-medium">
              {addLabel}
            </Button>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-end mt-5">
          <Pagination
            current={current}
            pageSize={pageSize}
            total={total}
            showSizeChanger={showSizeChanger}
            showTotal={(total) => `Total ${total} items`}
            onChange={(page, size) => onPageChange?.(page, size)}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AntTable;
