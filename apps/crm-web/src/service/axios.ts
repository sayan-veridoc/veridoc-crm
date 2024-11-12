// import { toast } from "sonner";
// import { logout } from "@/redux/auth/authSlice";
// import store from "@/redux/store";
import _axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

export type ServerError = {
  data: unknown | null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: object;
  };
};

const environment = process.env.NODE_ENV;

const baseURL =
  environment == "development"
    ? "http://localhost:1337"
    : "http://localhost:1337";
const axios = _axios.create({ baseURL });

// axios.interceptors.request.use((config) => {
//   const { accessToken } = store.getState().auth;

//   config.headers.set("Authorization", `Bearer ${accessToken}`);

//   return config;
// });

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ServerError>) => {
    const { response } = error;

    if (response) {
      const errorObject = response.data;
      const code = errorObject.error.status;
      //   const message = errorObject.message;

      //   const errorMessage =
      //     message === undefined && message == "Unauthorized"
      //       ? "Invalid username or password"
      //       : message;

      //   if (typeof errorMessage === "string") {
      //     // toast.error(errorMessage);
      //     toast.error("Error", { description: errorMessage });
      //   }

      if (code === 401) {
        // store.dispatch(logout());
        redirect("/");
      }

      throw errorObject;
    }

    throw error;
  }
);

export default axios;
