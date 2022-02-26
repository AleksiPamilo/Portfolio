import React, { useState } from "react";
import { FaTrash } from "react-icons/fa"
import { Iemail } from "../../../../Interfaces/contact";
import Email from "../../../popups/email";

type EmailsProps = {
    emails: Iemail[];
    deleteMail: (email: Iemail) => void
}

const Emails: React.FC<EmailsProps> = ({ emails, deleteMail }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [email, setEmail] = useState<Iemail>();

    const openEmail = (email: Iemail) => {
        setEmail(email);
        setOpen(true);
    }

    return (
        <div className="">
            <Email open={open} setOpen={setOpen} email={email} />
            <table className="w-[912px] bg-gray-400">
                <thead>
                    <tr className="text-black h-12">
                        <th>Title</th>
                        <th>Name</th>
                        <th>E-mail address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        emails.map((email: Iemail) => (
                            <tr key={email.index} className="text-gray-600 text-base font-normal h-[72px] border-y cursor-pointer">
                                <td onClick={() => openEmail(email)}>{email.title}</td>
                                <td onClick={() => openEmail(email)} className="pl-[24px]">{email.name}</td>
                                <td onClick={() => openEmail(email)}>{email.email}</td>
                                <td>
                                    <FaTrash className="text-[#909090] w-6 h-6 hover:text-black"
                                        onClick={() => deleteMail(email)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Emails;
