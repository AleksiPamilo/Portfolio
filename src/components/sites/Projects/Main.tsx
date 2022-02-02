import React, { useState, useEffect } from 'react';
import { fetchRepos } from "../../../api/github";
import { FaFileCode, FaStar, FaGithub } from "react-icons/fa";
import { BiGitRepoForked } from "react-icons/bi"
import { MdLaptopMac } from "react-icons/md";

import "./Main.css";

const Projects: React.FC = () => {

  document.title = "Portfolio | Projects";

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetchRepos().then(setRepos)
  }, []);

  return (
    <div className="text-center items-center">
      <div className="my-10 select-none">
        <a href="https://www.github.com/AleksiPamilo/" target="_blank" rel="noreferrer">
          <FaGithub className="w-12 h-12 mr-6 inline mb-4" />
        </a>
        <h1 className="text text-5xl font-bold inline">Projects</h1>
      </div>
      {
        repos.length === 0
          ? <div className="font-medium text-xl">Loading...</div>
          : repos.map((props: { name: string, description: string, language: string, stargazers_count: number, forks_count: number, html_url: string, id: number }) => (
            <div className="github-card inline-block p-[15px] rounded-[20px] min-w-[20rem] m-2 select-none border-2" key={props.id}>
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