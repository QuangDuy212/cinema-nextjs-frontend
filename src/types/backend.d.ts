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
        shortDesc: string | undefined,
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

    interface IAccount {
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: {
                id: string;
                name: string;
                permissions: {
                    id: string;
                    name: string;
                    apiPath: string;
                    method: string;
                    module: string;
                }[]
            }
        }
    }

    interface IUser {
        "id": number,
        "email": string;
        "fullName": string;
        "phone": string;
        "address": string;
        "createdAt": string;
        "updatedAt": string;
        "createdBy": string;
        "udpatedBy": string;
        "role": {
            "id": number;
            "name": string;
        }
    }

    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface ISeat {
        id: number;
        name: string;
    }

    interface IBill {
        total: number;
        quantity: number;
        status: string;
    }

    interface IHistory {
        "id": number;
        "total": number;
        "quantity": number;
        "status": string;
        "user": {
            "email": string;
        },
        "nameFilm": string;
        "seats": {
            "id": number;
            "name": string;
        }[]
        ,
        "createdAt": string;
        "updatedAt": string;
        "createdBy": string;
        "updatedBy": string;
    }

    interface IReqRegister {
        fullName: string;
        email: string;
        password: string;
        address: string;
        phone: string;
    }

    export interface IPermission {
        id?: string;
        name?: string;
        apiPath?: string;
        method?: string;
        module?: string;
        createdBy?: string;
        isDeleted?: boolean;
        deletedAt?: boolean | null;
        createdAt?: string;
        updatedAt?: string;

    }

}