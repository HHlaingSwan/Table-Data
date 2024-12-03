import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                const { username, password } = credentials
                if (`username === ${username} && password === ${password}`) {
                    return {
                        id: 1,
                        name: username,
                        password: password
                    }
                }
                throw new Error('Invalid username or password')
            }
        }),
    ],
})