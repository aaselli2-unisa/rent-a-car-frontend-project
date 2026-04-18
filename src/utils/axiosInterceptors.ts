import { addRequest, removeRequest } from './../store/slices/loadingSlice';
import axios from "axios";
import config from '../data/config.json';

// V-02: withCredentials = true so the browser sends the HttpOnly accessToken cookie
// on every cross-origin request to the backend (required for cookie-based auth)
const axiosInstance = axios.create({
	baseURL: config.apiBaseUrl,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
	  addRequest();
	  // V-02: Authorization header removed — token is in HttpOnly cookie, handled by browser
	  return config;
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
	  removeRequest();
	  // V-07: console.log(response) removed — logged full responses including auth data in prod
	  return response;
	},
	(error) => {
		removeRequest();
		return Promise.reject(error);
	}
);

export default axiosInstance;