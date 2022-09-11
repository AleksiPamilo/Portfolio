import React from "react";
import { IRepo } from "../interfaces/githubRepo";
import { FaLaptopCode, FaFileCode, FaStar } from "react-icons/fa";
import { BiGitRepoForked } from "react-icons/bi"

import "../styles/projects.css";

type GithubCardProps = {
    repo: IRepo,
};
const GithubCard: React.FC<GithubCardProps> = ({ repo }) => {
    return (
        <div key={repo.name} className="flex flex-wrap rounded-lg githubCard w-[20rem] min-h-[12rem] p-4 border-2 border-cyan-400">
            <div className="flex flex-col w-full">
                <h1 className="text-xl font-bold">{repo.name}</h1>
                <p className="text-sm">{repo.description}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row gap-2">
                    <FaLaptopCode className="w-5 h-5" />
                    <p className="text-sm">{repo.language ?? "?"}</p>
                </div>
                <div className="flex flex-row gap-2">
                    <FaFileCode className="w-5 h-5" />
                    <p className="text-sm">{repo.size} KB</p>
                </div>
                <div className="flex flex-row gap-2">
                    <FaStar className="w-5 h-5" />
                    <p className="text-sm">{repo.stargazers_count}</p>
                </div>
                <div className="flex flex-row gap-2">
                    <BiGitRepoForked className="w-5 h-5" />
                    <p className="text-sm">{repo.forks_count}</p>
                </div>
            </div>
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center py-2 px-3 bg-cyan-600 rounded-lg text-white hover:bg-cyan-700">
                Open In Github
            </a>
        </div>

    )
}

export default GithubCard;
