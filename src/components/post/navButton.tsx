'use client'

import { redirect, useRouter } from "next/navigation"

type Props = {
    page: number
    maxBtn: number
}

export const NavButtons = ({ page, maxBtn }: Props) => {
    const router = useRouter()
    if(page === 0)
        return (
            <footer className="mt-24 flex gap-3 justify-center text-center items-center align-middle">
                <p>{page}</p>
                <button className="nav-btn" onClick={() => router.push(`/posts/page/${page +1}`)}>{`>`}</button>
            </footer>
        )
    else if(page === maxBtn)
        return (
            <footer className="mt-24 flex gap-3 justify-center text-center items-center align-middle">
                <button className="nav-btn" onClick={() => router.push(`/posts/page/${page -1}`)}>{`<`}</button>
                <p>{page}</p>
            </footer>
        )
    else return (
        <footer className="mt-24 flex gap-3 justify-center text-center items-center align-middle">
            <button className="nav-btn" onClick={() => router.push(`/posts/page/${page -1}`)}>{`<`}</button>
            <p>{page}</p>
            <button className="nav-btn" onClick={() => router.push(`/posts/page/${page +1}`)}>{`>`}</button>
        </footer>
    )
}