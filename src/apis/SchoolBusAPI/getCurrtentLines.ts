import request from "../request";

type GetCurrentLinesResult = Common.IResponse<Array<SchoolBusAPI.Line>>

const getCurrentLinesAPI = () => {
  return request<GetCurrentLinesResult>({
    method: "get",
    url: "/api/func/bus/list",
    withCredentials: true
  })
}

export default getCurrentLinesAPI;