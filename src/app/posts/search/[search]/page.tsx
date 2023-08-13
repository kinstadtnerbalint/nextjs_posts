'use client'
import { BackButton } from "@/components/backButton";
import { Loading } from "@/components/loadingCircle";
import { PostComp } from "@/components/post/post";
import { RefreshPage } from "@/components/refreshPage";
import { Search } from "@/components/searchForm";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";

type Params = {
    params: {
        search: string[]
        
    }
}

export default function SearchPage({ params }: Params) {
    const [posts, setPosts] = useState<Post[]>()
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:3000/api/posts?search=${params.search}`)
        .then((res) => res.json())
        .then((data) => {
            setPosts(data)
            setLoading(false)
        })
    }, [])
    if(isLoading) return <Loading/>
    return <>
        <RefreshPage/>
        <BackButton/>
        <main>
            <Search/>
            { posts?.length === 0 ? <h1 className="mt-12 text-2xl text-slate-200">No posts found</h1>
                : <ul>
                {posts?.map(post => 
                    <PostComp key={post.id} {...post}/>)}
                </ul>
            }
            
        </main>
    </>
}