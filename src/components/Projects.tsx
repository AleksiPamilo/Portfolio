import React, { useState, useEffect } from "react";
import { fetchRepos } from "../api/github";
import { IRepo, repoSort } from "../interfaces/githubRepo";
import { FaStar, FaGlobe, FaGithub } from "react-icons/fa";

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
            .then(setRepos);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col gap-2 mb-4">
                <h1 className="flex flex-wrap items-center justify-center text-3xl font-bold">Projects</h1>
                <p>These are my public github repositories.</p>
            </div>
            <div className="flex gap-4 mb-6 select-none">
                <p>Sort repos by:</p>
                <div>
                    <input className="hidden peer" name="sort" type="radio" id="recent" onClick={() => sortRepos(repoSort.recent)} />
                    <label className="py-2 px-3 cursor-pointer border hover:shadow-glow-5 peer-checked:shadow-glow-2" htmlFor="recent">Recent</label>
                </div>

                <div>
                    <input className="hidden peer" name="sort" type="radio" id="stars" onClick={() => sortRepos(repoSort.star)} />
                    <label className="py-2 px-3 cursor-pointer border hover:shadow-glow-5 peer-checked:shadow-glow-2" htmlFor="stars">Stars</label>
                </div>
                <div>
                    <input className="hidden peer" name="sort" type="radio" id="name" onClick={() => sortRepos(repoSort.name)} />
                    <label className="py-2 px-3 cursor-pointer border hover:shadow-glow-5 peer-checked:shadow-glow-2" htmlFor="name">Name</label>
                </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center w-3/4">
                {
                    !repos.length
                        ? <div>Loading...</div>
                        : repos.map((repo) => (
                            <div className="flex flex-col w-[20rem] h-[7rem] p-4 gap-2 rounded-md border hover:shadow-glow-5 relative group">
                                <div className="flex flex-row justify-between items-center">
                                    <p>{repo.name}</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm">{repo.stargazers_count}</p>
                                        <FaStar className="inline w-4 h-4 group-hover:text-yellow-400" />
                                    </div>
                                </div>
                                <p>{repo.description}</p>
                                <div className="flex flex-row absolute bottom-2 right-3">
                                    <a href={repo.html_url} target="_blank" rel="noreferrer"><FaGithub className="w-5 h-5 text-gray-400 hover:text-white" /></a>
                                    {
                                        repo.homepage && <a href={repo.homepage} target="_blank" rel="noreferrer"><FaGlobe className="w-5 h-5 ml-2 text-gray-400 hover:text-white" /></a>
                                    }
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default Projects;
