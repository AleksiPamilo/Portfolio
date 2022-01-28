import React, { useState, useEffect } from 'react';
import { fetchRepos } from "../../../api/github";
import { FetchingData } from '../..';
import { FaFileCode, FaStar } from "react-icons/fa";
import { BiGitRepoForked } from "react-icons/bi"
import { MdLaptopMac } from "react-icons/md";

import "./Main.css";

const Projects: React.FC = () => {

  document.title = "Portfolio | Projects";

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    console.log("Fetch repos")
    fetchRepos().then(setRepos)
  }, []);
  
  return repos.length > 0 ? (
    <div className="text-center items-center mt-12 md:mt-44">
    <h1 className="text text-5xl font-bold mb-10">Projects</h1>
      {
        repos.map((props: any) => (
          <div className="github-card inline-block p-[15px] rounded-[20px] min-w-[20rem] m-2 select-none border-2" key={ props.id }>
            <p className="inline-block mb-3"><MdLaptopMac className="inline" /> { props.name }</p>
            <p className="mb-3">{ props.description }</p>

            <p className="inline-block pl-7">
              <FaFileCode className="inline" /> { props.language }
            </p>

            <p className="inline-block pl-7">
              <FaStar className="inline" /> { props.stargazers_count }
            </p>

            <p className="inline-block pl-7">
              <BiGitRepoForked className="inline" /> { props.forks_count }
            </p>

            <p className="mt-4"><a className="github-link" href={ props.html_url } target="_blank" rel="noreferrer">Open in Github</a></p>
          </div>
        ))
      }
    </div>
  ) : (
    <div className="text-center items-center mt-12 md:mt-44">
      <h1 className="text text-5xl font-bold">Projects</h1>
      <FetchingData />
    </div>
  )
}

export default Projects