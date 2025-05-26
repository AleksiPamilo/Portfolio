"use client"

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogOverlay,
    DialogClose,
    DialogTitle,
} from "@/components/ui/dialog"
import { useCallback } from "react"
import { useEffect, useState } from "react";

export default function ImageCarousel({ images, alt }: { images: string[], alt: string }) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState<number>(0)
    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)
    const [lightboxIndex, setLightboxIndex] = useState<number>(0)

    useEffect(() => {
        if (!api) return;
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const openLightbox = useCallback((idx: number) => {
        setLightboxIndex(idx)
        setLightboxOpen(true)
    }, [])

    if (!images || images.length === 0) {
        return null;
    }

    const isSingle = images.length === 1;


    return (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
            <Carousel className="w-full relative" setApi={setApi} opts={{ loop: !isSingle }}>
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem
                            key={index}
                            className="relative w-max md:min-h-[30rem] rounded-md overflow-hidden"
                        >
                            <DialogTrigger asChild>
                                <div
                                    className="cursor-zoom-in"
                                    onClick={() => openLightbox(index)}
                                >
                                    <img
                                        src={image}
                                        alt={alt}
                                        width={1600}
                                        height={900}
                                        className="object-contain w-full rounded-md h-auto max-h-[60vh]"
                                    />
                                </div>
                            </DialogTrigger>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {!isSingle && (
                    <>
                        <CarouselPrevious className="z-30 shadow-xl absolute left-1 top-1/2 transform -translate-y-1/2" />
                        <CarouselNext className="z-30 shadow-xl absolute right-1 top-1/2 transform -translate-y-1/2" />

                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                            <span className="text-muted-foreground">{current + 1} of {images.length}</span>
                        </div>
                    </>
                )}
            </Carousel>

            <DialogTitle className="sr-only">image view</DialogTitle>
            <DialogClose className="absolute top-4 right-4 text-white">
                <DialogOverlay className="min-w-screen h-screen fixed flex items-center justify-center" />
                <DialogContent className="min-w-screen h-screen fixed flex items-center justify-center hover:cursor-zoom-out" noCloseIcon>
                    <img
                        src={images[lightboxIndex]}
                        alt={alt}
                        className="object-contain"
                    />
                </DialogContent>
            </DialogClose>
        </Dialog>
    )
}