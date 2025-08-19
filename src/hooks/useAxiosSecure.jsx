import axios from "axios";

let axiosSecure = axios.create({
    baseURL: 'https://kids-toys-land-server-side.vercel.app',
    withCredentials: true
})
const UseAxiosSecure = () => {
     return axiosSecure;
};

export default UseAxiosSecure;