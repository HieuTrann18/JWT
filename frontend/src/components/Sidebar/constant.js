import { AiOutlineDashboard } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";

export const navItems = [
  { content: "Trang chủ", href: "/admin/dashboard", icon: AiOutlineDashboard },
  { content: "Sinh viên", href: "/admin/students", icon: CiUser },
  { content: "Báo cáo", href: "/admin/report", icon: HiOutlineDocumentReport },
  { content: "Cài đặt", href: "/admin/setting", icon: IoSettingsOutline },
];
