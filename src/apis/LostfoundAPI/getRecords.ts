import request from "../request";

interface GetRecordsData<Ttype> {
  page_num: number;
  page_size: number;
  lost_or_found: Ttype;
}

type GetRecordsResult<Ttype> = Common.IResponse<{
  data: Ttype extends "失物" ? LostfoundAPI.LostItem[] : LostfoundAPI.FoundItem[];
  total_page_num: number;
}>;

const getRecordsAPI = <Ttype extends "失物" | "寻物">(params: GetRecordsData<Ttype>) => {
  return request<GetRecordsResult<Ttype>>({
    method: "GET",
    url: "/api/foru/lost",
    params
  });
};

export default getRecordsAPI;