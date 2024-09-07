export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }
    interface IFilm {
        id: number,
        name: string,
        director: string,
        image: string,
        performer: string,
        premiere: string,
        shortDesc: string,
        trailer: string,
        createdAt: Date,
        createdBy: string,
        updatedAt: Date,
        updatedBy: string,
        contentModeration: string,
        duration: number,
        origin: string,
        shows: [
            {
                id: number
                zoomNumber: number,
                time: string,
                price: number,
                active: true,
                day: { id: number, date: string }
            }
        ]
        category: {
            id: number,
            name: string
        },
        times: [
            {
                id: number,
                date: string,
            }
        ]
    }

    interface ITime {
        id: number,
        date: string,
        films: IFilm[]
    }

    interface IShow {
        "id": number;
        "zoomNumber": number;
        "price": number;
        "time": string;
        "day": {
            "id": number;
            "date": string;
        }
    }
}