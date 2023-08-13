import { prisma } from "@/db"
import { formatDate, hourMinute } from "@/util"
import { Comment } from "@prisma/client"
import { redirect } from "next/navigation"
import { PostComment } from "@/components/post/comment";
import { RefreshPage } from "@/components/refreshPage";
import { Session, getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { BackButton } from "@/components/backButton";

type Params = {
    params: {
        slug: string
    }

}

let session: Session | null

class PassOn {
    comment: Comment
    slug: string
    
    constructor(comment: Comment, slug: string) {
        this.comment = comment
        this.slug = slug
    }
}

async function deletePost(data: FormData) {
    "use server"
    const id = data.get('delete_id')?.valueOf() as number
    await prisma.post.delete({
        where: {
            id: Number(id),
        }
    }) 
    redirect('/posts/browse')
}

async function createComment(data: FormData) {
    'use server'

    const body = data.get('new_comment')?.valueOf()
    if(typeof body !== "string" || body.length === 0) throw new Error("Invalid comment 😎")

    const postId = data.get('post_id')?.valueOf() as number

    if(session !== null && typeof session !== 'undefined') {
        await prisma.comment.create({
            data: {
                body: body,
                userName: session.user === null ? 'unknown': session.user!.name as string,
                postId: Number(postId),
            }
        })
    
        const slug = data.get('post_slug')?.valueOf() as string
        redirect(`/posts/${slug}`)
    }
}

export default async function PostPage({ params:{ slug } }: Params) {
    'use server'

    session = await getServerSession(options)

    const post = await prisma.post.findFirst({
        where: {
            slug: slug
        }
    })
    if(post === null) redirect('/posts')

    const comments = await prisma.comment.findMany({
        where: {
            postId: post!.id
        }
    })

    return <>
        <RefreshPage/>
        <BackButton/>

        {post.userName === session?.user?.name ? 
            <form action={deletePost} >
                <input type="hidden" name="delete_id" id="delete_id" value={post.id} />
                <button type="submit" 
                className="border mb-6 border-slate-300 text-slate-300 px-2 py-1 rounded-full hover:text-red-700 hover:border-red-800 hover:bg-slate-950 focus-within:bg-slate-950 delay-75 outline-none ease-in-out transition-all "
                >Delete Post</button>
            </form>
             : null
        }

        <section className="mx-24">
            <h1 className="cursor-default text-4xl font-bold text-slate-200">{post?.title}</h1>
            
            <p className="text-lg ml-2 text-slate-400">{`created-/ updated at >> ${formatDate(post!.updatedAt)}, ${hourMinute(post!.updatedAt)}`}
            <br></br>
            {`by: ${post.userName == null ? `'unknown'` : post.userName}`}</p>

            <p className="my-16 ml-1 text-xl text-slate-200">{`${post!.body}`}</p>
        </section>
        <div className="block mt-24 mb-12 items-center">
            <h1 className="text-xl mr-6 text-slate-200 ">Comments</h1>
            <form action={createComment}>
                <input type="hidden" name="post_slug" id="post_slug" value={post.slug} />
                <input type="hidden" id="post_id" name="post_id" value={post.id}/>
                <input type="text" name="new_comment" id="new_comment"
                className="create-post-input"/>
                <button type="submit" className='default-btn ml-2'>Send</button>
            </form> 
        </div>
        <div>
            {comments.length == 0 ? <p className="text-xl my-24">No comments yet</p> 
            : <ul>
                {comments.map(comment =>(
                    <PostComment key={comment.id}  {...new PassOn(comment, slug)}/>  
                ))}    
            </ul>}
            
        </div>
    </>    
}

