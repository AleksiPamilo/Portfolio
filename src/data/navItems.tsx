import { FaFolderOpen, FaHome, FaTrophy } from "react-icons/fa";

interface INavItems {
    title: string;
    path: string;
    icon: JSX.Element;
}

const iconStyle = "w-4 h-4";

export const navItems: INavItems[] = [
    {
        title: "Home",
        path: "/",
        icon: <FaHome className={iconStyle} />
    },
    {
        title: "Projects",
        path: "/projects",
        icon: <FaFolderOpen className={iconStyle} />
    },
    {
        title: "Skills",
        path: "/skills",
        icon: <FaTrophy className={iconStyle} />
    }
];

export const social = {
    LinkedIn: "https://www.linkedin.com/in/aleksipamilo",
    GitHub: "https://github.com/AleksiPamilo",
};