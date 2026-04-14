import { ErrorMessage } from 'formik';
import { addRequest, removeRequest } from './../store/slices/loadingSlice';
import axios from "axios";
import config from '../data/config.json';
import tokenService from "../services/tokenService";

const axiosInstance = axios.create({
	baseURL: config.apiBaseUrl,
});

axiosInstance.interceptors.request.use(
	(config) => {
	  const method = (config.method || "get").toLowerCase();
	  const url = config.url || "";
	  const isPublicEndpoint =
		url.startsWith("auth/") ||
		url === "drivingLicenseType" ||
		url === "drivingLicenseTypes" ||
		(method === "post" && url === "customers");

	  const token = tokenService.getToken();
	  if (token && !isPublicEndpoint) {
		config.headers.Authorization = token.startsWith("Bearer ")
		  ? token
		  : `Bearer ${token}`;
	  }

	  addRequest();
	  return config;
	}
  );
  
  axiosInstance.interceptors.response.use(
	(response) => {
	  removeRequest();
	  console.log(response);
	  
	  return response;
	},
	(error) => {
		removeRequest();
	   /*  if (error.response.data.response.details[0] == 'Bad credentials') {
			
			console.log("Invalid login");
		} */
        //const errorCode= error.response.data.response.details[0];
		
		return Promise.reject(error);
	}
  );
  
  export default axiosInstance;