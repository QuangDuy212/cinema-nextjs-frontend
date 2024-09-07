import axios from "axios";

/**
 * Module Auth
 */
export const callLogin = (username: string, password: string) => {
    return axios.post("http://localhost:8080/api/v1/auth/login", { username, password });
}

export const callLogout = () => {
    return axios.post("http://localhost:8080/api/v1/auth/logout");
}

export const callFetchAccount = () => {
    return axios.get("http://localhost:8080/api/v1/auth/account");
}

export const callRefreshToken = () => {
    return axios.get("http://localhost:8080/api/v1/auth/refresh");
}

/**
 * Module FILM
 */
export const callFetchAllFilms = () => {
    return axios.get("http://localhost:8080/api/v1/films?page=1&size=100");
}

export const callFetchFilmById = (id: String) => {
    return axios.get(`http://localhost:8080/api/v1/films/${id}`);
};

/**
 * Module TIME
 */
export const callFetchAllTimes = () => {
    return axios.get("http://localhost:8080/api/v1/times?page=1&size=3");
}

/**
 * Module SHOW
 */
export const callFetchShowsByFilmAndDay = (filmId: number, dayId: number) => {
    return axios.get("http://localhost:8080/api/v1/shows/by-film-day",
        {
            params:
                { film: filmId, day: dayId }
        }
    )
}

