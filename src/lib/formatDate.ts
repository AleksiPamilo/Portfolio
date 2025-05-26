export function formatDuration(
    startIso: string,
    endIso?: string
): string {
    const opts: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
    }

    const start = new Date(startIso)
    const end = endIso ? new Date(endIso) : null

    const f = (d: Date) => d.toLocaleDateString("en-US", opts)

    return end
        ? `${f(start)} — ${f(end)}`
        : `Since ${f(start)} (ongoing)`
}