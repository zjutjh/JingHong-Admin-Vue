import request from "../request";

type Campus = {
  campus: number
};

type SuppliesExportResult = {
  code: number;
  data: string;
  msg: string;
};

const GetExportAPI =  (params:Campus) => {
  return request<SuppliesExportResult>({
    method: "GET",
    url: "/api/stuac/supplies-borrow/supplies-export",
    params: params,
  });
};

export default GetExportAPI;