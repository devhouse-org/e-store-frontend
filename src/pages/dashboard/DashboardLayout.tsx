import { Link, NavLink, Outlet } from "react-router-dom";
import { isAuthenticated, logout } from "@/utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PenLine, User } from "lucide-react";

const links = [
  {
    id: 1,
    link: "/dashboard",
    label: "لوحة التحكم",
  },
  {
    id: 2,
    link: "/dashboard/history",
    label: "سجل الشراء",
  },
  {
    id: 4,
    link: "/comparison",
    label: "مقارنات",
  },
  {
    id: 5,
    link: "/dashboard/profile",
    label: "الملف الشخصي",
  },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  return (
    <div className="flex items-start min-h-[100vh] p-4">
      {/* Sidebar */}
      <div className="sticky top-[100px] p-4 self-start w-[300px]">
        <div className="p-4 h-full bg-white border border-light-400 shadow-md shadow-light-400">
          <div className="mb-4 flex gap-x-4 items-center">
            {/* img */}
            <div className="bg-slate-200/50 flex justify-center items-center rounded-full">
              <User className="text-orange-500 p-2" size={40} />
            </div>
            {/* name & email & edit */}
            <div className="w-full">
              <div className=" flex-1 flex justify-between items-center">
                <strong className="line-clamp-1">{name.slice(0, 15)}...</strong>
                <Link to="/dashboard/profile">
                  <PenLine
                    className="text-orange-500 p-1 rounded-md hover:bg-slate-200/50 transition ease-in-out cursor-pointer"
                    size={24}
                  />
                </Link>
                {/*  */}
              </div>
              <div className="flex-1">
                <p className="text-[12px] line-clamp-1">
                  {email.slice(0, 20)}...
                </p>
              </div>
            </div>
          </div>
          <div>
            {links.map((link) => (
              <NavLink
                to={link.link}
                key={link.id}
                end={link.link === "/dashboard"}
                className={({ isActive }) =>
                  `mb-2 roundedmd py1 block ${
                    isActive
                      ? "border-r-2 border-r-orange-500 rounded-sm bg-gray-500/5"
                      : "border-r-2 border-r-transparent"
                  }`
                }
              >
                <p className="font-tajawal-medium text-sm text-black hover:bg-black/5 p-2 transition ease-in-out duration-200 my-1">
                  {link.label}
                </p>
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="mt-4 text-sm w-full py-1 rounded-md bg-red-500 text-white block text-center hover:bg-red-600 transition-colors"
            >
              تسجيل خروج
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
