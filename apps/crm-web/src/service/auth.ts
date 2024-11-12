import { AuthResponse, LoginParams, RegisterParams } from "@/types";
import axios from "./axios";
import { AxiosResponse } from "axios";

export const registerService = async (dal: RegisterParams) => {
  const { data } = await axios.post<
    AuthResponse,
    AxiosResponse<AuthResponse>,
    RegisterParams
  >("api/auth/local/register", dal);
  return data;
};

export const loginService = async (dal: LoginParams) => {
  const { data } = await axios.post<
    AuthResponse,
    AxiosResponse<AuthResponse>,
    LoginParams
  >("api/auth/local", dal);
  return data;
};
