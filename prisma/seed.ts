import { PrismaClient } from '@prisma/client';

const db = new PrismaClient()

type Post = {
    title: string
    body: string
}

type Comment = {
    body: string
    postId: number
    user: {
        username: string
    }
}

function slugify(text: string) {
    return text
      .replace(/\s/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
      .toLowerCase()
}

async function getPosts() {
    const dummy = await fetch('https://dummyjson.com/posts')
    const { posts } = await dummy.json()
    return posts as Post[]
}

async function getComments() {
    const dummy = await fetch('https://dummyjson.com/comments')
    const { comments } = await dummy.json()
    return comments as Comment[]
}

async function main() {
    const posts = await getPosts()
    for (const post of posts) {
        await db.post.create({
            data: {
                title: post.title,
                body: post.body,
                slug: slugify(post.title),
                userName: 'unknown'
            }
        })
    }

    const comments = await getComments()
    for (const comment of comments) {
        await db.comment.create({
            data: {
                body: comment.body,
                postId: comment.postId,
                userName: comment.user.username
            }
        })
    
    }
}

main()