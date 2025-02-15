import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "@/utils/auth";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

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
    <div>
      {/* Parent container for scrolling */}
      <div className="">
        {/* Sidebar */}

        {/* Content */}
        <div className="">
          <p>content</p>
          <p>... Add more content here to make the page scrollable ...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
