import { useCallback, useMemo } from "react";
import { App } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";


export const useToast = () => {
  const { message } = App.useApp();

  const openCustomToast = useCallback((type, msg, duration = 3) => {
    let config;

    switch (type) {
      case "success":
        config = {
          borderLeft: "2px solid #009A0A",
          textColor: "#fff",
          bgColor: "#009A0A",
          icon: <CheckCircleOutlined style={{ fontSize: 16, color: "#fff" }} />,
        };
        break;
      case "error":
        config = {
          borderLeft: "2px solid #D32029",
          textColor: "#fff",
          bgColor: "#D32029",
          icon: <CloseCircleOutlined style={{ fontSize: 16, color: "#fff" }} />,
        };
        break;
      case "warning":
        config = {
          borderLeft: "2px solid #D89614",
          textColor: "#D89614",
          bgColor: "#FFF7E6",
          icon: <ExclamationCircleOutlined style={{ fontSize: 18, color: "#D89614" }} />,
        };
        break;
      case "info":
      default:
        config = {
          borderLeft: "2px solid #1890ff",
          textColor: "#1890ff",
          bgColor: "#E6F7FF",
          icon: <InfoCircleOutlined style={{ fontSize: 18, color: "#1890ff" }} />,
        };
        break;
    }

    message.open({
      content: (
        <div
          className="flex items-center gap-[8px] font-[400] justify-center text-sm"
          style={{
            backgroundColor: config.bgColor,
            color: config.textColor,
            borderLeft: config.borderLeft,
            padding: "10px 15px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
            fontFamily: "Cabin, sans-serif",
          }}>
          {config.icon}
          {msg}
        </div>
      ),
      icon: false,
      duration,
    //   className: "custom-toast-right",
    });
  }, [message]);

  return useMemo(() => ({
    success: (msg, duration) => openCustomToast("success", msg, duration),
    error: (msg, duration) => openCustomToast("error", msg, duration),
    warning: (msg, duration) => openCustomToast("warning", msg, duration),
    info: (msg, duration) => openCustomToast("info", msg, duration),
  }), [openCustomToast]);
};
