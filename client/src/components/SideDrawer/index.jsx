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
        <button type="button" onClick={onClose} className="text-[var(--theme-text-neutral)] hover:text-[var(--theme-text-neutral-darker)]">
          <FiX size={20} />
        </button>
      }
      {...rest}>
      {children}
    </Drawer>
  );
};

export default SideDrawer;
