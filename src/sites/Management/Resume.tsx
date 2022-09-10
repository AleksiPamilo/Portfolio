import React, { useState } from "react";

const Resume: React.FC = () => {
    const [profileText, setProfileText] = useState<string>("");

    return (
        <div className="flex w-full h-full justify-center items-center pt-[10rem]">
            <div className="">
                <h1 className="text-4xl font-bold text-center">Profile Text</h1>
                <textarea
                    className="w-full h-[5rem] min-h-[3rem] max-h-[8rem] md:max-h-[30rem] resize-y px-4 pt-2 mt-1 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-cyan-600"
                    placeholder="Content"
                    value={profileText}
                    onChange={e => setProfileText(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Resume;
