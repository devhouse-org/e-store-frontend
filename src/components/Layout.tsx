import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";

function Layout() {
  return (
    <div>
      <Navbar hasAd adTitle="تخفيض 15% على قسم الاكسسوارات" />

      <main>
        <Outlet />
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}

export default Layout;
