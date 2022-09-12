import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";
import { useModal } from "../context/modalContextProvider";
import Input from "../Input";

import FirebaseServices from "../../firebase/firebaseServices";
const firestore = FirebaseServices.getFirestoreInstance();

const Contact: React.FC = () => {
    const { closeModal } = useModal();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = () => {
        if (name === "" || title === "" || content === "") {
            setSuccess(null);
            setError("Please fill in all the required fields");
            return;
        };

        if (email && validateEmail(email) === false) {
            setSuccess(null);
            setError("Please enter a valid email");
            return;
        };

        return addDoc(collection(firestore, "contact"), {
            name,
            email,
            title,
            content,
            date: new Date().toISOString()
        }).then(() => {
            setError(null);
            clearFields();
            setSuccess("Message sent successfully");
        }).catch(() => {
            setSuccess(null);
            setError("Something went wrong");
        });
    }

    const clearFields = () => {
        setName("");
        setEmail("");
        setTitle("");
        setContent("");
        setError(null);
        setSuccess(null);
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-[25rem] md:w-[40rem] rounded-lg bg-gray-300 p-4 border-2 border-cyan-600">
                <div className="align-middle">
                    <div className="float-left">
                        <h1 className="text-black font-bold text-xl pl-1 select-none">Contact Me</h1>
                    </div>
                    <div className="float-right">
                        <button className="py-2 px-3 rounded-md bg-cyan-600 hover:bg-cyan-700 select-none" onClick={() => {
                            if (name !== "" || title !== "" || content !== "") {
                                if (window.confirm("Are you sure you want to close this modal? This will clear all the fields.")) {
                                    clearFields();
                                    closeModal();
                                }
                            } else {
                                clearFields();
                                closeModal();
                            }
                        }}>
                            <FaTimes className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>
                <div>
                    <div className="grid gap-1 mt-12 mb-1 grid-row-2 md:grid-cols-2">
                        <Input type="text" placeholder="Your Name" value={name} onChange={e => setName(String(e.target.value))} required={!!error && name === ""} />
                        <Input type="email" placeholder="Your Email Address" value={email ?? ""} onChange={e => setEmail(String(e.target.value))} />
                    </div>
                    <Input type="text" placeholder="Title" value={title} onChange={e => setTitle(String(e.target.value))} required={!!error && title === ""} />
                    <textarea
                        className={`w-full h-[5rem] min-h-[3rem] max-h-[8rem] md:max-h-[30rem] resize-y px-4 pt-2 mt-1 rounded-lg border-2 border-gray-300 focus:outline-none ${!!error && content === "" ? "border-red-500" : "focus:border-cyan-600"}`}
                        placeholder="Content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
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
                            <button className="w-[8rem] h-10 rounded-md text-white font-bold bg-cyan-600 hover:bg-cyan-700"
                                onClick={handleSubmit}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export default Contact;
