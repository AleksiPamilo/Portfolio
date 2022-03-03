import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import EmailSent from "../../popups/emailSent";
import EmailNotSent from "../../popups/emailNotSent";

import FirebaseServices from "../../../firebase/firebaseServices";

const Contact: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [errOpen, setErrOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string | undefined>(undefined);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const firestore = FirebaseServices.getFirestoreInstance();

        if (name === "" || email === "" || title === "" || content === "") {
            setErrMsg("Fill up all the fields!");
            setErrOpen(true);
            return;
        }

        const validateEmail = () => {
            let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        if (validateEmail() === false) {
            setErrMsg("Make sure your email is valid!");
            setErrOpen(true);
            return;
        }

        const d = new Date();
        const date = d.getDate().toString().padStart(2, "0")
            + "."
            + (d.getMonth() + 1).toString().padStart(2, "0")
            + "."
            + d.getFullYear().toString().slice(-2);

        return await addDoc(collection(firestore, "contact"), {
            id: new Date().getTime(),
            name: name,
            email: email,
            title: title,
            content: content,
            date: date
        }).then(() => {
            setOpen(true);
            setName("");
            setEmail("");
            setTitle("");
            setContent("");
        }).catch(() => setErrOpen(true));
    };

    return (
        <div className="max-w-[50rem] m-auto mt-24 border-4 bg-gray-500 p-5">
            <EmailSent open={open} setOpen={setOpen} />
            <EmailNotSent open={errOpen} setOpen={setErrOpen} message={errMsg} setMessage={setErrMsg} />
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name">Name</label>
                <input className="w-full text-black p-3 border-2 border-gray-200 box-border mt-2 mb-4 rounded-lg focus:outline-none" type="text" placeholder="Your name.." value={name} onChange={(e) => setName(String(e.target.value))} />

                <label htmlFor="email">Email</label>
                <input className="w-full text-black p-3 border-2 border-gray-200 box-border mt-2 mb-4 rounded-lg focus:outline-none" type="text" placeholder="Your email address.." value={email} onChange={(e) => setEmail(String(e.target.value))} />

                <label htmlFor="title">Title</label>
                <input className="w-full text-black p-3 border-2 border-gray-200 box-border mt-2 mb-4 rounded-lg focus:outline-none" type="text" placeholder="Title for this message.." value={title} onChange={(e) => setTitle(String(e.target.value))} />

                <label htmlFor="content">Content</label>
                <textarea className="w-full h-24 text-black p-3 border-2 border-gray-200 box-border mt-2 mb-4 rounded-lg resize-y focus:outline-none" placeholder="Write something.." style={{ resize: "vertical" }} value={content} onChange={(e) => setContent(String(e.target.value))}></textarea>

                <input className="py-2 px-3 rounded-lg bg-cyan-500 cursor-pointer hover:bg-cyan-600" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Contact;
