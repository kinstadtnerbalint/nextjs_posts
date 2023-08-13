import { Posts } from "@/components/post/postListDivided";
import { RefreshPage } from "@/components/refreshPage";
import { postCount } from "@/db";
import { redirect } from "next/navigation";

type Params = {
    params: {
        page: string
    }
}

export default async function BrowsePage({ params }: Params) {
    const maxBTNS = Math.ceil(await postCount / 15) -1
    if(Number(params.page) > maxBTNS) redirect('/posts/page/0')

    const passProps = {
        page: Number(params.page),
        maxBtn: maxBTNS,
    }
    return (
        <>
            <RefreshPage/>
            <Posts {...passProps}/>
        </>
    )
}