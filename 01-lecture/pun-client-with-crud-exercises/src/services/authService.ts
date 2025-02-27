import axios from "axios";
import { ITokenResponse } from "../types/ITokenResponse";
import { IUserCredentials } from "../types/IUserCredentials";
import { API_URL } from "./baseService";

const getCachedToken = () => localStorage.getItem('token');

export const getToken = async () => {
  if (getCachedToken()) {
    return getCachedToken();
  }

  try {
    const payload: IUserCredentials = {
      username: "Kevin",
      password: "qwerty"
    }

    const response = await axios.post<ITokenResponse>(`${API_URL}/auth/token`, payload);
    console.log(response.data);
    localStorage.setItem('token', response.data.accessToken);
  } catch (error) {
    console.log(error);
  }
}