import axios from "src/config/axios-customize";

// import axios from "axios";


/**
 * Module Auth
 */
export const callLogin = (username: string | undefined, password: string | undefined) => {
    return axios.post("/api/v1/auth/login", { username, password });
}

export const callLogout = () => {
    return axios.post("/api/v1/auth/logout");
}

export const callRegister = (data: IReqRegister) => {
    return axios.post("/api/v1/auth/register", data);
}

export const callFetchAccount = () => {
    return axios.get("/api/v1/auth/account");
}

export const callRefreshToken = () => {
    return axios.get("/api/v1/auth/refresh");
}

/**
 * Module FILM
 */
export const callFetchAllFilms = (query: string) => {
    return axios.get(`/api/v1/films${query}`);
}

export const callFetchFilmById = (id: String) => {
    return axios.get(`/api/v1/films/${id}`);
};

export const callCreateFilm = (film: IFilmReqCreate) => {
    return axios.post(`/api/v1/films`, film);
}
export const callUpdateFilm = (film: IFilmReqUpdate) => {
    return axios.put(`/api/v1/films`, film);
}

export const callDeleteFilmById = (id: number) => {
    return axios.delete(`/api/v1/films/${id}`);
}


/**
 * Module CATEGORY
 */

export const callFetchAllCategories = (query: string) => {
    return axios.get(`/api/v1/categories${query}`);
}

export const callFetchCategoryById = (id: number) => {
    return axios.get(`/api/v1/categories/${id}`);
}

export const callCreateCategory = (name: string) => {
    return axios.post("/api/v1/categories", { name: name });
}

export const callUpdateCategory = (id: number, name: string) => {
    return axios.put("/api/v1/categories", { id: id, name: name });
}

export const callDeleteCategoryById = (id: number) => {
    return axios.delete(`/api/v1/categories/${id}`);
}

/**
 * Module TIME
 */
export const callFetchAllTimes = (query: string) => {
    return axios.get(`/api/v1/times${query}`);
}

export const callFetchTimeById = (id: number) => {
    return axios.get(`/api/v1/times/${id}`);
}

export const callCreateTime = (data: { date: string }) => {
    return axios.post(`/api/v1/times`, data);
}

export const callUpdateTime = (data: { id: number, date: string, active: boolean }) => {
    return axios.put(`/api/v1/times`, data);
}

export const callDeleteTimeById = (id: number) => {
    return axios.delete(`/api/v1/times/${id}`);
}

/**
 * Module SHOW
 */
export const callFetchShowsByFilmAndDay = (filmId: number, dayId: number) => {
    return axios.get("/api/v1/shows/by-film-day",
        {
            params:
                { film: filmId, day: dayId }
        }
    )
}

export const callFetchAllShows = (query: string) => {
    return axios.get(`/api/v1/shows${query}`);
}

export const callFetchShowById = (id: number) => {
    return axios.get(`/api/v1/shows/${id}`);
}

export const callCreateShow = (data: {
    "zoomNumber": number;
    "time": string;
    "active": boolean;
    "price": number;
    "day": { "id": number };
    "film": { "id": number }
}) => {
    return axios.post(`/api/v1/shows`, data);
}

export const callUpdateShow = (data: {
    "id": number;
    "zoomNumber": number;
    "time": string;
    "active": boolean;
    "price": number;
    "day": { "id": number };
    "film": { "id": number }
}) => {
    return axios.put(`/api/v1/shows`, data);
}

export const callDeleteShow = (id: number) => {
    return axios.delete(`/api/v1/shows${id}`);
}


/**
 * Module USER
 */

export const callUpdateUser = (data: {
    id?: number | undefined,
    fullName?: string | undefined,
    phone?: string | undefined,
    address?: string | undefined,
    active?: boolean;
    role?: { id: number }
}
) => {
    return axios.put("/api/v1/users", data)
}

export const callCreateUser = (email: string, fullName: string, phone: string, password: string, address: string) => {
    return axios.post("/api/v1/users", { email, fullName, phone, password, address });
}

export const callDeleteUser = (id: number) => {
    return axios.delete(`/api/v1/users/${id}`);
}

export const callFetchAllUsers = (query: string) => {
    return axios.get(`/api/v1/users${query}`);
}

export const callFetchUserById = (id: number) => {
    return axios.get(`/api/v1/users/${id}`);
}



/**
 * Module PERMISSION
 */

export const callCreatePermission = (permission: IPermission) => {
    return axios.post('/api/v1/permissions', { ...permission })
}

