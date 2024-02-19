import request from "../request";

type setRecordQuery = {
  id?: number;
}

type getRecordResult = {
  code: number;
  data: null;
  msg: string;
}

const SetRejectCancelAPI =  (data:setRecordQuery) => {
  return request<getRecordResult>({
    method: "POST",
    url: "/api/stuac/supplies-borrow/cancel-reject",
    data,
  });
};

export default SetRejectCancelAPI;