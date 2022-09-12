import React, { useState, useEffect } from "react";
import { collection, deleteDoc, doc, documentId, getDocs, query, where } from "firebase/firestore";
import { IMessage } from "../../interfaces/contact";
import FirebaseServices from "../../firebase/firebaseServices";
import Message from "../../components/modals/Management/Message";
import { FaTrash } from "react-icons/fa";

const db = FirebaseServices.getFirestoreInstance();

const thStyles = "px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider select-none";
const tdStyles = "px-6 py-4 whitespace-normal border-t border-gray-500 max-w-[15rem] overflow-ellipsis overflow-hidden";

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [message, setMessage] = useState<IMessage | null>(null);
    const [messageModalVisible, setMessageModalVisible] = useState<boolean>(false);
    const handleMessageModal = () => setMessageModalVisible(!messageModalVisible);

    useEffect(() => {
        getDocs(collection(db, "contact"))
            .then((snapshot) => {
                const arr: any = [];

                snapshot.forEach((doc) => {
                    arr.push({ id: doc.id, ...doc.data() });
                });

                setMessages(arr);
            });
    }, []);

    const handleDelete = (id: string) => {
        const contactRef = collection(db, "contact");
        const q = query(contactRef, where(documentId(), "==", id));

        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach((document) => {
                    deleteDoc(doc(contactRef, document.id))
                        .catch(() => alert("Error deleting document"));
                });
            });

        setMessages(messages.filter((message) => message.id !== id));
    };

    return (
        <>
            <Message message={message!} visible={messageModalVisible} handleModal={handleMessageModal} />
            <div className="flex w-full h-full justify-center pt-[6rem]">
                <div className="w-[80%] max-w-full rounded-l-lg">
                    <h1 className="text-4xl font-bold">Messages</h1>
                    <div className="max-h-[45rem] overflow-y-scroll rounded-l-lg mt-2 border border-gray-500">
                        <table className="bg-gray-300 rounded-l-lg w-full">
                            <thead className="w-full">
                                <tr>
                                    <th className={thStyles}>Title</th>
                                    <th className={thStyles}>Name</th>
                                    <th className={thStyles}>Email Address</th>
                                    <th className={thStyles}>Date</th>
                                    <th className={thStyles}>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((message, index) => (
                                    <tr key={index} className="cursor-pointer hover:bg-gray-400" onClick={() => {
                                        setMessage(message);
                                        handleMessageModal();
                                    }}>
                                        <td className={tdStyles}>
                                            <div className="text-sm text-gray-900">{message.title}</div>
                                        </td>
                                        <td className={tdStyles}>
                                            <div className="text-sm text-gray-900">{message.name}</div>
                                        </td>
                                        <td className={tdStyles}>
                                            <div className="text-sm text-gray-900">{message.email ?? "Unknown"}</div>
                                        </td>
                                        <td className={tdStyles}>
                                            <div className="text-sm text-gray-900">{new Date(message.date).toLocaleString()}</div>
                                        </td>
                                        <td className={tdStyles + " w-[2rem]"} onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(message.id);
                                        }}>
                                            <div className="text-sm text-gray-900 flex justify-end ">
                                                <FaTrash className="w-5 h-5 hover:text-gray-300" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messages;
