import { BrowserRouter } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";
import MainLayout from "./routes";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              fontSize: 13,
              fontSizeSM: 12,
              fontSizeLG: 14,
              fontSizeHeading1: 24,
              fontSizeHeading2: 20,
              fontSizeHeading3: 16,
              fontSizeHeading4: 14,
              fontSizeHeading5: 13,
            },
          }}>
          <AntdApp>
            <MainLayout />
          </AntdApp>
        </ConfigProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
