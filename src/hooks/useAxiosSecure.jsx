import axios from "axios";

let axiosSecure = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
})
const UseAxiosSecure = () => {
     return axiosSecure;
};

export default UseAxiosSecure;