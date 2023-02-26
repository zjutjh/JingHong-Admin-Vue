import request from "./request";

const getUserInfoAPI = () => {
  return request({
    method: "post",
    url: "/api/user/info",
    withCredentials: true
  })
}

export default getUserInfoAPI;