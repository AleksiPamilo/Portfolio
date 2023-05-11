import { FaReact, FaHtml5, FaGithub } from "react-icons/fa";
import { SiMongodb, SiTypescript, SiCsharp, SiMysql } from "react-icons/si"
import { ISkill } from "../interfaces/skills";

export const skills: ISkill[] = [
    {
        key: "html",
        name: "html",
        desc: "Most of my projects are websites, so HTML has become familiar.",
        tags: ["websites"],
        icon: <FaHtml5 />
    },
    {
        key: "css",
        name: "css",
        desc: "Every website needs styling, so I have used CSS for my projects.",
        tags: ["websites", "TailwindCSS", "SASS", "SCSS"],
        icon: <FaHtml5 />,
    },
    {
        key: "react",
        name: "react",
        desc: "Currently I'm mainly coding with react or nextjs. I'm also using react for my personal projects.",
        tags: ["websites", "NextJS"],
        icon: <FaReact />,
    },
    {
        key: "typescript",
        name: "typescript",
        desc: "TypeScript is the language that I use the most. I have used it at work and for my personal projects.",
        tags: ["NodeJS", "JavaScript", "websites"],
        icon: <SiTypescript />,
    },
    {
        key: "C#",
        name: "c#",
        desc: "I have used C# for my school projects and for my personal projects.",
        tags: ["Unity", "games", ".NET"],
        icon: <SiCsharp />,
    },
    {
        key: "git-github",
        name: "git & github",
        desc: "I have used Git and GitHub for work, school and personal projects.",
        tags: ["Version Control"],
        icon: <FaGithub />,
    },
    {
        key: "mysql",
        name: "mysql",
        desc: "I have used MySQL for my personal projects and for my school projects.",
        tags: ["databases"],
        icon: <SiMysql />,
    },
    {
        key: "mongodb",
        name: "mongodb",
        desc: "I have used MongoDB for my personal projects and for my school projects.",
        tags: ["databases", "NodeJS"],
        icon: <SiMongodb />,
    },
];