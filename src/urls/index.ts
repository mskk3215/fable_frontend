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
      "Content-Type": "application/json",
    },
  })
);

//users
//user's get, post, put
export const getUser = (userId: number) => {
  return apiClient.get(`/users/${userId}`);
};
export const createUser = (data: UserRegistrationForm) => {
  return apiClient.post("/users", data);
};
export const updateUserProfile = (
  id: number,
  data: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  return apiClient.put(`/users/${id}/profile`, data, {
    onUploadProgress,
    headers: {
      "Content-Type": undefined, // ヘッダーの設定を削除して自動設定機能でmultipart/form-dataに変換
    },
  });
};
export const updateUserPassword = (
  id: number,
  data: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  return apiClient.put(`/users/${id}/password`, data, {
    onUploadProgress,
    headers: {
      "Content-Type": undefined,
    },
  });
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
  return apiClient.post("/posts", data, {
    onUploadProgress,
    headers: { "Content-Type": undefined },
  });
};
export const deletePosts = (postId: number) => {
  return apiClient.delete(`/posts/${postId}`);
};

//collectedInsectImages
export const getCollectedInsectImages = ({
  page,
  pageSize,
  sortOption,
}: GetImages) => {
  return apiClient.get("/collected_insects", {
    params: { page, pageSize, sortOption },
  });
};
export const getUserCollectedInsectImages = ({
  userId,
  page,
  pageSize,
  sortOption,
}: GetImages) => {
  return apiClient.get("/collected_insects", {
    params: {
      userId,
      page,
      pageSize,
      sortOption,
    },
  });
};
export const updateCollectedInsectImages = (data: object) => {
  return apiClient.put(`/collected_insects/bulk_update`, data);
};
export const deleteCollectedInsectImages = (id: number[]) => {
  return apiClient.delete(`/collected_insects/${id}`);
};

// notifications
export const getSightingNotifications = (
  page: number,
  insectId?: number,
  isNotificationEnabled?: boolean
) => {
  return apiClient.get(`/sighting_notifications`, {
    params: { page, insectId, isNotificationEnabled },
  });
};
export const createUserSightingNotification = (insectId: number) => {
  return apiClient.post(`/sighting_notifications`, { params: { insectId } });
};
export const deleteUserSightingNotification = (id: number) => {
  return apiClient.delete(`/sighting_notifications/${id}`);
};

//likes
export const createCollectedInsectImageLike = (imageId: number) => {
  return apiClient.post(`/collected_insects/${imageId}/likes`);
};
export const deleteCollectedInsectImageLike = (imageId: number) => {
  return apiClient.delete(`/collected_insects/${imageId}/likes/1`);
};

//insects
export const getInsects = (queryWord: string) => {
  return apiClient.get("/insects", { params: { queryWord } });
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

//pictureBook
export const getPictureBookInfo = (insectId: number) => {
  return apiClient.get(`/insects/${insectId}`);
};
export const getPictureBookList = (page: number, queryWord?: string) => {
  return apiClient.get(`/insects`, {
    params: { pageType: "picturebooklist", page, queryWord: queryWord },
  });
};
