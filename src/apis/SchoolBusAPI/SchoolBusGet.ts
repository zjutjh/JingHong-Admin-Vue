import request from "../request";

const getAPI = (data?: any) => {
    return request({
      method: "post",
      url: "/api/schoolbus",
      data: data,
      withCredentials: true
    })
  }

  export default getAPI;