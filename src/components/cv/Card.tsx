import React from "react";

type CardProps = {
    index?: string;
    title?: string;
    desc?: string;
    text?: string,
    time?: string;
}

const Card: React.FC<CardProps> = ({ index, title, desc, text, time }) => {
    return (
        <div className="w-full mt-6" key={index}>
            <div className="w-1/2 h-[40px] float-left font-bold pt-2">
                <p className="text-left ml-2 text-blue-500 text-sm md:text-base md:ml-12 ">{desc}</p>
                <p className="text-left ml-2 text-blue-600 mt-1 md:ml-12">{title}</p>
            </div>
            <div className="ml-1/2 h-[40px] text-gray-500 pt-2">
                <p className="text-right mr-2 md:mr-12">{time}</p>
            </div>
            <div className={`text-left ml-2 ${desc ? "mt-20 md:mt-8 " : "mt-16 md:mt-2"} md:ml-12`}>
                <p className="text-lg">{text}</p>
            </div>
            <hr className="m-auto mt-6 max-w-[47rem] border-gray-600" />
        </div>
    );
};

export default Card;