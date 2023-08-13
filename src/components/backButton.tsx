'use client'

import { useRouter } from "next/navigation"

export const BackButton = () => {
    const router = useRouter()

    return <div className="mb-12">
        <a onClick={() => router.back()} className='default-btn cursor-pointer'>Back</a>
    </div>
}