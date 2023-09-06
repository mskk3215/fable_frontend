import axios from "axios";
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
export const logoutUrl = `${DEFAULT_API_LOCALHOST}/logout`;
export const logged_inUrl = `${DEFAULT_API_LOCALHOST}/logged_in`;

export const getUser = (userId: number | undefined) => {
  return apiClient.get("/users", { params: { user_id: userId } });
};
export const createUser = (data: UserRegistrationForm) => {
  return apiClient.post("/users", data);
};
export const updateUser = (id: number, data: FormData) => {
  return apiClient.put(`/users/${id}`, data);
};

export const userLogin = (data: UserLoginForm) => {
  return apiClient.post(`/login`, data);
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
export const getPosts = () => {
  return apiClient.get("/posts");
};
export const createPosts = (data: FormData) => {
  return apiClient.post("/posts", data);
};
export const deletePosts = (postId: number) => {
  return apiClient.delete(`/posts/${postId}`);
};

//images
export const getImages = () => {
  return apiClient.get("/images");
};
export const getUserImages = (userId: number | undefined) => {
  return apiClient.get("/images", { params: { user_id: userId } });
};
export const updateImages = (id: number[], data: FormData) => {
  return apiClient.put(`/images/${id}`, data);
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
