import axios from "axios";

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
