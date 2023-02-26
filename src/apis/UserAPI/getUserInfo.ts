import request from "../request"

type GetUserInfoResult = Common.IResponse<{
  user: UserAPI.User;
}>

const getUserInfoAPI = () => {
  return request<GetUserInfoResult>({
    method: "post",
    url: "/api/user/info",
    withCredentials: true
  })
}

export default getUserInfoAPI
