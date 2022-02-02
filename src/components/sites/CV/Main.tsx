import React, { useEffect, useState } from 'react'
import "./Main.css";
import { Ijobs, Iskills } from "../../../Interfaces/cv";
import Logo from "../../../media/user.webp";
import { FaRegEnvelope, FaLinkedinIn, FaMapMarkerAlt, FaGamepad, FaTerminal } from "react-icons/fa";
import FirebaseServices from "../../../firebase/firebaseServices";
import { collection, getDocs } from "firebase/firestore";

const db = FirebaseServices.getFirestoreInstance();

const CV: React.FC = () => {
  document.title = "Portfolio | CV";

  const [skills, setSkills] = useState<Iskills[]>([]);
  const [jobs, setJobs] = useState<Ijobs[]>([]);
  const [profileText, setProfileText] = useState<string>("");

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "portfolio"));
      const obj: any = {};

      querySnapshot.forEach((doc) => {
        obj[doc.id] = doc.data();
      });

      setSkills(obj.skills.skillsArr);
      setJobs(obj.jobs.jobsArr);
      setProfileText(obj.profile.text);
    })();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen m-0 p-0 box-border">
      <div className="cv-container">
        <div className="relative bg-left p-[40px]">
          <div className="profile relative flex flex-col items-center p-5">

            <div className="relative w-[200px] h-[200px] rounded-[50%] overflow-hidden">
              <img src={Logo} alt="" className="absolute top-0 left-0 w-full h-full object-cover bg-gray-600" />
            </div>
            <h2 className="text-white text-2xl font-bold uppercase text-center mt-4">Aleksi Pamilo<br /><span className="font-light text-[0.8em]">Web Developer</span></h2>
          </div>

          <div className="text-white font-bold pt-10">
            <h3 className="text-xl uppercase mb-5">Contact Info</h3>
            <ul>
              <li>
                <FaRegEnvelope className="inline-block w-7 text-blue-600 mr-2" />
                <a href="mailto:aleksi.pamilo@gmail.com" target="_blank" rel="noreferrer">aleksi.pamilo@gmail.com</a>
              </li>
              <li>
                <FaLinkedinIn className="inline-block w-7 text-blue-600 mr-2" />
                <a href="https://www.linkedin.com/in/aleksi-pamilo-62aaa5229/" target="_blank" rel="noreferrer">www.linkedin.com/</a>
              </li>
              <li>
                <FaMapMarkerAlt className="inline-block w-7 text-blue-600 mr-2" />
                <span>Vantaa, Suomi</span>
              </li>
            </ul>
          </div>

          <div className="text-white font-bold pt-10">
            <h3 className="text-xl uppercase mb-5">Education</h3>
            <ul>
              <li>
                <h1 className="font-medium text-[#03a9f4] mb-2 inline">2020 -{'>'} </h1>
                <p className="font-medium">Information and communication technologies</p>
                <p className="font-medium">Vantaa Vocational College, Varia</p>
              </li>
            </ul>
          </div>

          <div className="text-white font-bold pt-10">
            <h3 className="text-xl uppercase mb-5">Languages</h3>
            <ul className="select-none">
              <li className="mb-6">
                <p className="">English</p>
                <span className="relative h-2 bg-black block mt-1 rounded-lg">
                  <div className="absolute top-0 w-[70%] left-0 h-full bg-blue-500 rounded-lg" />
                </span>
              </li>
              <li className="mb-6">
                <p className="">Finnish</p>
                <span className="relative h-2 bg-black block mt-1 rounded-lg">
                  <div className="absolute top-0 w-[100%] left-0 h-full bg-blue-500 rounded-lg" />
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative bg-right p-[40px] text-black">
          <div className="mb-[70px] last:mb-0">
            <h1 className="font-bold text-2xl text-[#12263F] uppercase tracking-wider mb-[10px]">Profile</h1>
            <p>{profileText}</p>
          </div>
          <div className="mb-[70px] last:mb-0">
            <h1 className="font-bold text-2xl text-[#12263F] uppercase tracking-wider mb-[2.5rem]">Experience</h1>
            {
              jobs.map((x) => (
                <div className="flex flex-row mr-0 mb-4 wide:flex-col wide:mt-4" key={x.key}>
                  <div className="min-w-[160px] wide:min-w-[150px] wide:mb-1">
                    <h5 className="text-[#848c90] font-semibold uppercases text-base">{x.jobTime}</h5>
                    <h5 className="text-[#848c90] font-semibold uppercase text-sm">{x.jobName}</h5>
                  </div>
                  <div>
                    <h4 className="uppercase text-[#03a9f4] font-bold">{x.jobDesc}</h4>
                    <p className="text-black">{x.jobText}</p>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="">
            <h1 className="font-bold text-2xl text-[#12263F] uppercase tracking-wider mb-[50px]">Professional Skills</h1>
            {
              !skills ? (
                <div>
                  <p className="font-extrabold">An error occurred</p>
                  <p>For unknown reason fetching this data failed,</p>
                  <p>you can try refreshing the page with ctrl/cmd + shift + r</p>
                </div>
              ) : skills.map((x) => (
                <div className="box relative w-full grid mb-8 justify-center items-center select-none" key={x.index}>
                  <h2 className="uppercase font-medium text-[#848c90]">{x.language}</h2>
                  <div className="relative w-full h-[10px] bg-gray-600 rounded-lg">
                    <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg" style={{ width: x.percentage + "%" }} />
                  </div>
                </div>
              ))
            }
          </div>

          <div className="mt-10">
            <h1 className="interest font-bold text-2xl text-[#12263F] uppercase tracking-wider mb-[30px]">Interest</h1>
            <ul className="grid grid-cols-4 wider:m-[10px] wider:grid-cols-2">
              <li className="text-[#333] font-medium mt-[10px] inline"><FaGamepad className="inline text-blue-600 text-[18px] w-5" /> Gaming</li>
              <li className="text-[#333] font-medium mt-[10px] inline"><FaTerminal className="inline text-blue-600 text-[18px] w-5" /> Coding</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CV
