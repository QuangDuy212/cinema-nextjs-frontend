import queryString from "query-string";
import slugify from "slugify";
// import groupBy from 'lodash/groupBy';
// import map from 'lodash/map';
import { grey, green, blue, red, orange } from '@ant-design/colors';

export const convertSlugUrl = (str: string) => {
    if (!str) return "";
    return slugify(str, {
        lower: true,
        locale: 'vi',
        remove: /[*+~.()'"!:@]/g
    })
}

export const convertYoutubeToHTML = (str: string | undefined) => {
    if (!str) return "";
    const tmp = str.split("v=") ?? [];
    const id = tmp[tmp.length - 1].toString();
    return `https://www.youtube.com/embed/${id}`;
}

export const sendRequest = async <T>(props: IRequest) => {
    let {
        url,
        method,
        body,
        queryParams = {},
        useCredentials = false,
        headers = {},
        nextOption = {}
    } = props;

    const options: any = {
        method: method,
        // by default setting the content-type to be json type
        headers: new Headers({ 'content-type': 'application/json', ...headers }),
        body: body ? JSON.stringify(body) : null,
        ...nextOption
    };
    if (useCredentials) options.credentials = "include";

    if (queryParams) {
        url = `${url}?${queryString.stringify(queryParams)}`;
    }

    return fetch(url, options).then(res => {
        if (res.ok) {
            return res.json() as T;
        } else {
            return res.json().then(function (json) {
                // to be able to access error status when you catch the error 
                return {
                    statusCode: res.status,
                    message: json?.message ?? "",
                    error: json?.error ?? ""
                } as T;
            });
        }
    });
};

export const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

// export const groupByPermission = (data: any[]): { module: string; permissions: IPermission[] }[] => {
//     const groupedData = groupBy(data, x => x.module);
//     return map(groupedData, (value, key) => {
//         return { module: key, permissions: value as IPermission[] };
//     });
// };

export function colorMethod(method: "POST" | "PUT" | "GET" | "DELETE" | string) {
    switch (method) {
        case "POST":
            return green[6]
        case "PUT":
            return orange[6]
        case "GET":
            return blue[6]
        case "DELETE":
            return red[6]
        default:
            return grey[10];
    }
}

export const limitText = (text: string, count: number) => {
    return text.slice(0, count) + (text.length > count ? "..." : "");
}
