import { BrowserRouter } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store";
import MainLayout from "./routes";
import { Spinner } from "./components";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
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
              <Spinner />
            </AntdApp>
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
