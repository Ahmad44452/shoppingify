import "./styles.scss";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";

const AppLayout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <div className="maincontent">{children}</div>
      <Sidebar />
    </div>
  );
};

export default AppLayout;
