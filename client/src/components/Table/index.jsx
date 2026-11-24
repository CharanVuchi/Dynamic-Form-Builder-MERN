import { Table, Pagination, Button, ConfigProvider, Input, Select, Space } from "antd";

import { FiPlus, FiSearch } from "react-icons/fi";

const AntTable = ({
  // Table
  columns = [],
  dataSource = [],
  loading = false,
  rowKey = "id",
  rowSelection,
  scroll,
  className = "",

  // Search
  search,
  searchPlaceholder = "Search...",

  // Filters
  filters = [],
  filterValues = {},
  onFilterChange,

  // Extra Actions
  extraActions,

  // Add Button
  onAdd,
  showAdd = false,
  addLabel = "Add New",

  // Pagination
  pagination = {},
  onPageChange,
  itemLabel = "items",

  // Table Colors
  customColorBgContainer,
  customHeaderBg,

  ...rest
}) => {
  const { current = 1, pageSize = 10, total = dataSource.length, showSizeChanger = true } = pagination;

  const hasSearch = search !== undefined;

  return (
    <ConfigProvider
      theme={{
        token: {},
        components: {
          Table: {
            colorBgContainer: customColorBgContainer ?? "#FFFFFF",
            headerBg: customHeaderBg ?? "#B0DADB",
            headerSplitColor: "transparent",
            cellPaddingBlock: 12,
            cellPaddingInline: 12,
          },
        },
      }}>
      <div className={`w-full ${className}`}>
        {/* Search and Filters */}
        {(hasSearch || filters.length > 0 || extraActions) && (
          <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
            <div className="flex items-center gap-3 flex-wrap">
              {hasSearch && (
                <Input
                  prefix={<FiSearch size={18} className="text-[#8190AA]" />}
                  placeholder={searchPlaceholder}
                  value={search.value}
                  onChange={(e) => search.onChange?.(e.target.value)}
                  allowClear
                  className="w-[410px] h-11 rounded-lg"
                />
              )}
            </div>

            {filters?.map((filter) => (
              <Select
                key={filter.key}
                value={filterValues[filter.key] ?? undefined}
                placeholder={filter.placeholder || filter.label}
                options={filter.options || []}
                onChange={(value) => onFilterChange?.(filter.key, value)}
                allowClear={filter.allowClear !== false}
                showSearch={filter.showSearch || false}
                className="min-w-[165px] h-11"
              />
            ))}

            {extraActions && <Space wrap>{extraActions}</Space>}
          </div>
        )}

        {/* Table Container */}
        <div className="relative w-full overflow-hidden rounded-lg border border-gray-200">
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

          {/* Add Button - Bottom Right Inside Table */}
          {showAdd && (
            <Button
              type="primary"
              shape="circle"
              icon={<FiPlus size={18} />}
              title={addLabel}
              onClick={onAdd}
              className="!absolute !bottom-4 !right-3 !z-10 !h-10 !w-10 !min-w-10 !bg-[#161F42] !text-white !border-0 shadow-lg flex items-center justify-center"
            />
          )}
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between mt-5 flex-wrap gap-3">
          {/* Record Count */}
          <p className="text-sm text-[#8190AA]">
            Showing {total === 0 ? 0 : (current - 1) * pageSize + 1}–{Math.min(current * pageSize, total)} of {total} {itemLabel}
          </p>

          {/* Pagination */}
          <Pagination current={current} pageSize={pageSize} total={total} showSizeChanger={showSizeChanger} onChange={(page, size) => onPageChange?.(page, size)} />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AntTable;
