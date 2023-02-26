import request from "../Request";

const setAPI = (data?: any) => {
    return request({
      method: "post",
      url: "/api/admin/set/terminfo",
      data: data,
      withCredentials: true
    })
  }

  export default setAPI;