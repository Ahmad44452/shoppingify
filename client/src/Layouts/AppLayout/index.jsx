import "./styles.scss";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import LoadingScreen from "../../Components/LoadingScreen";

const AppLayout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <LoadingScreen />
      <div className="maincontent">{children}</div>
      <Sidebar />
    </div>
  );
};

export default AppLayout;
