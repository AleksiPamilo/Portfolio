import React from "react";
import { FaPlus } from "react-icons/fa";
import { ISchool } from "../../interfaces/cv";
import { useDarkmode } from "../context/darkmodeContextProvider";
import { useModal } from "../context/modalContextProvider";
import ResumeEducation from "../modals/Management/Education";
import formatDate from "../formatDate";

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
                        <div key={school.key} className="flex flex-wrap rounded-lg w-[25rem] min-h-[8rem] p-4 border-2 select-none border-cyan-400 hover:border-cyan-600"
                            onClick={() => openSchoolModal(school)}
                        >
                            <h1 className="text-base md:text-xl font-bold">{school.name}</h1>
                            <div className="flex flex-row w-full justify-between">
                                <p className="text-sm mt-2">{school.desc}</p>
                            </div>
                            <h1 className="text-sm font-bold pt-5">{formatDate(school.startDate)} – {formatDate(school.endDate)}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Education;
