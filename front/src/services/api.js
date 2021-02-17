import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3001/"
})
api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (
        error.response &&
        error.response.status &&
        error.response.status === 401
      ) {
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );
export default api;