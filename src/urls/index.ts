import axios, { AxiosProgressEvent } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { UserLoginForm, UserRegistrationForm } from "../types/user";
import { GetImages } from "../types/images";

//defaultApi
export const DEFAULT_API_ENDPOINT = "/api/v1";

export const apiClient = applyCaseMiddleware(
  axios.create({
    baseURL: DEFAULT_API_ENDPOINT,
    withCredentials: true,
    headers: {
      "Content-type": "multipart/form-data",
    },
  })
);

//users
//user's get, post, put
export const getUser = (userId: number | undefined) => {
  return apiClient.get("/users", { params: { userId } });
};
export const createUser = (data: UserRegistrationForm) => {
  return apiClient.post("/users", data);
};
export const updateUserProfile = (
  id: number,
  data: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  return apiClient.put(`/users/${id}/profile`, data, { onUploadProgress });
};
export const updateUserPassword = (
  id: number,
  data: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  return apiClient.put(`/users/${id}/password`, data, { onUploadProgress });
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
export const getImages = ({ page, pageSize, sortOption }: GetImages) => {
  return apiClient.get("/images", {
    params: { page, pageSize, sortOption },
  });
};
export const getUserImages = ({
  userId,
  page,
  pageSize,
  sortOption,
}: GetImages) => {
  return apiClient.get("/images", {
    params: {
      userId,
      page,
      pageSize,
      sortOption,
    },
  });
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
export const getSearchParkResults = (searchWord: string) => {
  return apiClient.get("/parks", { params: { searchWord } });
};

//statistics
export const getUserStatistics = (
  prefectureName: string | null,
  cityName: string | null,
  userId?: number
) => {
  return apiClient.get(`/users/${userId}/statistics`, {
    params: { prefectureName, cityName },
  });
};

export const getUserRankings = (
  prefectureName: string | null,
  cityName: string | null
) => {
  return apiClient.get("/rankings", { params: { prefectureName, cityName } });
};

export const getInsectsAndParksInfo = (
  collectionStatus: string,
  prefectureName: string | null,
  cityName: string | null,
  lat?: number,
  lng?: number
) => {
  return apiClient.get("/insects", {
    params: {
      status: collectionStatus,
      prefecture: prefectureName,
      city: cityName,
      lat: lat,
      lng: lng,
    },
  });
};
