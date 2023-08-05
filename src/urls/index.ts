import axios from "axios";

//default_api
export const DEFAULT_API_LOCALHOST = "/api/v1";

export const apiClient = axios.create({
  baseURL: DEFAULT_API_LOCALHOST,
  withCredentials: true,
  headers: {
    "Content-type": "multipart/form-data",
  },
});

//users
export const registrationUrl = `${DEFAULT_API_LOCALHOST}/users`;
export const loginUrl = `${DEFAULT_API_LOCALHOST}/login`;
export const logoutUrl = `${DEFAULT_API_LOCALHOST}/logout`;
export const logged_inUrl = `${DEFAULT_API_LOCALHOST}/logged_in`;

export const updateUser = (id: number, data: FormData) => {
  return apiClient.put(`/users/${id}`, data);
};

//images
export const getPosts = () => {
  return apiClient.get("/images");
};
export const getUserPosts = (userId: number | undefined) => {
  return apiClient.get("/images", { params: { user_id: userId } });
};
export const createPosts = (data: FormData) => {
  return apiClient.post("/images", data);
};
export const updatePosts = (id: number[], data: FormData) => {
  return apiClient.put(`/images/${id}`, data);
};
export const deletePosts = (id: number[]) => {
  return apiClient.delete(`/images/${id}`);
};

//insects
export const getInsects = () => {
  return apiClient.get("/insects");
};

//parks
export const getParks = () => {
  return apiClient.get("/parks");
};

//cities
export const getPrefectures = () => {
  return apiClient.get("/prefectures");
};

//search parks
export const getSearchParkResults = (word: string) => {
  return apiClient.get("/parks", { params: { search_word: word } });
};
