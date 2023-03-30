import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { BsFullscreenExit, BsFullscreen } from "react-icons/bs";
import { useModal } from "./context/ModalContextProvider";

type Image = {
    url: string;
    alt: string;
}

type ImageSliderProps = {
    images: Image[];
    link?: string;
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images, link }) => {
    const { setModalContent, setIsModalOpen, closeModal } = useModal();
    const [current, setCurrent] = React.useState<number>(0);

    return (
        <div className="h-full relative">
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
                <button
                    onClick={() => setCurrent(current === 0 ? images.length - 1 : current - 1)}
                    className="flex items-center justify-center p-3 bg-zinc-800 rounded-full bg-opacity-60 hover:bg-opacity-90"
                >
                    <FaAngleLeft className="w-6 h-6 text-white" />
                </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
                <button
                    onClick={() => setCurrent(current === images.length - 1 ? 0 : current + 1)}
                    className="flex items-center justify-center p-3 bg-zinc-800 rounded-full bg-opacity-60 hover:bg-opacity-90"
                >
                    <FaAngleRight className="w-6 h-6 text-white" />
                </button>
            </div>
            <div className="absolute bottom-2 right-1">
                <button
                    onClick={() => {
                        setModalContent(
                            <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#111111]">
                                <button onClick={closeModal} className="absolute bottom-4 right-8 flex items-center justify-center p-3 bg-zinc-800 rounded-full bg-opacity-60 hover:bg-opacity-90">
                                    <BsFullscreenExit className="w-6 h-6 text-white" />
                                </button>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "0.5rem",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "contain",
                                        backgroundImage: `url(${images[current].url})`
                                    }}
                                />
                            </div>
                        );
                        setIsModalOpen(true);
                    }}
                    className="flex items-center justify-center p-3 bg-zinc-800 rounded-full bg-opacity-60 hover:bg-opacity-90"
                >
                    <BsFullscreen className="w-6 h-6 text-white" />
                </button>
            </div>
            <div style={{
                width: "100%",
                height: "100%",
                borderRadius: "0.5rem",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${images[current].url})`,
                cursor: link ? "pointer" : "default"
            }} onClick={() => {
                if (link) {
                    window.open(link, "_blank");
                }
            }} />
            <div className="flex gap-2 items-center justify-center">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-4 h-4 rounded-full bg-zinc-500 mt-3 cursor-pointer ${index === current ? "bg-opacity-100" : "bg-opacity-50"}`}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ImageSlider;
