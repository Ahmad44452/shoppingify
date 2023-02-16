import { BrowserRouter, Routes, Route } from "react-router-dom";

import Items from "./Pages/Items";
import History from "./Pages/History";
import Statistics from "./Pages/Statistics";

import AppLayout from "./Layouts/AppLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/history" element={<History />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;
