import request from "../request";

const createAPI = (data?: any) => {
    return request({
      method: "post",
      url: "/api/admin/schoolbus/create",
      data: data,
      withCredentials: true
    })
  }

  export default createAPI;