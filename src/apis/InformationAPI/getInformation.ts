import request from "../request";

type GetInformationResult = Common.IResponse<InformationAPI.Information[]>

const getInformationAPI = () => {
  return request<GetInformationResult>({
    method: "GET",
    url: "/api/func/information",
    withCredentials: true,
  });
};

export default getInformationAPI;