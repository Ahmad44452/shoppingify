import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Items from "./Pages/Items";
import History from "./Pages/History";
import Statistics from "./Pages/Statistics";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/history" element={<History />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
};

export default AppRoutes;
