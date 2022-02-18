import React from "react";
import Card from "./Card";
import { Ischools } from "../../Interfaces/cv";

type EducationProps = {
    schools: Ischools[];
};

const Education: React.FC<EducationProps> = ({ schools }) => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-[#1f487a]">Education</h1>
            {
                !schools
                    ? <p className="text-center font-bold text-2xl mt-64">Loading...</p>
                    : schools.map(x => <Card index={x.key} title={x.fullName} text={x.desc} time={x.time} />)
            }
        </div>
    )
}

export default Education;
