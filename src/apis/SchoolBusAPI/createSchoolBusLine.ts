import request from "../request";

type CreateSchoolBusLineData = Omit<SchoolBusAPI.Line ,"id">

type CreateSchoolBusLineResult = Common.IResponse<null>;

const createSchoolBusLineAPI = (data: CreateSchoolBusLineData) => {
  return request<CreateSchoolBusLineResult>({
    method: "POST",
    url: "/api/admin/schoolbus/create",
    withCredentials: true,
    data
  })
}

export default createSchoolBusLineAPI;