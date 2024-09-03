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
        name: String,
        director: String,
        image: String,
        performer: String,
        premiere: String,
        shortDesc: String,
        trailer: String,
        createdAt: Date,
        createdBy: String,
        updatedAt: Date,
        updatedBy: String,
        contentModeration: String,
        duration: number,
        origin: String,
        shows: [
            {
                id: number
                zoomNumber: number,
                time: String,
                price: number,
                active: true
            }
        ]
        category: {
            id: number,
            name: String
        }
    }

    interface ITime {
        id: number,
        date: String,
        films: IFilm[]
    }
}