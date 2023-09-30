import axios, { AxiosProgressEvent } from "axios";
import { UserLoginForm, UserRegistrationForm } from "../types/user";

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
//user's get, post, put
export const getUser = (userId: number | undefined) => {
  return apiClient.get("/users", { params: { user_id: userId } });
};
export const createUser = (data: UserRegistrationForm) => {
  return apiClient.post("/users", data);
};
export const updateUser = (
  id: number,
  data: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  return apiClient.put(`/users/${id}`, data, { onUploadProgress });
};

//user's login, logout
export const getUserLogin = () => {
  return apiClient.get(`/logged_in`);
};
export const userLogin = (data: UserLoginForm) => {
  return apiClient.post(`/login`, data);
};
export const userLogout = () => {
  return apiClient.delete(`/logout`);
};

// user's relationships
export const createUserRelationship = (
  loginUserId: number,
  followedUserId: number
) => {
  return apiClient.post(`/users/${loginUserId}/relationships`, {
    id: followedUserId,
  });
};
export const deleteUserRelationship = (
  loginUserId: number,
  followedUserId: number
) => {
  return apiClient.delete(
    `/users/${loginUserId}/relationships/${followedUserId}`
  );
};

//posts
export const getPosts = (page: number, tabValue: number) => {
  return apiClient.get("/posts", { params: { page, tabValue } });
};
export const createPosts = (
  data: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  return apiClient.post("/posts", data, { onUploadProgress });
};
export const deletePosts = (postId: number) => {
  return apiClient.delete(`/posts/${postId}`);
};

//images
export const getImages = (page: number) => {
  return apiClient.get("/images", { params: { page } });
};
export const getUserImages = (userId: number | undefined, page: number) => {
  return apiClient.get("/images", { params: { user_id: userId, page } });
};
export const updateImages = (data: object) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return apiClient.put(`/images/bulk_update`, data, config);
};
export const deleteImages = (id: number[]) => {
  return apiClient.delete(`/images/${id}`);
};

//likes
export const createImageLike = (imageId: number) => {
  return apiClient.post(`/images/${imageId}/likes`);
};
export const deleteImageLike = (imageId: number) => {
  return apiClient.delete(`/images/${imageId}/likes/1`);
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
