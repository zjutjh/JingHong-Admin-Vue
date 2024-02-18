import request from "../request";

type Input = {
  campus: number;
  college: string;
  contact: string;
  count: number;
  dormitory: string;
  gender: string;
  kind: string;
  name: string;
  spec: string;
  student_id: string;
  supplies_name: string;
}

type output = {
  code: number;
  data: null;
  msg: string;
}

const setSuppliesImportAPI = (params: Input) => {
  return request<output>({
    method: "POST",
    url: "/api/stuac/supplies-borrow/supplies-import",
    params: params
  });
};

export default setSuppliesImportAPI;