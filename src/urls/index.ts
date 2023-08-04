import axios from "axios";

//default_api
export const DEFAULT_API_LOCALHOST = "/api/v1";

//ユーザー管理
export const registrationUrl = `${DEFAULT_API_LOCALHOST}/users`;
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
export const createPosts = (data: FormData) => {
  return postClient.post("/images", data);
};
export const updatePosts = (id: number[], data: FormData) => {
  return postClient.put(`/images/${id}`, data);
};
export const deletePosts = (id: number[]) => {
  return postClient.delete(`/images/${id}`);
};

//insects
export const getInsects = () => {
  return postClient.get("/insects");
};

//parks
export const getParks = () => {
  return postClient.get("/parks");
};

//cities
export const getPrefectures = () => {
  return postClient.get("/prefectures");
};

//search parks
export const getSearchParkResults = (word: string) => {
  return postClient.get("/parks", { params: { search_word: word } });
};
