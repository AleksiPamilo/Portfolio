import React from "react";

type InputProps = {
    type: string;
    placeholder: string;
    required?: boolean;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<any>>;
};

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, required }) => {
    return (
        <input
            className={`w-full h-12 px-4 rounded-lg border-2 border-gray-300 focus:outline-none ${required ? "border-red-500" : "focus:border-cyan-600"}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default Input;
