import request from "../request";

type UpdateSuitApplyQAData = Omit<
  SuitApplyQAAPI.SuitApplyQA,
  "publish_time"
>;

type UpdateSuitApplyQAResult = Common.IResponse<null>;

const updateSuitApplyQAAPI = (data: UpdateSuitApplyQAData) => {
  return request<UpdateSuitApplyQAResult>({
    method: "PUT",
    url: "/api/stuac/supplies-borrow/qa",
    withCredentials: true,
    data
  });
};

export default updateSuitApplyQAAPI;