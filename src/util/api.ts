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
export const callFetchAllFilms = () => {
    return axios.get("/api/v1/films?page=1&size=100");
}

export const callFetchFilmById = (id: String) => {
    return axios.get(`/api/v1/films/${id}`);
};

/**
 * Module TIME
 */
export const callFetchAllTimes = () => {
    return axios.get("/api/v1/times?page=1&size=3");
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


/**
 * Module USER
 */

export const callUpdateUser = (id: number | undefined, fullName: string | undefined, phone: string | undefined, address: string | undefined) => {
    return axios.put("/api/v1/users", { id, fullName, phone, address })
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