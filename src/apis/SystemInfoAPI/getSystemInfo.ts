import request from "../request";


type GetSystemInfoResult = Common.IResponse<
  SystemInfoAPI.SystemInfo
>

const getSystemInfoAPI = () => {
  return request<GetSystemInfoResult>({
    method: "post",
    url: "/api/info",
    withCredentials: true
  })
}

export default getSystemInfoAPI;