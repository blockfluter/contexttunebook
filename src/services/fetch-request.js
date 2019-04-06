import axios from "axios";

export const request = url => {
    return axios.get(url).then(response => response.data);
};
