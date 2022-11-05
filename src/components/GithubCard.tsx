import React from "react";
import { IRepo } from "../interfaces/githubRepo";
import { FaStar, FaGithub, FaGlobe } from "react-icons/fa";

import "../styles/projects.css";

type GithubCardProps = {
    repo: IRepo,
};
const GithubCard: React.FC<GithubCardProps> = ({ repo }) => {
    return (
        <div className="w-[24.5rem] md:w-[27rem] h-[7rem] relative p-2 rounded-sm border border-cyan-400 hover:shadow-[0_0_10px_2px_#06b6d4] colors group">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-xl font-bold">{repo.name}</h1>
                <span className="flex flex-row items-center gap-2">
                    <span>{repo.stargazers_count}</span>
                    <FaStar className="w-5 h-5 group-hover:text-yellow-500" />
                </span>
            </div>
            <p className="text-sm break-words max-w-[22rem] max-h-[4rem] overflow-clip">{repo.description}</p>
            <div className="absolute bottom-0 right-0 p-2">
                <span className="flex flex-row gap-2">
                    <a target="_blank" rel="noreferrer" href={repo.homepage} hidden={!!!repo.homepage}><FaGlobe className="w-5 h-5 links" /></a>
                    <a target="_blank" rel="noreferrer" href={repo.html_url}><FaGithub className="w-5 h-5 links" /></a>
                </span>
            </div>
        </div>
    )
}

export default GithubCard;
