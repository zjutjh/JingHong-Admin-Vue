import request from "../Request";

const getAPI = (data?: any) => {
    return request({
      method: "post",
      url: "/api/announcement",
      data: data,
      withCredentials: true
    })
  }

  export default getAPI;