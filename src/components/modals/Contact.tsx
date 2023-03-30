import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useModal } from "../context/ModalContextProvider";
import Input from "../Input";

const inputStyle = "w-full h-12 px-4 rounded-xl bg-transparent placeholder:text-gray-300 text-white border focus:outline-none";

enum ContactFormErrors {
    FIELDS = "Please fill in all the required fields",
    EMAIL_INVALID = "Please enter a valid email",
    UNEXPECTED = "Something went wrong. Please try again later.",
}

const Contact: React.FC = () => {
    const { closeModal } = useModal();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = () => {
        setSuccess(null);
        setError(null);

        if (name === "" || title === "" || content === "") {
            setSuccess(null);
            setError(ContactFormErrors.FIELDS);
            return;
        };

        if (email && validateEmail(email) === false) {
            setSuccess(null);
            setError(ContactFormErrors.EMAIL_INVALID);
            return;
        };

        fetch("https://api.aleksipamilo.dev/contact", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                name,
                email,
                title,
                content
            })
        })
            .then(() => {
                setError(null);
                setSuccess("Message sent successfully!");
                clearFields();
            })
            .catch(() => {
                setSuccess(null);
                setError(ContactFormErrors.UNEXPECTED);
            });
    }

    const clearFields = () => {
        setName("");
        setEmail("");
        setTitle("");
        setContent("");
    }

    const clearStatus = () => {
        setError(null);
        setSuccess(null);
    }

    return (
        <div className="flex justify-center items-center bg-[#101010]">
            <div className="w-[25rem] md:w-[40rem] rounded-lg backdrop-blur-3xl p-4 border shadow-glow-2">
                <div className="align-middle">
                    <div className="float-left">
                        <h1 className="text-white font-bold text-xl pl-1 select-none">Contact Me</h1>
                    </div>
                    <div className="float-right">
                        <button className="py-2 px-3 rounded-md bg-white text-black select-none hover:shadow-glow-2" onClick={() => {
                            if (name !== "" || title !== "" || content !== "") {
                                if (window.confirm("Are you sure you want to close this modal? This will clear all the fields.")) {
                                    clearFields();
                                    closeModal();
                                    clearStatus();
                                }
                            } else {
                                clearFields();
                                clearStatus();
                                closeModal();
                            }
                        }}>
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div>
                    <div className="grid gap-1 mt-12 mb-1 grid-row-2 md:grid-cols-2">
                        <Input styles={`${inputStyle} ${!!error && name === "" ? "border-red-500" : "focus:shadow-glow-1"}`} type="text" placeholder="Your Name" value={name} onChange={e => setName(String(e.target.value))} />
                        <Input styles={`${inputStyle} ${error === ContactFormErrors.EMAIL_INVALID && email !== "" ? "border-red-500" : "focus:shadow-glow-1"}`} type="email" placeholder="Your Email Address" value={email ?? ""} onChange={e => setEmail(String(e.target.value))} />
                    </div>
                    <Input styles={`${inputStyle} ${!!error && title === "" ? "border-red-500" : "focus:shadow-glow-1"}`} type="text" placeholder="Title" value={title} onChange={e => setTitle(String(e.target.value))} />
                    <textarea
                        className={`w-full h-[5rem] min-h-[3rem] max-h-[8rem] md:max-h-[30rem] resize-y px-4 pt-2 mt-1 rounded-xl bg-transparent text-white border focus:outline-none ${!!error && content === "" ? "border-red-500" : "focus:shadow-glow-1"}`}
                        placeholder="Content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <div className="py-1">
                        <div className="float-left">
                            <span hidden={!!!error} className="flex items-center w-full max-w-[29.3rem] text-red-600">
                                {error}
                            </span>
                            <div hidden={!!!success} className="flex items-center w-full max-w-[29.3rem] text-green-600" >
                                {success}
                            </div>
                        </div>
                        <div className="float-right">
                            <button className="w-[8rem] h-10 rounded-md text-black font-bold bg-white hover:shadow-glow-2"
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
