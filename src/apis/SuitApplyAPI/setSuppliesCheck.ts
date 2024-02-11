import request from "../request";

type suppliesCheckData ={
  supplies_check: number;
  id: number;
}

type suppliesCheckResult = Common.IResponse<null>;

const suppliesCheckAPI = (params:suppliesCheckData) => {
  return request<suppliesCheckResult>({
    method: "POST",
    url: "/api/stuac/supplies-borrow/supplies-check",
    params
  });
};

export default suppliesCheckAPI;