import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.js"; // ⚠️ verify it's the correct path

const Layout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Layout;
