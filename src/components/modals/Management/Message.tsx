import React from "react";
import { FaTimes } from "react-icons/fa";
import { IMessage } from "../../../interfaces/contact";

type MessageProps = {
    message: IMessage,
    visible: boolean,
    handleModal: () => void,
};
const Message: React.FC<MessageProps> = ({ message, visible, handleModal }) => {
    if (!message) return <div className="hidden" />
    return (
        <div className={`${visible ? "flex" : "hidden"} w-screen h-screen fixed z-[1] justify-center items-center backdrop-blur-[2px]`} onClick={handleModal}>
            <div className="w-[25rem] md:w-[40rem] rounded-lg bg-gray-300 p-4 border-2 border-cyan-600" onClick={e => e.stopPropagation()}>
                <div className="align-middle">
                    <div className="float-left">
                        <h1 className="text-black font-bold text-xl pl-1 select-none">Message</h1>
                    </div>
                    <div className="float-right">
                        <button className="py-2 px-3 rounded-md bg-cyan-600 hover:bg-cyan-700 select-none" onClick={handleModal}>
                            <FaTimes className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col mt-8 pl-1">
                    <div className="flex flex-row truncate">
                        <h1 className="text-black font-bold text-lg pr-1 select-none">Title:</h1>
                        <p className="text-black text-lg pl-1 select-none">{message.title}</p>
                    </div>
                    <div className="flex flex-row truncate">
                        <h1 className="text-black font-bold text-lg pr-1 select-none">Sender:</h1>
                        <p className="text-black text-lg pl-1 select-none">{message.name} {message.email && "| " + message.email}</p>
                    </div>
                    <div className="mt-2">
                        <h1 className="text-black font-bold text-lg select-none">Content:</h1>
                        <div
                            className="w-[22.5rem] md:w-[37.5rem] max-h-[15rem] break-words resize-y overflow-y-auto border border-gray-500 p-2 rounded-md"
                        >
                            {message.content}
                        </div>
                    </div>
                    <div className="flex flex-row mt-2">
                        <h1 className="text-black font-bold text-lg pr-1 select-none">This message was sent:</h1>
                        <p className="text-black text-lg pl-1 select-none">{new Date(message.date).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Message;
