import React, { useState, useEffect } from "react";
import { fetchRepos } from "../api/github";
import GithubCard from "../components/GithubCard";
import { IRepo, repoSort } from "../interfaces/githubRepo";

import "../styles/Projects.css";

const Projects: React.FC = () => {
    const [repos, setRepos] = useState<IRepo[]>([]);

    const sortRepos = (sort?: repoSort) => {
        const recentSort = repos.slice().sort((a, b) => new Date(b.pushed_at).valueOf() - new Date(a.pushed_at).valueOf());
        const starSort = repos.slice().sort((a, b) => b.stargazers_count - a.stargazers_count);
        const nameSort = repos.slice().sort((a, b) => a.name.localeCompare(b.name));

        switch (sort) {
            case repoSort.recent: return setRepos(recentSort);
            case repoSort.star: return setRepos(starSort);
            case repoSort.name: return setRepos(nameSort);
            default: return setRepos(recentSort);
        }
    }

    useEffect(() => {
        fetchRepos()
            .then(setRepos)
    }, []);

    document.title = "Portfolio – Projects";

    return (
        <div className="w-full h-full flex flex-col items-center select-none md:pt-[15rem]">
            <h1 className="flex text-4xl font-bold text-cyan-600">My Projects</h1>
            <div className="flex flex-col items-center justify-center w-full mt-4">
                <div className="flex flex-row gap-5 items-center justify-center w-full">
                    <div className="w-[8rem] h-[2.5rem] rounded-md border radioBtn">
                        <input type="radio" name="sort" id="recent"
                            className="hidden peer"
                            onClick={() => sortRepos(repoSort.recent)} />
                        <label htmlFor="recent" className="colors w-full h-full rounded-md flex justify-center items-center text-black font-bold text-lg cursor-pointer peer-checked:bg-cyan-600">Recent</label>
                    </div>

                    <div className="w-[8rem] h-[2.5rem] rounded-md border radioBtn">
                        <input type="radio" name="sort" id="star"
                            className="hidden peer"
                            onClick={() => sortRepos(repoSort.star)} />
                        <label htmlFor="star" className="colors w-full h-full rounded-md flex justify-center items-center text-black font-bold text-lg cursor-pointer peer-checked:bg-cyan-600">Star</label>
                    </div>

                    <div className="w-[8rem] h-[2.5rem] rounded-md border radioBtn">
                        <input type="radio" name="sort" id="name"
                            className="hidden peer"
                            onClick={() => sortRepos(repoSort.name)} />
                        <label htmlFor="name" className="colors w-full h-full rounded-md flex justify-center items-center text-black font-bold text-lg cursor-pointer peer-checked:bg-cyan-600">Name</label>
                    </div>
                </div>
            </div>
            <div className="pt-5 justify-center flex flex-wrap gap-5">
                {
                    repos.length === 0
                        ? <h1 className="text-2xl font-bold">Loading...</h1>
                        : repos.map((repo, index: number) => (
                            <GithubCard repo={repo} index={index} />
                        ))
                }
            </div>
        </div>
    )
}

export default Projects;
