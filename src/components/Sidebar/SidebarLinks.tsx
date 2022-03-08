import { AiOutlineHome, AiOutlineMail, AiOutlineFileText, AiOutlineFundProjectionScreen } from "react-icons/ai";

interface ISidebarLinks {
    title: string;
    path: string;
    icon: any
};

export const SidebarLinks: ISidebarLinks[] = [
    {
        title: "Portfolio",
        path: "/",
        icon: <AiOutlineHome className="inline w-5 h-5 mr-6" />
    },
    {
        title: "Dashboard",
        path: "/management",
        icon: <AiOutlineFundProjectionScreen className="inline w-5 h-5 mr-6" />
    },
    {
        title: "Modify CV",
        path: "/management/cv",
        icon: <AiOutlineFileText className="inline w-5 h-5 mr-6" />
    },
    {
        title: "Emails",
        path: "/management/email",
        icon: <AiOutlineMail className="inline w-5 h-5 mr-6" />
    }
];