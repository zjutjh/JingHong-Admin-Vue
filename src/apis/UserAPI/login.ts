import request from "../request";

type LoginData = {
  username: string;
  password: string;
}

type LoginResult = Common.IResponse<{
  user: UserAPI.User;
}>

const loginAPI = (data: LoginData) => {
  return request<LoginResult>({
    method: "post",
    url: "/api/user/login",
    data: data,
    withCredentials: true,
  });
};

export default loginAPI;
