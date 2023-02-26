import request from "../Request";

const createAPI = (data?: any) => {
    return request({
      method: "post",
      url: "/api/admin/announcement/create",
      data: data,
      withCredentials: true
    })
  }

  export default createAPI;