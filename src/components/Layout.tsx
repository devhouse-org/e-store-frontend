import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-50">
      <Navbar hasAd adTitle="تخفيض 15% على قسم الاكسسوارات" />

      <main className="flex-grow min-h-[25rem]">
        <Outlet />
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}

export default Layout;
