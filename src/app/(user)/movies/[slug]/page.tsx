import DetailFilm from "src/components/movies/detail.film.page";
import { callFetchFilmById } from "src/util/api";


const DetailFilmPage = async ({ params }: { params: { slug: string } }) => {
    const temp = params?.slug?.split(".html") ?? [];
    const temp1 = (temp[0]?.split("-") ?? []) as string[];
    const id = temp1[temp1.length - 1].toString();
    const data = await callFetchFilmById(id);
    return (
        <>
            <DetailFilm data={data?.data?.data} />
        </>
    )
}

export default DetailFilmPage;