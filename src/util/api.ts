import axios from "axios";

export const callFetchAllFilms = () => {
    return axios.get("http://localhost:8080/api/v1/films?page=1&size=100");
}