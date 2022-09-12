import React, { useState } from "react";

interface IModalContext {
    isModalOpen: boolean,
    modalContent: JSX.Element | null,
    modalStyle?: string,
    closeModal: () => void,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setModalContent: React.Dispatch<React.SetStateAction<JSX.Element | null>>,
    setModalStyle?: React.Dispatch<React.SetStateAction<string>>
}

const ModalContext = React.createContext<IModalContext | undefined>(undefined);
const useModalContext = () => {
    const context = React.useContext(ModalContext);

    if (context === undefined) {
        throw new Error('Call "useModalContext" only inside ModalContextProvider');
    }

    return context;
}

const ModalContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

    const defaultStyle = "flex w-screen h-screen fixed justify-center items-center z-[1] backdrop-blur-[2px]"
    const [modalStyle, _setModalStyle] = useState<string>(defaultStyle);

    const onClose = () => {
        setIsModalOpen(false);
        setModalContent(null);
    }

    return (
        <ModalContext.Provider value={{
            isModalOpen,
            setIsModalOpen,
            modalContent,
            setModalContent,
            closeModal: onClose,
            modalStyle,
            setModalStyle: _setModalStyle,
        }}>
            <div className={modalStyle} onClick={onClose}
                style={{
                    display:
                        isModalOpen ? "flex" : "none"
                }}>
                <div onClick={e => e.stopPropagation()}>
                    {modalContent}
                </div>
            </div>
            {children}
        </ModalContext.Provider>
    );
}

export {
    ModalContextProvider,
    useModalContext as useModal
};