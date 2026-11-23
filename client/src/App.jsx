import { BrowserRouter } from "react-router-dom";
import { App as AntdApp } from "antd";
import MainLayout from "./routes";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <AntdApp>
          <MainLayout />
        </AntdApp>
      </BrowserRouter>
    </>
  );
}

export default App;
