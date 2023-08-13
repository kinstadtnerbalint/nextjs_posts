'use client'

import { deleteComment } from "./comment"

type DeleteProps = {
    id: number
    slug: string
    userName: string
}


function dlt(key: number, slug: string, userName: string) {
    const yuh = confirm('Are you sure you want to delete this comment? This cannot be undone')
    if(yuh) deleteComment(key, slug, userName)
    window.location.replace(`/posts/${slug}`)
}

export function DeleteCommentBtn({ id, slug, userName }: DeleteProps) {
    'use client'
    return <>
        <button onClick={() => dlt(id, slug, userName)}
        className='border border-slate-300 text-slate-300 px-2 py-1 rounded-full hover:bg-slate-700 focus-within:bg-slate-700 outline-none ease-in-out transition-all ml-3'
        >Delete</button>
    </>
}