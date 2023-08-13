'use server'
import { formatDate, hourMinute } from "@/util"
import { prisma } from "@/db";
import { Comment } from '@prisma/client';

import { DeleteCommentBtn } from "./delete_comment";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

type CommentProp = {
    comment: Comment
    slug: string
}

export async function deleteComment(id: number, slug: string, userName: string) {

    const comment = await prisma.comment.findUnique({
        where: {
            id,
            userName
        }
    })

    if(comment !== null) await prisma.comment.delete({
        where: {...comment}
    })
}

export async function PostComment({ comment: { body, id, userName, postId, createdAt, updatedAt }, slug }: CommentProp) {
    'use server'
    const session = await getServerSession(options)

    const spread = {
        id: id,
        slug: slug,
        userName: userName,
    }
    return <li>
        <section className="items-center mb-12">
            <div className="flex text-center items-center">
                <p className="mr-2 ">{`∎`}</p>
                <p className="italic mr-3">{`${userName}`}</p>
                <p className=" text-slate-400">{`(${formatDate(createdAt)}, ${hourMinute(createdAt)})`}</p>
                {userName === session?.user?.name ? <>
                    <DeleteCommentBtn  {...spread}/>
                </> : null}
            </div>
            <p className="ml-28 text-lg text-slate-200 overflow-y-auto"
            >{`${body}`}</p>
        </section>

    </li>
}