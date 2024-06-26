import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useModal } from "../context/ModalContextProvider";
import { toast } from "sonner";
import Input from "../Input";

const inputStyle = "w-full h-12 px-4 rounded-xl bg-transparent border border-zinc-800 focus:border-zinc-700 placeholder:text-gray-500 placeholder:text-opacity-70 bg-opacity-25 text-white shadow-md focus:outline-none";

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
    const [error, setError] = useState<boolean>(false);

    const handleSubmit = () => {
        if (name === "" || title === "" || content === "") {
            setError(true);
            toast.error(ContactFormErrors.FIELDS);
            return;
        };

        if (email && validateEmail(email) === false) {
            setError(true);
            toast.error(ContactFormErrors.EMAIL_INVALID);
            return;
        };

        try {
            fetch("https://api.aleksipamilo.dev/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    title,
                    content
                })
            });

            toast.success("Message sent successfully!");
            closeModal();
        } catch {
            toast.error(ContactFormErrors.UNEXPECTED);
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-[25rem] md:w-[40rem] rounded-lg shadow-lg bg-zinc-900 border border-zinc-800 backdrop-blur-3xl p-4">
                <div className="align-middle">
                    <div className="float-left">
                        <h1 className="text-white font-bold text-xl pl-1 select-none">Contact Me</h1>
                    </div>
                    <div className="float-right">
                        <button className="py-2 px-3 rounded-md bg-white text-black select-none hover:shadow-glow-2" onClick={() => {
                            if (name !== "" || title !== "" || content !== "") {
                                if (window.confirm("Are you sure you want to close this modal? This will clear all the fields.")) {
                                    closeModal();
                                }
                            } else {
                                closeModal();
                            }
                        }}>
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div>
                    <div className="grid gap-2 mt-12 mb-2 grid-row-2 md:grid-cols-2">
                        <Input styles={`${inputStyle} ${!!error && name === "" ? "border-red-500" : "focus:border focus:border-emerald-300"}`} type="text" placeholder="Your Name" value={name} onChange={e => setName(String(e.target.value))} />
                        <Input styles={`${inputStyle} ${error && email !== "" ? "border-red-500" : "focus:border focus:border-emerald-300"}`} type="email" placeholder="Your Email Address" value={email ?? ""} onChange={e => setEmail(String(e.target.value))} />
                    </div>
                    <Input styles={`${inputStyle} ${!!error && title === "" ? "border-red-500" : "focus:border focus:border-emerald-300"}`} type="text" placeholder="Title" value={title} onChange={e => setTitle(String(e.target.value))} />
                    <textarea
                        className={`w-full h-[5rem] min-h-[3rem] max-h-[8rem] md:max-h-[30rem] resize-y px-4 pt-2 mt-2 rounded-xl shadow-md bg-transparent placeholder:text-gray-500 placeholder:text-opacity-70 text-white border border-zinc-800 focus:outline-none ${!!error && content === "" ? "border border-red-500" : "focus:border focus:border-zinc-700"}`}
                        placeholder="Content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <div className="py-1">
                        <div className="float-right">
                            <button className="w-[8rem] h-10 rounded-md text-black font-bold bg-emerald-400 hover:bg-emerald-500"
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
