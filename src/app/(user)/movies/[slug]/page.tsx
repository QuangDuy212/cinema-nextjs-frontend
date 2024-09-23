
import DetailFilm from "src/components/user/movies/detail.film.page";
import { callFetchFilmById } from "src/util/api";
import { sendRequest } from "src/util/method";
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug;
    const name = slug.split("-");
    const id = name[name.length - 1].split(".");
    // fetch data
    const film = await sendRequest<IBackendRes<IFilm>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/films/${id[0]}`,
        method: "GET",
    });
    console.log(">>> check film", film)
    return {
        title: film?.data?.name ?? "Film page",
    }
}
const DetailFilmPage = async ({ params }: { params: { slug: string } }) => {
    const temp = params?.slug?.split(".html") ?? [];
    const temp1 = (temp[0]?.split("-") ?? []) as string[];
    const id = temp1[temp1.length - 1].toString();
    const data = await sendRequest<IBackendRes<IFilm>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/films/${id}`,
        method: "GET",
    });
    return (
        <>
            <DetailFilm id={id} />
        </>
    )
}

export default DetailFilmPage;