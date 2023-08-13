import { options } from "@/app/api/auth/[...nextauth]/options"
import { BackButton } from "@/components/backButton"
import { RefreshPage } from "@/components/refreshPage"
import Card from "@/components/userCard"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

type Props = {
    params: string
}

export default async function ProfilePage({ params }: Props) {
    const session = await getServerSession(options)
    if(!session) redirect('/')
    
    return <>
        <RefreshPage/>
        <BackButton/>
        <Card { ...{user: {
            name: session.user!.name,
            email: session.user!.email,
            image: session.user!.image,
        }} }/>
    </>
}