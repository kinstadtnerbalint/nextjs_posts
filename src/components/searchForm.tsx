import { redirect } from "next/navigation"

const handleSearch = (data: FormData) => {
    const search = data.get('search')
    if(search) redirect(`/posts/search/${search}`)
}

export const Search = () => {
    return <form action={handleSearch} className="flex gap-3 mb-6">
        <input 
        className="bg-slate-600 text-slate-200 placeholder-slate-200 rounded-full p-2 outline-1 outline"
        type="text" name="search" id="search" placeholder="Search"/>
        <button className="default-btn" type="submit">Search</button>
    </form>
}