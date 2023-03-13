import request from "../request";

type GetRecordsData = {
  page_num: number;
  page_size: number;
};

type GetRecordsResult = Common.IResponse<{
  data: LostfoundAPI.Item[];
  total_page_num: number
}>;

const getRecordsAPI = (params: GetRecordsData) => {
  return request<GetRecordsResult>({
    method: "GET",
    url: "/api/foru/lost",
    params
  });
};

export default getRecordsAPI;