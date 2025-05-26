import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"

export const config = {
    api: {
        bodyParser: false,
    },
}

export async function POST(req: NextRequest) {
    const unauthorized = await requireAuth(req)
    if (unauthorized) return unauthorized

    const remoteRes = await fetch(
        `${process.env.API_URL}/upload`,
        {
            method: "POST",
            headers: {
                "Content-Type": req.headers.get("content-type")!,
                "x-api-key": process.env.API_URL_KEY!,
            },
            body: req.body,
            duplex: "half",
            // eslint-disable-next-line
        } as any
    )

    if (!remoteRes.ok) {
        const text = await remoteRes.text()
        console.error("Upload proxy error:", remoteRes.status, text)
        return NextResponse.json(
            { error: `Upload failed (${remoteRes.status})` },
            { status: 502 }
        )
    }

    const contentType = remoteRes.headers.get("content-type") || ""
    if (contentType.includes("application/json")) {
        try {
            const data = await remoteRes.json()
            return NextResponse.json(data, { status: remoteRes.status })
        } catch (err) {
            console.error("Failed to parse JSON from upload:", err)
            const text = await remoteRes.text()
            return NextResponse.json(
                { error: "Invalid JSON from upload service", details: text },
                { status: 502 }
            )
        }
    } else {
        const text = await remoteRes.text()
        console.error("Unexpected content-type from upload:", contentType, text)
        return NextResponse.json(
            { error: "Unexpected response from upload service", details: text },
            { status: 502 }
        )
    }
}

export async function DELETE(req: NextRequest) {
    const unauthorized = await requireAuth(req)
    if (unauthorized) return unauthorized

    const url = new URL(req.url)
    const filename = url.searchParams.get("filename")

    if (!filename) {
        return NextResponse.json({ error: "Filename is required" }, { status: 400 })
    }

    try {
        const apiUrl = `${process.env.API_URL}/upload/${filename}`
        const res = await fetch(apiUrl, {
            method: "DELETE",
            headers: { "x-api-key": process.env.API_URL_KEY! }
        })

        const body = await res.json().catch(() => ({}))
        return NextResponse.json(body, { status: res.status })
    } catch (err) {
        console.error("Upload delete fetch failed:", err)
        return NextResponse.json(
            { error: "Could not reach image service" },
            { status: 502 }
        )
    }
}