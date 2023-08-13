import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { options } from "../api/auth/[...nextauth]/options"

export default async function Server() {
    const session = await getServerSession(options)
    if(session) redirect('/')
    redirect('/api/auth/signin')
}