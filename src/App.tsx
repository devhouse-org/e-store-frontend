import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Route, Routes } from "react-router-dom";
// import "./App.css";
import Components from "./pages/Components";

function App() {
  return (
    <div dir="rtl">
      <Routes>
        <Route path="/" element={<Components />} />
      </Routes>
    </div>
  );
}

export default App;
