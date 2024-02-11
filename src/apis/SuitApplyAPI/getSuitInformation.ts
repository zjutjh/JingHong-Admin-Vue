import request from "../request";

type GetSuitInformation = Common.IResponse<null>;
type Campus = {
  campus: number
}
const GetSuitAPI = (params:Campus) => {
  return request<GetSuitInformation>({
    method: "GET",
    url: "/api/stuac/supplies-borrow/supplies",
    params
  });
};

export default GetSuitAPI;