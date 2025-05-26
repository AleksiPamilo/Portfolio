import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

const authOptions: NextAuthOptions = {
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email
                const pass = credentials?.password
                if (!email || !pass) return null

                if (email !== process.env.ADMIN_EMAIL) return null
                const valid = await compare(pass, process.env.ADMIN_PASSWORD_HASH!)
                if (!valid) return null

                return { id: email, email }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) token.email = user.email
            return token
        },
        async session({ session, token }) {
            session.user = { name: token.email, email: token.email }
            return session
        },
    },

    pages: {
        signIn: "/login",
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }