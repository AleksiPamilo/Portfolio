import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { ISchool } from "../../../interfaces/cv";
import { useModal } from "../../context/modalContextProvider";
import { v1 as uuid } from "uuid";
import FirebaseServices from "../../../firebase/firebaseServices";
import { FaTimes } from "react-icons/fa";
import Input from "../../Input";

const db = FirebaseServices.getFirestoreInstance();

type ResumeEducationProps = {
    school?: ISchool;
    schools: ISchool[];
    setSchools: React.Dispatch<React.SetStateAction<ISchool[]>>;
};
const ResumeEducation: React.FC<ResumeEducationProps> = ({ school, schools, setSchools }) => {
    const { closeModal } = useModal();

    const [startDate, setStartDate] = React.useState<string | undefined>(school?.startDate);
    const [endDate, setEndDate] = React.useState<string | undefined>(school?.endDate);
    const [name, setName] = React.useState<string | undefined>(school?.name);
    const [desc, setDesc] = React.useState<string | undefined>(school?.desc);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const resumeRef = doc(db, "portfolio", "resume");

    const clearFields = () => {
        setStartDate(undefined);
        setEndDate(undefined);
        setName(undefined);
        setDesc(undefined);
    }

    const handleUpdate = () => {
        if (!startDate || !endDate || !name || !desc) return setError("Please fill in all the fields");

        const key = school?.key ?? uuid();

        for (const s in schools) {
            if (schools[s].key === key) {
                schools.splice(parseInt(s), 1);
            }
        }

        schools.push({
            key: key,
            name: name,
            desc: desc,
            startDate: startDate,
            endDate: endDate,
        });

        updateDoc(resumeRef, { education: schools })
            .then(() => {
                setError(null);
                setSuccess("School updated successfully");
                clearFields();
                setSchools(schools);
                setTimeout(() => setSuccess(null), 10000);
            })
            .catch(() => {
                setSuccess(null);
                setError("Something went wrong");
                setTimeout(() => setError(null), 10000);
            })
    }

    const handleDelete = () => {
        if (!school) return;

        for (const s in schools) {
            if (schools[s].key === school.key) {
                schools.splice(parseInt(s), 1);
                break;
            }
        }

        setSchools(schools);
        updateDoc(resumeRef, { education: schools });
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-[25rem] md:w-[40rem] rounded-lg bg-gray-300 p-4 border-2 border-cyan-600" onClick={e => e.stopPropagation()}>
                <div className="float-left">
                    <h1 className="text-black font-bold text-xl pl-1 select-none">{school ? "Update School" : "Add New School"}</h1>
                </div>
                <div className="float-right">
                    <button className="py-2 px-3 rounded-md bg-cyan-600 hover:bg-cyan-700 select-none" onClick={closeModal}>
                        <FaTimes className="w-5 h-5 text-white" />
                    </button>
                </div>

                <div>
                    <div className="grid grid-cols-2 mt-12 gap-1">
                        <Input type="text" placeholder={school?.name ?? "Name"} value={name ?? ""} onChange={e => setName(String(e.target.value))} />
                        <Input type="text" placeholder={school?.name ?? "Description"} value={desc ?? ""} onChange={e => setDesc(String(e.target.value))} />
                        <Input type="text" placeholder={String(school?.startDate ?? "Start Date (mm/dd/yyyy)")} value={startDate ?? ""} onChange={e => setStartDate(String(e.target.value))} />
                        <Input type="text" placeholder={String(school?.endDate ?? "End Date (mm/dd/yyyy)")} value={endDate ?? ""} onChange={e => setEndDate(String(e.target.value))} />
                    </div>
                </div>

                <div className="py-1">
                    <div className="float-left" hidden={!!!error}>
                        <div className="flex items-center w-full max-w-[29.3rem] h-10 px-4 rounded-lg border-2 text-red-600 bg-white border-red-500">
                            {error}
                        </div>
                    </div>
                    <div className="float-left" hidden={!!!success}>
                        <div className="flex items-center w-full h-10 px-4 rounded-lg border-2 text-green-600 bg-white border-green-400" >
                            {success}
                        </div>
                    </div>
                    <div className="float-right">
                        <button className="w-[8rem] h-10 rounded-md text-white font-bold bg-red-600 hover:bg-red-700"
                            hidden={!!!school}
                            onClick={() => {
                                if (window.confirm("Are you sure you want to delete this school?")) {
                                    handleDelete();
                                    closeModal();
                                }
                            }}
                        >
                            Delete
                        </button>
                        <button className="w-[8rem] h-10 rounded-md text-white font-bold bg-cyan-600 hover:bg-cyan-700 ml-2 mr-1"
                            onClick={handleUpdate}
                        >
                            {
                                school ? "Update" : "Add"
                            }
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ResumeEducation;
