import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { redirect } from 'next/navigation'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         username: {
        //             label: "Username:",
        //             type: "text",
        //             placeholder: "Username"
        //         },
        //         password: {
        //             label: "Password:",
        //             type: "password",
        //             placeholder: "***********"
        //         }
        //     },
        //     async authorize(credentials) {
        //         const result = await prisma.user.findUnique({
        //             where: {
        //                 name: credentials?.username
        //             }
        //         })
        //         if(!result) throw new Error('No user found with these credentials!')

        //         const checkPassword = await compare(credentials!.password, result.password)

        //         if(!checkPassword || result.name !== result.name) throw new Error(`Username or Password doesn't match!`)
                
        //         const user = { id: String(result.id), username: result.name, password: result.password  }
        //         return user
        //     }
        // })
    ],
}