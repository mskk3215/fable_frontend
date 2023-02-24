import axios from "axios";

//default_api
export const DEFAULT_API_LOCALHOST = "http://localhost:3001/api/v1";

//ユーザー管理
export const registrationUrl = `${DEFAULT_API_LOCALHOST}/signup`;
export const loginUrl = `${DEFAULT_API_LOCALHOST}/login`;
export const logoutUrl = `${DEFAULT_API_LOCALHOST}/logout`;
export const logged_inUrl = `${DEFAULT_API_LOCALHOST}/logged_in`;

//post
export const postClient = axios.create({
  baseURL: DEFAULT_API_LOCALHOST,
  withCredentials: true,
  headers: {
    "Content-type": "multipart/form-data",
  },
});

export const getPosts = () => {
  return postClient.get("/images");
};
export const createPosts = (data) => {
  return postClient.post("/images", data);
};
export const updatePosts = (id, data) => {
  return postClient.put(`/images/${id}`, data);
};
export const deletePosts = (id) => {
  return postClient.delete(`/images/${id}`);
};

// postClient.interceptors.request.use((request) => {
//   console.log(request);
//   return request;
// });
// postClient.interceptors.response.use((response) => {
//   console.log(response);
//   return response;
// });

//insects
export const getInsects = () => {
  return postClient.get("/insects");
};

//parks
export const getParks = () => {
  return postClient.get("/parks");
};
