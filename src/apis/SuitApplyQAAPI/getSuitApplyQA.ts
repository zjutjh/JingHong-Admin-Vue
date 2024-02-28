import request from "../request";

type GetSuitApplyQAResult = Common.IResponse<SuitApplyQAAPI.SuitApplyQA[]>

const getSuitApplyQAAPI = () => {
  return request<GetSuitApplyQAResult>({
    method: "GET",
    url: "/api/stuac/supplies-borrow/qa",
    withCredentials: true,
  });
};

export default getSuitApplyQAAPI;