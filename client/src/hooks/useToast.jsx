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
          borderLeft: "2px solid var(--theme-success)",
          textColor: "var(--theme-white)",
          bgColor: "var(--theme-success)",
          icon: <CheckCircleOutlined style={{ fontSize: 16, color: "var(--theme-white)" }} />,
        };
        break;
      case "error":
        config = {
          borderLeft: "2px solid var(--theme-error)",
          textColor: "var(--theme-white)",
          bgColor: "var(--theme-error)",
          icon: <CloseCircleOutlined style={{ fontSize: 16, color: "var(--theme-white)" }} />,
        };
        break;
      case "warning":
        config = {
          borderLeft: "2px solid var(--theme-warning)",
          textColor: "var(--theme-warning)",
          bgColor: "var(--theme-warning-surface)",
          icon: <ExclamationCircleOutlined style={{ fontSize: 18, color: "var(--theme-warning)" }} />,
        };
        break;
      case "info":
      default:
        config = {
          borderLeft: "2px solid var(--theme-info)",
          textColor: "var(--theme-info)",
          bgColor: "var(--theme-info-surface)",
          icon: <InfoCircleOutlined style={{ fontSize: 18, color: "var(--theme-info)" }} />,
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
            boxShadow: "0 4px 8px var(--theme-shadow)",
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
