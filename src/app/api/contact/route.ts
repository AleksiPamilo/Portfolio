import { NextResponse } from "next/server"

const MAX_LENGTH = {
    name: 50,
    email: 100,
    title: 100,
    content: 1000,
}

export async function POST(request: Request) {
    try {
        const { name, email, title, message } = await request.json()
        if (!name || !title || !message) {
            return NextResponse.json(
                { message: "Missing required fields: name, title, and message are required." },
                { status: 400 }
            )
        }

        if (name.length > MAX_LENGTH.name) {
            return NextResponse.json(
                { message: `Name must be at most ${MAX_LENGTH.name} characters.` },
                { status: 400 }
            )
        }
        if (title.length > MAX_LENGTH.title) {
            return NextResponse.json(
                { message: `Title must be at most ${MAX_LENGTH.title} characters.` },
                { status: 400 }
            )
        }
        if (message.length > MAX_LENGTH.content) {
            return NextResponse.json(
                { message: `Message must be at most ${MAX_LENGTH.content} characters.` },
                { status: 400 }
            )
        }

        const API_URL = process.env.API_URL
        const API_KEY = process.env.EMAIL_API_KEY
        if (!API_URL) {
            return NextResponse.json(
                { message: "External contact API URL is not configured." },
                { status: 500 }
            )
        }
        if (!API_KEY) {
            return NextResponse.json(
                { message: "Email API key is not configured." },
                { status: 500 }
            )
        }

        const externalRes = await fetch(`${API_URL}/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify({
                name,
                email,
                title,
                content: message,
            }),
        })

        const externalData = await externalRes.json().catch(() => ({}))

        if (!externalRes.ok) {
            return NextResponse.json(
                { message: externalData.message || "External API error." },
                { status: externalRes.status }
            )
        }

        return NextResponse.json(
            { message: externalData.message || "Message sent successfully." },
            { status: 200 }
        )
    } catch (error) {
        console.error("/api/contact error:", error)
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        )
    }
}
