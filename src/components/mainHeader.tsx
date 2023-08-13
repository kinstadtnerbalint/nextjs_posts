import { options } from '@/app/api/auth/[...nextauth]/options'
import '@/app/globals.css'
import { getServerSession } from 'next-auth'

export async function MainHeader() {
    const session = await getServerSession(options)

    return <>
        <nav className='bg-blue-800 text-center -mt-4 mb-2'>
                <p>NextJS post site 🧙‍♂️</p>
        </nav>
        <header className='justify-between items-center flex mb-24 mt-5 overflow-auto '>
        
        <div>
            <h1 className='text-3xl hover:text-red-800 cursor-pointer delay-50 ease-in-out transition-all'><a href="/">Home Page</a></h1>
        </div>
        <div className="flex gap-3">
            <a role="button" href="/posts/page/0" className="default-btn">Browse older posts</a>
            <a role="button" href="/posts/create" className="default-btn">Create</a>
        </div>
        <div className='flex gap-4'>
            {session? <>
                <a role="button" href='/api/auth/signout' className="default-btn">Logout</a>
                <a role="button" href="/profile/me" className="default-btn">Profile</a>
                </> : <>
                <a role="button" href="/api/auth/signin" className="default-btn">Login</a>
            </>}
        </div>
    </header> 
    </> 
}