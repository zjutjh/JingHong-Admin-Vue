import request from "../request";

type setRecordQuery = {
  id?: number;
  name?:string;
  gender?:string;
  college?:string;
  supplies_id?: number;
  dormitory?: string;
  count?: number;
  contact?: string;
}

type getRecordResult = {
  code: number;
  data: null;
  msg: string;
}

const SetRecordAPI =  (data:setRecordQuery) => {
  return request<getRecordResult>({
    method: "PUT",
    url: "/api/stuac/supplies-borrow/supplies-update",
    data,
  });
};

export default SetRecordAPI;