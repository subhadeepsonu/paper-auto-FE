import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Navbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    if (!role) return null;
    const getNavLinks = () => {
        switch (role.toLocaleLowerCase()) {
            case "admin":
                return [
                    { path: "/admin/dashboard", label: "Dashboard" },
                    { path: "/admin/users", label: "Users" },
                    { path: "/admin/approvals", label: "Approvals" },
                    { path: "/admin/courses", label: "Courses" },
                ];
            case "faculty":
                return [
                    { path: "/faculty/dashboard", label: "Dashboard" },
                    { path: "/faculty/courses", label: "Courses" },
                ];
            case "coordinator":
                return [
                    { path: "/coordinator/dashboard", label: "Dashboard" },
                    { path: "/coordinator/courses", label: "Courses" },
                ];
            case "moderator":
                return [
                    { path: "/moderator/dashboard", label: "Dashboard" },
                    { path: "/moderator/courses", label: "Courses" },
                ];
            default:
                return [];
        }
    };

    return (
        <div className="flex justify-between items-center z-50 h-16 w-full bg-white dark:bg-gray-900 border-b fixed top-0 px-6 shadow-md">
            {/* Navigation Links */}
            <div className="flex gap-6">
                {getNavLinks().map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition font-medium"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Logout Button */}
            <Button
                onClick={() => {
                    localStorage.clear();
                    navigate("/");
                }}
                variant="destructive"
                className="px-4 py-2 cursor-pointer"
            >
                Logout
            </Button>
        </div>
    );
};

