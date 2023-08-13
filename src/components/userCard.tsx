'use client'
import Image from "next/image"
import { useEffect, useState } from "react";
import { PostComp } from "./post/post";
import { Loading } from "./loadingCircle";
import { Post } from "@prisma/client";

type User = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
} | undefined

type Props = {
    user: User,
}

export default function Card({ user }: Props) {
    const [isLoading, setLoading] = useState(true)
    const [posts, setPosts] = useState<Post[]>()
    useEffect(() => {
        fetch(`http://localhost:3000/api/posts?user=${user?.name}`)
        .then((res) => res.json())
        .then((data) => {
            setPosts(data)
            setLoading(false)
        })
    }, [])
    const emailDisplay = user?.email ? (
        <div className="flex text-center flex-col items-center p-6 rounded-lg font-bold text-4xl text-slate-300 ">
            <h1 className="mb-6">{user?.email}</h1>
            <h1>{user.name}</h1>
        </div>
    ) : null

    const userImage = user?.image ? (
        <Image
            className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
            src={user?.image}
            width={200}
            height={200}
            alt={user?.name ?? "Profile Pic"}
            priority={true}
        />
    ) : null
    if(isLoading) return <Loading/>
    return (
        <section className="flex flex-col gap-4">
            {userImage}
            {emailDisplay}
            <div className="mt-12 flex flex-col gap-4">
                <h1 className="text-xl">Newest posts</h1>
                <ul>
                    {posts?.map(post => (
                        <PostComp key={post.id} {...post} />
                    ))}
                </ul>
            </div>
        </section>
    )
}