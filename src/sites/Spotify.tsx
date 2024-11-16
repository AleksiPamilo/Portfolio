import React, { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import { formatTime } from "../utils/format";

const debounce = (fn: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};

const Spotify: React.FC = () => {
    const [nowPlaying, setNowPlaying] = useState<{
        name: string;
        artists: string;
        duration: number;
        progress: number;
        url: string;
        isPlaying: boolean;
        thumbnail: { height: number; url: string; width: number };
    } | null>(null);

    const [progress, setProgress] = useState<number>(0);

    const fetchNowPlaying = async () => {
        try {
            const response = await fetch("https://api.aleksipamilo.dev/spotify");
            const data = await response.json();
            if (data.code === 200) {
                setNowPlaying(data.currentlyPlaying);
                setProgress(data?.currentlyPlaying?.progress || 0);
            }
        } catch (error) {
            console.error("Failed to fetch Spotify data:", error);
        }
    };

    useEffect(() => {
        fetchNowPlaying();

        const interval = setInterval(fetchNowPlaying, 10000);
        return () => clearInterval(interval);
    }, []);

    const debouncedUpdateProgress = debounce(() => {
        if (nowPlaying) {
            setProgress((prevProgress) => Math.min(prevProgress + 1000, nowPlaying.duration));
        }
    }, 500);

    useEffect(() => {
        if (nowPlaying && nowPlaying.isPlaying) {
            const interval = setInterval(debouncedUpdateProgress, 1000);

            return () => clearInterval(interval);
        }
    }, [nowPlaying, debouncedUpdateProgress]);

    useEffect(() => {
        if (nowPlaying) {
            const remainingTime = nowPlaying.duration - progress;

            if (remainingTime > 0 && nowPlaying.isPlaying) {
                const timeout = setTimeout(() => {
                    fetchNowPlaying();
                }, remainingTime);

                return () => clearTimeout(timeout);
            } else if (remainingTime <= 0) {
                fetchNowPlaying();
            }
        }
    }, [nowPlaying, progress]);

    if (!nowPlaying) {
        return (
            <main className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-full h-full flex flex-col gap-2 self-end">
                    Currently not listening.
                    <div className="space-x-2">
                        <button
                            onClick={fetchNowPlaying}
                            className="mt-4 text-center text-white bg-blue-500 font-semibold py-2 px-4 shadow-md rounded-sm hover:bg-blue-600 transition-all">
                            Retry
                        </button>
                        <a
                            href="/"
                            className="text-center text-white font-semibold py-2 px-8 shadow-md rounded-sm border border-emerald-300 hover:bg-emerald-400 transition-all ease-in-out duration-700">
                            Go Home!
                        </a>
                    </div>
                </div>
            </main>
        );
    }

    const { name, artists, duration, url, isPlaying, thumbnail } = nowPlaying;

    return (
        <main className="absolute flex flex-col md:flex-row gap-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-full">
                <img className="w-full h-full rounded-md object-cover" src={thumbnail.url} alt="thumbnail" />
            </div>
            <div className="w-full h-full self-end">
                <div className="w-full flex flex-col gap-4">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-xl md:text-5xl text-blue-500 hover:underline font-yellowtail">
                        {name}
                    </a>
                    <span>{artists}</span>
                    <ProgressBar progress={Math.round((progress / duration) * 100)} />
                </div>
                <div className="flex justify-between w-full text-xl text-gray-600">
                    <span>{formatTime(progress)}</span>
                    {!isPlaying && "Paused"}
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </main>
    );
};

export default Spotify;
