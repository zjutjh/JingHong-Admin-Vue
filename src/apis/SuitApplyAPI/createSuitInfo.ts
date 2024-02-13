import request from "../request";

type CreateSuitInfoData = {
  campus:number,
  name:string,
  img:string,
  specs: Array<{ spec: string; stock: number }>;
}
type CreateSuitInfoResult = Common.IResponse<null>;
const createSuitInfoDataAPI = (data:CreateSuitInfoData) => {
  return request<CreateSuitInfoResult>({
    method: "POST",
    url: "/api/stuac/supplies-borrow/supplies",
    withCredentials: true,
    data
  });
};

export default createSuitInfoDataAPI;