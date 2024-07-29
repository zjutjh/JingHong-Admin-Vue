import request from "../request";

type GetTermInfoData = {
  termStartDateValue: string;
  termValue: string;
  yearValue: string;
  scoreYearValue: string;
  scoreTermValue: string;
  schoolBusUrlValue: string;
  jpgUrlValue: string;
  fileUrlValue: string;
  registerTips: string;
}

type GetTermInfoResult = Common.IResponse<string>

const setTermInfoAPI = (data?: GetTermInfoData) => {
  return request<GetTermInfoResult>({
    method: "post",
    url: "/api/admin/set/terminfo",
    data: data,
    withCredentials: true
  })
}

export default setTermInfoAPI;