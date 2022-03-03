import React, { useState } from "react";
import { ICellRendererParams } from "@ag-grid-community/core";
import { FaTrash } from "react-icons/fa";
import { HiMailOpen } from "react-icons/hi";
import { Iemail } from "../../../../Interfaces/contact";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import FirebaseServices from "../../../../firebase/firebaseServices";
import EmailNotDeleted from "../../../popups/emailNotSent";
import Email from "../../../popups/email";

const db = FirebaseServices.getFirestoreInstance();

const CellRenderer: React.FC<ICellRendererParams> = ({ api, node  }) => {
    const [email, setEmail] = useState<Iemail>();
    const [open, setOpen] = useState<boolean>(false);
    const [errOpen, setErrOpen] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>("");
    
    const handleDelete = () => {
        const q = query(collection(db, "contact"), where("id", "==", node.data.id));

        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach((document) => {
                    deleteDoc(doc(db, "contact", document.id))
                        .catch(() => { setErrMsg("Email was not deleted due to an error."); setErrOpen(true); });
                });
            });
            
        api.applyTransaction({
            remove: [node.data]
        });
    };

    const handleOpen = () => {
        setEmail(node.data);
        setOpen(true);
    };

    return (
        <div className="text-center">
            <Email email={email} open={open} setOpen={setOpen} />
            <EmailNotDeleted open={errOpen} setOpen={setErrOpen} message={errMsg} setMessage={setErrMsg} />
            <button onClick={handleOpen}>
                <HiMailOpen className="w-6 h-6 mr-8 text-gray-600" />
            </button>
            <button onClick={handleDelete}>
                <FaTrash className="w-6 h-6 text-gray-600" />
            </button>
        </div>
    )
}

export default CellRenderer
