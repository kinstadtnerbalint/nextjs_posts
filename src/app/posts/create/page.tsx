import { options } from "@/app/api/auth/[...nextauth]/options";
import { BackButton } from "@/components/backButton";
import { RefreshPage } from "@/components/refreshPage";
import { prisma } from "@/db";
import { slugify } from "@/util";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function createPost(data: FormData) {
    'use server'

    const title = data.get('title')
    const body = data.get('body')
    const username = data.get('username')

    if(typeof body !== "string" || body.length === 0) throw new Error("Invalid body 😎")
    if(typeof title !== "string" || title.length === 0) throw new Error("Invalid title 🧙‍♂️")

    const valid = await prisma.post.findUnique({
        where: {
            title
        }
    })

    if(valid) throw new Error("Post already exists  ㅠㅠ")

    await prisma.post.create({
        data: {
            title: title,
            body: body,
            slug: slugify(title),
            userName: username as string,
        }
    })
    redirect('/posts/browse')
}

export default async function Page() {
    'use server'
    const session = await getServerSession(options)

    return <>
        <RefreshPage/>
        <BackButton/>
        <section>
            <form action={createPost} className="block text-center my-4">
                <input type="hidden" name="username" id="username" value={session?.user?.name as string} />
                <label htmlFor="title" className=" text-slate-200 text-lg font-bold mb-2">
                    Create Post
                </label>
                <div className="mt-6">
                    <input type="text" name="title" id="title" placeholder="title"
                    className="create-post-input"
                    />
                </div>
                <div>
                    <label htmlFor="body" className=" text-slate-200 text-sm font-bold mb-2">
                    </label>
                    <input type="text" name="body" id="body" placeholder="body" 
                    className="create-post-input "
                    />
                </div>
                <button type="submit" className='default-btn'> Create</button>
            </form>
        </section>
    </>
}