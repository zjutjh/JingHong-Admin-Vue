import request from "../request";

type UpdateSchoolBusLineData = SchoolBusAPI.Line;

type UpdateSchoolBusLineResult = Common.IResponse<null>;

const updateSchoolBusLineAPI = (data: UpdateSchoolBusLineData) => {
  return request<UpdateSchoolBusLineResult>({
    method: "POST",
    url: "/api/admin/schoolbus/update",
    withCredentials: true,
    data
  })
}

export default updateSchoolBusLineAPI;