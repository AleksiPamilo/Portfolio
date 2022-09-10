interface INavItems {
    title: string;
    path: string;
}

export const navItems: INavItems[] = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "Projects",
        path: "/projects"
    },
    {
        title: "CV",
        path: "/cv"
    }
]

export const managementNavItems: INavItems[] = [
    {
        title: "Portfolio",
        path: "/"
    },
    {
        title: "Management",
        path: "/management"
    },
    {
        title: "Messages",
        path: "/management/messages"
    },
    {
        title: "Resume",
        path: "/management/cv"
    }
]