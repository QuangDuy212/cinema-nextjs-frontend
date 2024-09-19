import DetailFilm from "src/components/user/movies/detail.film.page";
import { callFetchFilmById } from "src/util/api";
import { sendRequest } from "src/util/method";


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