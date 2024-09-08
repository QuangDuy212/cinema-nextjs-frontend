import axios from "src/config/axios-customize";

// import axios from "axios";


/**
 * Module Auth
 */
export const callLogin = (username: string | undefined, password: string | undefined) => {
    return axios.post<IBackendRes<IAccount>>("/api/v1/auth/login", { username, password });
}

export const callLogout = () => {
    return axios.post<IBackendRes<null>>("/api/v1/auth/logout");
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

