import request from "../request";

const getAPI = (data?: any) => {
    return request({
      method: "post",
      url: "/api/terminfo",
      data: data,
      withCredentials: true
    })
  }

  export default getAPI;