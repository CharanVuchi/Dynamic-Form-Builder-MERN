import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = ({ customName = false, customUrl = "", separator = "/" }) => {
  const location = useLocation();
  const locationName = location.pathname.split("/").filter((i) => i);

  const customNameMap = {
    // "dynamic-forms/create": "Form Builder",
  };
  const breadcrumbItems = locationName.map((_, index) => {
    let finalUrl = `/${locationName.slice(0, index + 1).join("/")}`;
    let name = locationName[index];

    if (customName && index === 0) {
      name = customNameMap[customUrl] || customUrl;
      finalUrl = `/${customUrl}`;
    }

    name = name
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      title: <Link to={finalUrl}>{name}</Link>,
    };
  });

  return (
    <div>
      <Breadcrumb separator={separator} items={breadcrumbItems} />
    </div>
  );
};

export default Breadcrumbs;
