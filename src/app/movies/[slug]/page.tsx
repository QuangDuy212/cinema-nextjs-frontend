
import DetailFilm from "src/components/user/movies/detail.film.page";
import { callFetchFilmById } from "src/util/api";
import { convertSlugUrl, sendRequest } from "src/util/method";
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
    const films = await sendRequest<IBackendRes<IModelPaginate<IFilm>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/films?page=1&size=1000`,
        method: "GET",
        nextOption: {
            cache: "no-store",
            // next: { tags: ['track-by-profile'] }
        }
    });

    // return films?.data?.result?.map((film) => ({
    //     slug: `${convertSlugUrl(film.name)}-${film.id}.html`,
    // }))
    return [
        { slug: "bao-thu-di-tim-chu-k-long-tieng-2.html" }
    ]
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
        nextOption: {
            cache: "no-store",
            // next: { tags: ['track-by-profile'] }
        }
    });
    return {
        title: film?.data?.name ?? "Film page",
        openGraph: {
            type: "website",
            title: film?.data?.name ?? "Trung tâm chiếu phim quốc gia",
            images: [`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/film/${film?.data?.image}`]
        },
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