export function formatDate(date: string) {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getFullYear()}`;
}

export function formatTime(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};