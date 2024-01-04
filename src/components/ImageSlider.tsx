import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useModal } from "./context/ModalContextProvider";

type Image = {
    url: string;
    alt: string;
}

type ImageSliderProps = {
    images: Image[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const { setModalContent, setIsModalOpen, closeModal } = useModal();
    const [current, setCurrent] = React.useState<number>(0);

    return (
        <div className="w-full relative">
            <div className="flex items-center justify-center">
                <button className="cursor-zoom-in" onClick={() => {
                    setModalContent(
                        <button className="cursor-zoom-out" onClick={closeModal}>
                            <img className="w-full h-full object-contain" src={images[current].url} alt={images[current].alt} />
                        </button>
                    );
                    setIsModalOpen(true);
                }}>
                    <img
                        className="w-full max-h-[30rem] object-contain rounded-lg"
                        src={images[current].url} alt={images[current].alt}
                    />
                </button>
            </div>

            <div hidden={images.length === 1}>
                <div>
                    <button className="absolute left-1 top-1/2 tranform -translate-y-1/2 text-4xl text-white hover:text-zinc-500 bg-black bg-opacity-50 rounded-full p-1" onClick={() => setCurrent((current - 1 + images.length) % images.length)}>
                        <FaAngleLeft />
                    </button>

                    <button className="absolute right-1 top-1/2 tranform -translate-y-1/2 text-4xl text-white hover:text-zinc-500 bg-black bg-opacity-50 rounded-full p-1" onClick={() => setCurrent((current + 1) % images.length)}>
                        <FaAngleRight />
                    </button>
                </div>

                <div className="flex gap-2 items-center justify-center">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-6 h-2 rounded-full bg-zinc-500 mt-3 cursor-pointer ${index === current ? "bg-opacity-100" : "bg-opacity-50"}`}
                            onClick={() => setCurrent(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ImageSlider;
