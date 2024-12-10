import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Route, Routes } from "react-router-dom";
// import "./App.css";
import Components from "./pages/Components";
import Auctions from "./pages/auctions/Auctions";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div dir="rtl">
      <Navbar hasAd adTitle="تخفيض 15% على قسم الاكسسوارات" />
      <Routes>
        <Route path="/" element={<Components />} />
        <Route path="/auctions" element={<Auctions />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
