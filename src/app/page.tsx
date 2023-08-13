import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options"
import { formatDate, getDate } from "@/util"
import { prisma } from "@/db"
import { PostComp } from "@/components/post/post"
import { Post } from "@prisma/client"

async function getNewPosts() {
    return await prisma.post.findMany({
        where: {
            createdAt: {
                gte: new Date(getDate()),
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 15
    })
}

export default async function Home() {

    const session = await getServerSession(options)

    const newPosts = await getNewPosts()

    return <>
        <main>
            {session ? <>
                {newPosts.length === 0 || typeof newPosts === 'undefined'
                    ? <h1 className='ml-12 text-lg'>No new posts today</h1>
                    : <main >
                        <h1 className="my-12">15 Newest Posts - {formatDate(new Date())}</h1>
                        <ul className="ml-8">
                            {newPosts?.map((post: Post) => (
                                <PostComp key={post.id} {...post} />
                            ))}
                        </ul>
                    </main>
                }
            </>
                : <>
                    <h1 className="text-5xl">Login or Create an Account, to see the contents of this website</h1>
                </>}
        </main>
    </>

}