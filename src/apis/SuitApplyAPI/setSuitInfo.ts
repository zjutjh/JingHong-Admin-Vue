import request from "../request";

type SetSuitInfoData = {
  campus:number,
  name:string,
  img:string,
  specs: Array<{ spec: string; stock: number; id:number}>;
}
type SetSuitInfoResult = Common.IResponse<null>;
const SetSuitInfoDataAPI = (data:SetSuitInfoData) => {
  return request<SetSuitInfoResult>({
    method: "PUT",
    url: "/api/stuac/supplies-borrow/supplies",
    withCredentials: true,
    data
  });
};

export default SetSuitInfoDataAPI;