export const callUpdatePermission = (permission: IPermission, id: number) => {
    return axios.put(`/api/v1/permissions`, { id, ...permission })
}

export const callDeletePermission = (id: number) => {
    return axios.delete(`/api/v1/permissions/${id}`);
}

export const callFetchAllPermissions = (query: string) => {
    return axios.get(`/api/v1/permissions?${query}`);
}

export const callFetchPermissionById = (id: number) => {
    return axios.get(`/api/v1/permissions/${id}`);
}

/**
 * Module SEATNAME
 */

export const callFetchAllSeatName = (page: number, size: number) => {
    return axios.get("/api/v1/names", {
        params: {
            page: page,
            size: size
        }
    });
}

/**
 * Module SEAT
 */

export const callFetchSeatByShow = (id: number | undefined, page: number | undefined, size: number | undefined) => {
    return axios.get("/api/v1/seats/by-show", {
        params: {
            page: page,
            size: size,
            id: id
        }
    });
}

export const callCreateSeat = (name: string | undefined, showId: number | undefined, billId: number) => {
    return axios.post("/api/v1/seats", {
        name: name, active: true, show: { id: showId }, bill: { id: billId }
    })
}

/**
 * Module BILL
 */

export const callCreateBill = (data: IBill) => {
    return axios.post("/api/v1/bills", data);
}

export const callFetchAllBillByUser = (page: number, size: number) => {
    return axios.get("/api/v1/bills", {
        params: { page, size }
    })
}

/**
 * Module ROLE
 */

export const callFetchAllRoles = (query: string) => {
    return axios.get(`/api/v1/roles${query}`);
}

export const callFetchRoleById = (id: number) => {
    return axios.get(`/api/v1/roles/${id}`);
}

export const callCreateRole = (role: {
    name: string | undefined;
    description: string | undefined;
    active: boolean;
    permissions: { id: number }[] | undefined
}) => {
    return axios.post("/api/v1/roles", { ...role })
}

export const callUpdateRole = (role: {
    "name"?: string | undefined;
    "description"?: string | undefined;
    "permissions": { id: number }[] | undefined;
    "active"?: boolean | undefined;
}, id: number | undefined) => {
    return axios.put("/api/v1/roles", { id, ...role });
}

export const callDeleteRoleById = (id: number) => {
    return axios.delete(`/api/v1/roles/${id}`);
}

/**
 * Module BILL
 */

export const callFetchAllBill = (query: string) => {
    return axios.get(`/api/v1/bills${query}`);
}
export const callFetchBillById = (id: number) => {
    return axios.get(`/api/v1/bills/${id}`);
}
export const callUpdateBill = (data: { id: number; status: string }) => {
    return axios.put(`/api/v1/bills`, data);
}
export const callDeleteBillById = (id: number) => {
    return axios.delete(`/api/v1/bills/${id}`);
}

/**
 * Module FILE
 */

export const callUploadSingleFile = (file: File, folder: string) => {
    var bodyFormData = new FormData();
    bodyFormData.append('file', file);
    bodyFormData.append('folder', folder);
    return axios({
        method: 'post',
        url: '/api/v1/files',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/**
 * Module HISTORY
 */

export const callFetchAllHistories = (query: string) => {
    return axios.get(`/api/v1/histories${query}`);
}

export const callFetchHistoryById = (id: number) => {
    return axios.get(`/api/v1/histories/${id}`);
}

export const callCreateHistory = (data: IHistory) => {
    return axios.post(`/api/v1/histories`, data);
}

export const callFetchHistoryByUser = (query: string) => {
    return axios.get(`/api/v1/histories${query}`);
}

export const callDeleteHistoryById = (id: number) => {
    return axios.delete(`/api/v1/histories/${id}`);
}

/**
 * Module ACCOUNT
 */

export const callChangePassword = (data: { currentPassword: string, newPassword: string }) => {
    return axios.post(`/api/v1/account/change-password`, data);
}

export const callChangeForgotPassword = (data: { code: string, email: string, newPassword: string, confirmPassword: string }) => {
    return axios.post(`/api/v1/account/change-password-with-code`, data);
}

export const callRetryPassword = (data: { email: string }) => {
    return axios.post(`/api/v1/account/retry-password`, data);
}

/**
 * Module EMAIL
 */

export const callSendBillForUserEmail = (data: IHistory) => {
    return axios.post(`/api/v1/email/bill`, data);
}