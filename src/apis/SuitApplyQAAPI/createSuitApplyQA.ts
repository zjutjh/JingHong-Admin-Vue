import request from "../request";

type CreateSuitApplyQAData = {
  title: string;
  content: string;
}

type CreateSuitApplyQAResult = Common.IResponse<null>;

const createSuitApplyQAAPI = (data: CreateSuitApplyQAData) => {
  return request<CreateSuitApplyQAResult>({
    method: "POST",
    url: "/api/stuac/supplies-borrow/qa",
    withCredentials: true,
    data
  });
};

export default createSuitApplyQAAPI;