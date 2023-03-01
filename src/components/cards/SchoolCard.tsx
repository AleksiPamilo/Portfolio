import React from "react";
import { ISchool } from "../../interfaces/cv";
import formatDate from "../../utils/formatDate";

type SchoolCardProps = {
    school: ISchool;
};
const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
    return (
        <div className="flex flex-col max-w-[25rem] min-h-[7rem] p-4 gap-6 rounded-md border hover:shadow-glow-5">
            <div className="flex flex-row justify-between items-center">
                <p>{school.name}</p>
                <p>{formatDate(school.startDate)} - {formatDate(school.endDate)}</p>
            </div>
            <p>{school.desc}</p>
        </div>
    )
}

export default SchoolCard;
