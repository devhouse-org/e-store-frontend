import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div>
      <Navbar hasAd adTitle="تخفيض 15% على قسم الاكسسوارات" />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
