'use client'

import { useEffect, useState } from "react"
import { PostComp } from "./post"
import { Post } from "@prisma/client"
import { NavButtons } from "./navButton"
import { Loading } from "../loadingCircle"
import { redirect } from "next/navigation"
import { Search } from "../searchForm"

type Props = { 
    page: number
    maxBtn: number
}

export const Posts = ({ page, maxBtn }: Props) => {
    const [isLoading, setLoading] = useState(true)
    const [posts, setPosts] = useState<Post[]>()
    useEffect(() => {
        fetch(`http://localhost:3000/api/posts?page=${page}`)
        .then((res) => res.json())
        .then((data) => {
            setPosts(data)
            setLoading(false)
        })
    }, [])
    const pass = {
        page,
        maxBtn
    }
    if(isLoading) return <Loading/>
    if(!posts) return <h1>No posts on this page 😅</h1>
    return <>
        <main>
            <Search/>
            <ul>
                {posts?.map(post => (
                    <PostComp key={post.id} {...post} />
                ))}
            </ul>
            <NavButtons { ...pass }/>
        </main>
    </>
}
