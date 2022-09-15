import React from "react";
import { FaPlus } from "react-icons/fa";
import { ISchool } from "../../interfaces/cv";
import { useDarkmode } from "../context/darkmodeContextProvider";
import { useModal } from "../context/modalContextProvider";
import ResumeEducation from "../modals/Management/Education";

type EducationProps = {
    schools: ISchool[];
    setSchools: React.Dispatch<React.SetStateAction<ISchool[]>>;
};

const Education: React.FC<EducationProps> = ({ schools, setSchools }) => {
    const { isDarkmode } = useDarkmode();
    const { setModalIsOpen, setModalContent } = useModal();

    const openSchoolModal = (school?: ISchool) => {
        setModalContent(<ResumeEducation school={school} schools={schools} setSchools={setSchools} />)
        setModalIsOpen(true);
    }

    return (
        <div className={`${isDarkmode ? "text-white" : "text-black"} mt-12`}>
            <div className="flex justify-between">
                <h1 className={`${isDarkmode ? "text-white" : "text-black"} text-4xl font-bold`}>Manage Education</h1>
                <button className="bg-cyan-400 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg" onClick={() => openSchoolModal()}>
                    <FaPlus />
                </button>
            </div>
            <div className="mt-5 justify-center flex flex-wrap gap-5">
                {
                    schools.map((school) => (
                        <div key={school.key} className="flex flex-wrap rounded-lg w-[25rem] min-h-[8rem] p-4 border-2 cursor-pointer select-none border-cyan-400 hover:border-cyan-600"
                            onClick={() => openSchoolModal(school)}
                        >
                            <div className="w-full">
                                <div className="float-left">
                                    <h1 className="text-xl font-bold">{school.name}</h1>
                                </div>
                                <div className="float-right">
                                    <h1 className="text-sm font-bold pt-1">{formatDate(school.startDate)} – {formatDate(school.endDate)}</h1>
                                </div>
                                <p className="text-sm mt-2">{school.desc}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

function formatDate(date: string) {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getFullYear()}`;
}

export default Education;
