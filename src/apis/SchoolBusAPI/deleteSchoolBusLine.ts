import request from "../request";

type DeleteSchoolBusLineData = {
  id: SchoolBusAPI.Line["id"];
}

type DeleteSchoolBusLineResult = Common.IResponse<null>

const deleteSchoolBusLineAPI = (data: DeleteSchoolBusLineData) => {
  return request<DeleteSchoolBusLineResult>({
    method: "POST",
    url: "/api/admin/schoolbus/delete",
    withCredentials: true,
    data
  })
}

export default deleteSchoolBusLineAPI;