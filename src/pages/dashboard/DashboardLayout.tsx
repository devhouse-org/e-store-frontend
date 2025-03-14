import { Link, NavLink, Outlet } from "react-router-dom";
import { isAuthenticated, logout } from "@/utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PenLine, User, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  {
    id: 1,
    link: "/dashboard",
    label: "لوحة التحكم",
    icon: <User className="w-5 h-5" />,
  },
  {
    id: 2,
    link: "/dashboard/history",
    label: "سجل الشراء",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    id: 3,
    link: "/dashboard/notifications",
    label: "الإشعارات",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    id: 4,
    link: "/comparison",
    label: "مقارنات",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    id: 5,
    link: "/dashboard/profile",
    label: "الملف الشخصي",
    icon: <User className="w-5 h-5" />,
  },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      setName(localStorage.getItem("name") || "");
      setEmail(localStorage.getItem("email") || "");
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLinks = () => (
    <>
      <div className="mb-4 flex gap-x-4 items-center">
        <div className="bg-slate-200/50 flex justify-center items-center rounded-full">
          <User className="text-orange-500 p-2" size={40} />
        </div>
        <div className="w-full">
          <div className="flex-1 flex justify-between items-center">
            <strong className="line-clamp-1">{name.slice(0, 15)}...</strong>
            <Link to="/dashboard/profile">
              <PenLine
                className="text-orange-500 p-1 rounded-md hover:bg-slate-200/50 transition ease-in-out cursor-pointer"
                size={24}
              />
            </Link>
          </div>
          <div className="flex-1">
            <p className="text-[12px] line-clamp-1">{email.slice(0, 20)}...</p>
          </div>
        </div>
      </div>
      <div>
        {links.map((link) => (
          <NavLink
            to={link.link}
            key={link.id}
            end={link.link === "/dashboard"}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              cn(
                "mb-2 py-2 flex items-center gap-3 px-3 transition-all duration-200",
                isActive
                  ? "border-r-2 border-r-orange-500 rounded-sm bg-gray-500/5"
                  : "border-r-2 border-r-transparent hover:bg-gray-500/5"
              )
            }
          >
            {link.icon}
            <span className="font-tajawal-medium text-sm text-black">
              {link.label}
            </span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="mt-4 text-sm w-full py-2 rounded-md bg-red-500 text-white block text-center hover:bg-red-600 transition-colors"
        >
          تسجيل خروج
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={toggleMobileMenu} />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed top-[92px] right-0 h-[calc(100vh-92px)] w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-tajawal-bold">القائمة</h2>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <NavLinks />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-[300px] fixed right-0 top-[92px] h-[calc(100vh-92px)] overflow-y-auto bg-white border-l">
          <div className="p-6">
            <NavLinks />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:mr-[300px] min-h-[calc(100vh-92px)]">
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        // variant="ghost"
        onClick={toggleMobileMenu}
        className="lg:hidden fixed bottom-8 right-6 z-50  bg-orange-500  rounded-full shadow-lg w-12 h-12 flex items-center justify-center"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
      </button>
    </div>
  );
};

export default DashboardLayout;
