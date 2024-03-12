import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` },
});


// Add an error interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const resp = await api.post("/Login/RefreshToken")
      originalRequest.headers.Authorization = `Bearer ${resp.data.accessToken}`;

      sessionStorage.setItem("accessToken", resp.data.accessToken)
      sessionStorage.setItem("user", JSON.stringify(resp.data.user))

      return api(originalRequest)
    }
    return Promise.reject(error)
  }
);

export default api;
