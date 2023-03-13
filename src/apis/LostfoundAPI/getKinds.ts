import request from "../request";

type GetKindsResult = Common.IResponse<string[]>;

const getKindsAPI = () => {
  return request<GetKindsResult>({
    method: "GET",
    url: "/api/func/lost/kind_list",
  });
};

export default getKindsAPI;