import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Components from "./pages/Components";
import Home from "./pages/Home";

function App() {
  return (
    <div dir="rtl">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="components" element={<Components />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
