import { axiosInstance } from '../utils/http';

export async function createUser(data) {
  const response = await axiosInstance.post(`users`, data);
  return response;
}

export async function getUserData() {
  const response = await axiosInstance.get(`users?page=1&per_page=12`);
  return response;
}

export async function updateUser(id, data) {
  const response = await axiosInstance.put(`users/${id}`, data);
  return response;
}

export async function deleteUser(id) {
  const response = await axiosInstance.delete(`users/${id}`);
  return response;
}

