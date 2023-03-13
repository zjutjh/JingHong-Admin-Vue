import request from "../request";

type GetKindsResult = Common.IResponse<{
  id: number;
  kind_name: string;
}[]>;

const getKindsAPI = () => {
  return request<GetKindsResult>({
    method: "GET",
    url: "/api/func/lost/kind_list",
  });
};

export default getKindsAPI;