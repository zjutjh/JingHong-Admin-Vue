import request from "../Request";

const updateAPI = (data?: any) => {
    return request({
      method: "post",
      url: "/api/admin/schoolbus/update",
      data: data,
      withCredentials: true
    })
  }

  export default updateAPI;