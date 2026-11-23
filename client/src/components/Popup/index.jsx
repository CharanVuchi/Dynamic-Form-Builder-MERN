import { Modal } from "antd";

const Popup = ({
  open = false,
  onClose,
  onConfirm,
  title = "Confirmation",
  children,
  okText = "Confirm",
  cancelText = "Cancel",
  confirmLoading = false,
  width = 480,
  showFooter = true,
  danger = false,
  className = "",
  ...rest
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onConfirm}
      title={title}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={confirmLoading}
      width={width}
      okButtonProps={{
        danger,
        className: "font-medium",
      }}
      cancelButtonProps={{
        className: "font-medium",
      }}
      footer={showFooter ? undefined : null}
      centered
      className={className}
      {...rest}>
      {children}
    </Modal>
  );
};

export default Popup;
