import React, { useState } from "react";

interface IModalContext {
    modalIsOpen: boolean,
    modalContent: JSX.Element | null,
    modalStyle?: string,
    closeModal: () => void,
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
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
    const [ModalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

    const defaultStyle = "flex w-screen h-screen fixed justify-center items-center backdrop-blur-[2px]"
    const [modalStyle, _setModalStyle] = useState<string>(defaultStyle);

    const onClose = () => {
        setModalIsOpen(false);
        setModalContent(null);
    }

    return (
        <ModalContext.Provider value={{
            modalIsOpen: ModalIsOpen,
            setModalIsOpen: setModalIsOpen,
            modalContent,
            setModalContent,
            closeModal: onClose,
            modalStyle,
            setModalStyle: _setModalStyle,
        }}>
            <div className={modalStyle + " z-50"} onClick={onClose}
                style={{
                    display:
                        ModalIsOpen ? "flex" : "none"
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