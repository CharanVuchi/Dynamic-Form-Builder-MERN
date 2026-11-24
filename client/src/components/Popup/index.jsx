import { useState } from "react";
import { Modal } from "antd";
import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const CustomModal = ({
  open,
  onClose,
  title = "",
  children,
  footer = null,
  width = 600,
  closable = true,
  centered = true,
  confirmClose = true,
  confirmTitle = "Confirm Close",
  confirmMessage = "Are you sure you want to close ? Any unsaved changes will be lost.",
  bodyClassName = "",
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = () => {
    if (confirmClose) {
      setShowConfirmation(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Modal
        open={open}
        footer={footer}
        width={width}
        closable={false}
        centered={centered}
        className={'thin-scrollbar'}
        title={
          <div className="relative flex items-center justify-center min-h-6 pr-8">
            <h5 className="text-center font-semibold text-[#161F42]">{title}</h5>

            {closable && (
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 transition-all hover:text-gray-900">
                <CloseOutlined className="cursor-pointer text-lg" />
              </button>
            )}
          </div>
        }
        styles={{
          body: {
            maxHeight: "calc(100vh - 220px)",
            overflowY: "auto",
            padding: "20px 24px",
          },
          footer: {
            borderTop: "1px solid #E5EAF2",
            padding: "12px 24px",
          },
        }}>
        <div className={`text-gray-700 ${bodyClassName}`}>{children}</div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        open={showConfirmation}
        title={
          <div className="flex items-center">
            <ExclamationCircleOutlined className="text-orange-500 mr-2" />
            {confirmTitle}
          </div>
        }
        onOk={handleConfirmClose}
        onCancel={handleCancelClose}
        okText="Yes, Close"
        cancelText="Stay"
        okButtonProps={{
          style: { backgroundColor: "#00888A", borderColor: "#00888A" },
        }}
        centered
        width={400}>
        <p>{confirmMessage}</p>
      </Modal>
    </>
  );
};

export default CustomModal;
