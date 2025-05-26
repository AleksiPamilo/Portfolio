"use client"

import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import ContactDialog from "../ContactDialog";

export default function MainSection() {
    return (
        <section id="main" className="w-screen h-screen relative flex flex-col items-center justify-center py-20 px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Hello! I&apos;m <span className="text-green-400">Aleksi Pamilo</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg md:text-xl mb-6">
                Currently pursuing a Bachelor&apos;s in Information Technology and Business
                Administration (ITBBA), with a solid grounding in both business and
                computing. I am passionate about web development, particularly React,
                Next.js, and TypeScript, and I continually expand my skill set.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Button
                    size="lg"
                    className="max-md:w-full"
                    onClick={() => {
                        const nextSection = document.getElementById("projects");
                        nextSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    View My Work
                </Button>

                <ContactDialog />
            </div>
            <div className="w-full absolute bottom-8 transform left-1/2 -translate-x-1/2 text-center">
                <Button
                    variant="ghost"
                    className="animate-bounce duration-1000"
                    onClick={() => {
                        const nextSection = document.getElementById("projects");
                        nextSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    <ArrowDown />
                </Button>
            </div>
        </section>
    )
}