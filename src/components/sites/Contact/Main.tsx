import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

import EmailSent from "../../popups/emailSent";
import EmailNotSent from "../../popups/emailNotSent";

import FirebaseServices from "../../../firebase/firebaseServices";

const db = FirebaseServices.getFirestoreInstance();

const Contact: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [errOpen, setErrOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailsRef = doc(db, "portfolio", "contact");
        setDoc(emailsRef, { name, email, title, content, index: createID() })
            .then(() => setOpen(true))
            .catch(() => setErrOpen(true));
    };

    return (
        <div className="max-w-[50rem] m-auto mt-24 border-4 bg-gray-500 p-5">
            <EmailSent open={open} setOpen={setOpen} />
            <EmailNotSent open={errOpen} setOpen={setErrOpen} />
            <h1 className="font-bold text-2xl">Contact is disabled at the moment!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name">Name</label>
                <input className="w-full text-black p-3 border-2 border-gray-200 box-border mt-2 mb-4 rounded-lg focus:outline-none" type="text" placeholder="Your name.." value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="email">Email</label>
                <input className="w-full text-black p-3 border-2 border-gray-200 box-border mt-2 mb-4 rounded-lg focus:outline-none" type="text" placeholder="Your email address.." value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="title">Title</label>
                <input className="w-full text-black p-3 border-2 border-gray-200 box-border mt-2 mb-4 rounded-lg focus:outline-none" type="text" placeholder="Title for this message.." value={title} onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor="content">Content</label>
                <textarea className="w-full h-24 text-black p-3 border-2 border-gray-200 box-border mt-2 mb-4 rounded-lg resize-y focus:outline-none" placeholder="Write something.." style={{ resize: "vertical" }} value={content} onChange={(e) => setContent(e.target.value)}></textarea>

                <input className="py-2 px-3 rounded-lg bg-cyan-500 cursor-pointer hover:bg-cyan-600" type="submit" value="Submit" />
            </form>
        </div>
    )
}

function createID() {
    var RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx';
    var replacePlaceholders = function (placeholder: string) {
        var random = Math.floor(Math.random() * 15 + 1)
        var value = placeholder === 'x' ? random : ((random && 0x3) || (random && 0x8));
        return value.toString(16);
    };
    return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
}

export default Contact;
