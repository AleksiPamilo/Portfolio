import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Iskills } from "../../Interfaces/cv";
import { doc, updateDoc} from "firebase/firestore";
import FirebaseServices from "../../firebase/firebaseServices";

const db = FirebaseServices.getFirestoreInstance();

type SkillsProps = { skills: Iskills[] }

const Main: React.FC<SkillsProps> = ({ skills }) => {
    const [index, setIndex] = useState<number>();
    const [language, setLanguage] = useState<string>();
    const [percentage, setPercentage] = useState<number>();

    const skillsArr = skills;
    const skillsRef = doc(db, "portfolio", "skills");

    const UpdateData = () => {
        if(!index) return alert("Index Missing");
        if(!language) return alert("Language Missing");
        if(!percentage) return alert("Percentage Missing");

        for(let i = 0; i < skillsArr.length; i++) {
            if(skillsArr[i].index === index) {
                skillsArr.splice(i, 1);
                break;
            }
        }

        skillsArr.push({ index, language, percentage });

        updateDoc(skillsRef, {
            skillsArr
        })

        setTimeout(() => window.location.reload(), 500);
    };

    const DeleteData = (index: number) => {
        for(let i = 0; i < skillsArr.length; i++) {
            if(skillsArr[i].index === index) {
                skillsArr.splice(i, 1);
                break;
            }
        }

        updateDoc(skillsRef, {
            skillsArr
        })

        setTimeout(() => window.location.reload(), 500 );
    };

  return (
    <div className="mt-8 ml-12">
        <h1 className="font-extrabold text-2xl mb-2">Professional Skills</h1>
        {
            skills.map((x) => (
                <div className="inline-flex pt-2" key={ x.index }>
                    <div className="relative inline-block">
                        <Menu>
                        {({ open }) => (
                            <>
                                <span className="rounded-md shadow-sm">
                                <Menu.Button className="text-center colors inline-flex min-w-[10rem] mr-4 rounded-md border-2 shadow-sm px-4 py-2 text-sm font-medium focus:outline-none">
                                    <span>{ x.language.toUpperCase() }</span>
                                    { /* <AiOutlineDown className="h-5 w-5" /> */ }
                                </Menu.Button>
                                </span>
                
                                <Transition
                                show={open}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                >
                                <Menu.Items
                                    static
                                    className="relative w-[20rem] h-[11rem] mt-2 origin-top-right rounded-md shadow-lg bg-white focus:outline-none"
                                >
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="text-black pt-4 pl-4 pr-12">Index</td>
                                                <td><input type="number" className="inline-block w-[10rem] colors rounded-lg border-2 text-center" placeholder={ x.index.toString() } value={ index } onChange={ (e) => setIndex(parseInt(e.target.value)) } /></td>
                                            </tr>
                                            <tr>
                                                <td className="text-black pl-4 pr-12">Language</td>
                                                <td><input type="text" className="inline-block w-[10rem] colors rounded-lg border-2 text-center" placeholder={ x.language } value={ language } onChange={ (e) => setLanguage(e.target.value.toLowerCase()) } /></td>
                                            </tr>
                                            <tr>
                                                <td className="text-black pl-4 pr-12">Percentage</td>
                                                <td><input type="number" className="inline-block w-[10rem] colors rounded-lg border-2 text-center" placeholder={ x.percentage.toString() } value={ percentage } onChange={ (e) => setPercentage(parseInt(e.target.value)) } /></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <button type="button" className="inline py-3 mt-3 w-[5rem] ml-4 bg-red-500 rounded-lg shadow-md shadow-black text-center"
                                                        onClick={() => DeleteData(x.index) }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                                <td>
                                                    <button type="button" className="inline float-right py-3 mt-3 w-[5rem] ml-4 bg-cyan-500 rounded-lg shadow-md shadow-black text-center"
                                                        onClick={ () => UpdateData() }
                                                    >
                                                        Save
                                                    </button>
                                                </td>
                                                </tr>
                                        </tbody>
                                    </table>
                                </Menu.Items>
                                </Transition>
                            </>
                        )}
                        </Menu>
                    </div>
                </div>
            ))
        }
        <hr className="mt-4 w-[82%]" />
    </div>
  )
}

export default Main;
