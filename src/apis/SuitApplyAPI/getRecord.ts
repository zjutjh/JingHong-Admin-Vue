import request from "../request";

type getRecordQuery = {
  campus?: number;
  choice?: number;
  id?: number;
  page_num: number;
  page_size: number;
  spec?: string;
  status?: number;
  student_id?: string;
  supplies_name?: string;
}

type getRecordResult = {
  code: number;
  data: Data;
  msg: string;
}

type Data = {
  data: Datum[];
  total_page_num: number;
}

export interface Datum {
  apply_time: string;
  borrow_time: string;
  college: string;
  contact: string;
  count: number;
  dormitory: string;
  gender: string;
  id: number;
  kind: string;
  name: string;
  return_time: string;
  spec: string;
  status: number;
  student_id: string;
  supplies_id: number;
  supplies_name: string;
}

const GetRecordAPI =  (params:getRecordQuery) => {
  return request<getRecordResult>({
    method: "GET",
    url: "/api/stuac/supplies-borrow/record",
    params: params,
  });
};

export default GetRecordAPI;