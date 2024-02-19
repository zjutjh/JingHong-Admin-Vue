import request from "../request";

type DeleteSuitApplyQAData = {
  id: number;
}

type DeleteSuitApplyQAResult = Common.IResponse<null>;

const deleteSuitApplyQAAPI = (params: DeleteSuitApplyQAData) => {
  return request<DeleteSuitApplyQAResult>({
    method: "DELETE",
    url: "/api/stuac/supplies-borrow/qa",
    withCredentials: true,
    params
  });
};

export default deleteSuitApplyQAAPI;