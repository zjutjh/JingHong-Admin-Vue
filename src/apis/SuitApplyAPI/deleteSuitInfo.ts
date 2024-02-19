import request from "../request";

type DeleteSuitInfoData = {
  id: number
}
type DeleteSuitInfoResult = Common.IResponse<null>;
const DeleteSuitInfoAPI = (params:DeleteSuitInfoData) => {
  return request<DeleteSuitInfoResult>({
    method: "DELETE",
    url: "/api/stuac/supplies-borrow/supplies",
    withCredentials: true,
    params
  });
};

export default DeleteSuitInfoAPI;