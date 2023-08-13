import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { searchParams } = req.nextUrl
    const page = searchParams.get('page')
    if(page) {
        const response = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 10,
            skip: Number(page) * 15,
        })
        return NextResponse.json(response)
    }
    const user = searchParams.get('user')
    if(user) {
        const response = await prisma.post.findMany({
            where: {
                userName: user
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 10,
        })
        return NextResponse.json(response)
    }
    const search = searchParams.get('search')
    if(search) {
        const response = await prisma.post.findMany({
            where: {
                title: {
                    contains: search
                }
            },
            orderBy: {
                createdAt: "desc"
            },
        })
        return NextResponse.json(response)
    }
}
