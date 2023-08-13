import dateFormat from 'dateformat'

type PostProp = {
    id: number
    title: string
    body: string
    slug: string
    createdAt: Date
    updatedAt: Date
    userName: string
}

export function PostComp({ id, title, body, slug, createdAt, updatedAt, userName }: PostProp) {
    return <li>
        <div className="flex gap-2 mb-4 items-center text-center align-middle">
            <p className="ml-1 my-2">
                {`∎`}
                <a className="text-blue-300 hover:text-red-600 cursor-pointer delay-50 ease-in-out transition-all"
                href={`/posts/${slug}`}>{` ${title}`}</a>
            </p>
            <p>
                {`> by: ${userName == null ? `'unknown'` : userName}`}
            </p>
            <p>{`> ${dateFormat(createdAt, 'mmmm dS, h:MM TT, yyyy,')}`}</p>
        </div>
    </li>
}