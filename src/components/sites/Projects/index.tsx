import React, { useState, useEffect } from 'react';
import { fetchRepos } from "../../../api/github";
import { FaFileCode, FaStar, FaGithub } from "react-icons/fa";
import { BiGitRepoForked } from "react-icons/bi"
import { MdLaptopMac } from "react-icons/md";
import { Irepo, repoSort } from '../../../Interfaces/githubRepo';

import "./Main.css";

const Projects: React.FC = () => {
  document.title = "Portfolio – Projects";

  const [repos, setRepos] = useState<Irepo[]>([]);
  const [currentSort, setCurrentSort] = useState<Irepo[]>(repos);

  const sortRepos = (sort: repoSort | undefined = undefined) => {
    const recentSort = repos.slice().sort((a, b) => new Date(b.pushed_at).valueOf() - new Date(a.pushed_at).valueOf());
    const starSort = repos.slice().sort((a, b) => b.stargazers_count - a.stargazers_count);
    const languageSort = repos.slice().sort((a, b) => b.language - a.language);

    switch (sort) {
      case repoSort.recent: return setCurrentSort(recentSort);
      case repoSort.star: return setCurrentSort(starSort);
      case repoSort.language: return setCurrentSort(languageSort);
      default: return setCurrentSort(recentSort);
    }
  }

  useEffect(() => {
    fetchRepos().then(setRepos);
  }, []);

  useEffect(() => {
    sortRepos();
  }, [repos]);

  return (
    <div className="text-center items-center">
      <div className="my-10 select-none">
        <a href="https://www.github.com/AleksiPamilo/" target="_blank" rel="noreferrer">
          <FaGithub className="w-12 h-12 mr-6 inline mb-4" />
        </a>
        <h1 className="text text-5xl font-bold inline">Projects</h1>

        <div>
          <p className="mb-2">Sort repos by</p>
          <div className="inline mt-4 mx-4">
            <label className="cursor-pointer">
              <input className="cursor-pointer" type="radio" id="recent" name="drone" value="recent"
                onChange={() => sortRepos(repoSort.recent)}
                defaultChecked
              />
              <p className="ml-3 inline">Recent</p>
            </label>
          </div>
          <div className="inline mt-4 mx-4">
            <label className="cursor-pointer">
              <input className="cursor-pointer" type="radio" id="star" name="drone" value="star"
                onChange={() => sortRepos(repoSort.star)} />
              <p className="ml-3 inline">Star</p>
            </label>
          </div>
          <div className="inline mt-4 mx-4">
            <label className="cursor-pointer">
              <input className="cursor-pointer" type="radio" id="language" name="drone" value="language"
                onChange={() => sortRepos(repoSort.language)} />
              <p className="ml-3 inline">Language</p>
            </label>
          </div>
        </div>

      </div>
      {
        currentSort.length === 0
          ? <div className="font-medium text-xl">Loading...</div>
          : currentSort.map((props) => (
            <div className="github-card inline-block p-[15px] rounded-[20px] min-w-[20rem] m-4 select-none border-2" key={props.id}>
              <p className="inline-block mb-3"><MdLaptopMac className="inline" /> {props.name}</p>
              <p className="mb-3">{props.description}</p>

              <p className="inline-block pl-7">
                <FaFileCode className="inline" /> {props.language}
              </p>

              <p className="inline-block pl-7">
                <FaStar className="inline" /> {props.stargazers_count}
              </p>

              <p className="inline-block pl-7">
                <BiGitRepoForked className="inline" /> {props.forks_count}
              </p>

              <p className="mt-4"><a className="github-link" href={props.html_url} target="_blank" rel="noreferrer">Open in Github</a></p>
            </div>
          ))
      }
    </div>
  )
}

export default Projects
