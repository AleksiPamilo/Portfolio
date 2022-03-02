import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import FirebaseServices from "../../firebase/firebaseServices";

const db = FirebaseServices.getFirestoreInstance();

type ProfileProps = { profileText: string };

const Profile: React.FC<ProfileProps> = ({ profileText }) => {
    const [text, setText] = useState<string>();

    return (
        <div className="pt-44 pl-12">
            <p className="text-2xl font-extrabold mb-2">Profile Text</p>
            <textarea className="inline-block pt-3 pl-3 w-[70%] h-24 colors rounded-lg mr-3 border-2 focus:outline-none" placeholder={profileText} value={text} onChange={(e) => { setText(e.target.value) }} style={{ resize: "vertical" }} />
            <button type="button" className="inline-block py-3 bg-cyan-500 rounded-lg shadow-md shadow-black text-center min-w-[4.5rem] md:min-w-[11%]"
                onClick={() => {
                    setDoc(doc(db, "portfolio", "profile"), { text })
                }}
            >
                Save
            </button>
            <hr className="mt-4 w-[82%]" />
        </div>
    )
}

export default Profile;
