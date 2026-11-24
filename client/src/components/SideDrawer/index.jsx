import { Drawer } from "antd";
import { FiX } from "react-icons/fi";

const SideDrawer = ({ open = false, onClose, title = "Details", children, placement = "right", width = 500, footer, destroyOnClose = true, className = "", ...rest }) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      placement={placement}
      size={width}
      footer={footer}
      destroyOnHidden={destroyOnClose}
      closable={false}
      className={className}
      extra={
        <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-900">
          <FiX size={20} />
        </button>
      }
      {...rest}>
      {children}
    </Drawer>
  );
};

export default SideDrawer;
