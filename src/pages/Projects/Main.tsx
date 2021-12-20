import React, { useState, useEffect } from 'react';
import { fetchRepos } from "../../api/github";
import { FetchingData } from '../../components';
import { FaFileCode, FaStar } from "react-icons/fa";
import { BiGitRepoForked } from "react-icons/bi"
import { MdLaptopMac } from "react-icons/md";

import "./Main.css";

type ProjectsProps = {

}

const Projects: React.FC<ProjectsProps> = () => {

  document.title = "Portfolio | Projects";

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    setTimeout(() => fetchRepos().then(setRepos), 1000)
  }, []);

  if(repos.length <= 0) return (
    <div className="text-center items-center mt-12 md:mt-44">
      <h1 className="text-5xl font-bold text-cyan-500">Projects</h1>
      <FetchingData />
    </div>
  )

  else return (
     <div className="text-center items-center mt-12 md:mt-44">
          <h1 className="text-5xl font-bold text-cyan-500 mb-10">Projects</h1>
          {
          repos.map((props: any) => (
            <div className="github-card">
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
  )
}

export default Projects