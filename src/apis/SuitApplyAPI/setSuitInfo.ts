import request from "../request";

type SetSuitInfoData = {
  campus:number| string,
  name:string,
  img:string,
  specs: Array<{ stock: number;
    spec: string;
    id?: number | undefined;
    borrowed?: number | undefined;}>;
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