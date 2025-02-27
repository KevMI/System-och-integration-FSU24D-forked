import axios from "axios";
import { IPun } from "../types/Pun";

export const API_URL = "https://pun-api-with-auth.vercel.app";

const get = async <T>(url: string) => {
  const data: T = await axios.get(url);
  return data;
}

export const getPuns = async () => {

  const data = await get<IPun[]>(API_URL);
  return data;
}


