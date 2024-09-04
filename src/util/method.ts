import slugify from "slugify";

export const convertSlugUrl = (str: string) => {
    if (!str) return "";
    return slugify(str, {
        lower: true,
        locale: 'vi',
        remove: /[*+~.()'"!:@]/g
    })
}

export const convertYoutubeToHTML = (str: string) => {
    if (!str) return "";
    const tmp = str.split("v=") ?? [];
    const id = tmp[tmp.length - 1].toString();
    return `https://www.youtube.com/embed/${id}`;
}