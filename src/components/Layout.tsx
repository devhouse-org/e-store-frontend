import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-dark-50">
      <Navbar hasAd adTitle="تخفيض 15% على قسم الاكسسوارات" />

      <main className={cn(
        "flex-grow min-h-[25rem]",
        "pt-[92px]" // Always add top padding for navbar
      )}>
        <Outlet />
      </main>

      {!isDashboard && <Footer />}
      <Toaster />
    </div>
  );
}

export default Layout;
