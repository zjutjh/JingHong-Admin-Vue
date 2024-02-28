import request from "../request";

type GetRequestData = {
  page_num: number;
  page_size: number;
};

type GetRequestResult = Common.IResponse<{
  data: SuitApplyAPI.SuitCheckItem[];
  total_page_number: number
}>;

const getRequestAPI = (params: GetRequestData) => {
  return request<GetRequestResult>({
    method: "GET",
    url: "/api/stuac/supplies-borrow/supplies-check",
    params
  });
};

export default getRequestAPI;