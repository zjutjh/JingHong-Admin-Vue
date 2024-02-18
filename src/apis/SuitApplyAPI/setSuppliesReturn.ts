import request from "../request";

type suppliesReturnData = {
  supplies_return: number;
  id: number;
}

type suppliesReturnResult = Common.IResponse<null>

const suppliesReturnAPI = (data:suppliesReturnData) => {
  return request<suppliesReturnResult>({
    method: "POST",
    url: "/api/stuac/supplies-borrow/supplies-return",
    data
  });
};

export default suppliesReturnAPI;