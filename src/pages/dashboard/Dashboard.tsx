import { PenLine, User, UserRound } from "lucide-react";
import React from "react";

type Props = {};

const links = [
  {
    id: 1,
    link: "#",
    label: "لوحة التحكم",
    Icon: <></>,
  },
  {
    id: 2,
    link: "#",
    label: "سجل الشراء",
    Icon: <></>,
  },
  {
    id: 3,
    link: "#",
    label: "المفضلات",
    Icon: <></>,
  },
  {
    id: 4,
    link: "#",
    label: "المحادثات",
    Icon: <></>,
  },
  {
    id: 5,
    link: "#",
    label: "مقارنات",
    Icon: <></>,
  },
  {
    id: 6,
    link: "#",
    label: "التنزيلات",
    Icon: <></>,
  },
  {
    id: 7,
    link: "#",
    label: "تعديل الملف الشخصي",
    Icon: <></>,
  },
];

// test line again

const Dashboard = (props: Props) => {
  return (
    <div>
      {/* Parent container for scrolling */}
      <div className="flex items-start h-[100vh] p-4">
        {/* Sidebar */}
        <div className="sticky top-0 p-4 self-start w-[300px]">
          <div className="p-4 border border-light-400 shadow-md shadow-light-400">
            <div className="mb-4 flex gap-x-4 items-center">
              {/* img */}
              <div className="bg-slate-200/50 flex justify-center items-center rounded-full">
                <User className="text-orange-500 p-2" size={40} />
              </div>
              {/* name & email & edit */}
              <div className="w-full">
                <div className="flex-1 flex justify-between items-center">
                  <strong>name</strong>
                  <PenLine
                    className="text-orange-500 p-1 rounded-md hover:bg-slate-200/50 transition ease-in-out cursor-pointer"
                    size={24}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[12px]">email@example.com</p>
                </div>
              </div>
            </div>
            <ul>
              {links.map((link) => (
                <li key={link.id} className="mb-2 rounded-md py-1">
                  <a href={link.link} className="text-sm">
                    {link.label}
                    {link.Icon}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/login"
                  className="mt-4 text-sm w-full py-1 rounded-md bg-red-500 text-white block text-center hover:bg-red-600 transition-colors"
                >
                  تسجيل خروج
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 border border-black p-4 mt-4">
          <p>content</p>
          <p>... Add more content here to make the page scrollable ...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
