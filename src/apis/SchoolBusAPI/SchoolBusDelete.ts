import request from "../request";

const deleteAPI = (data?: any) => {
    return request({
      method: "post",
      url: "/api/admin/schoolbus/delete",
      data: data,
      withCredentials: true
    })
  }

  export default deleteAPI;