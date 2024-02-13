import request from "../request";

type Campus = {
  campus: number
};

type SuppliesExportResult = {
  code: number;
  data: string;
  mgs: string;
};

const GetExportAPI =  (params:Campus) => {
  return request<SuppliesExportResult>({
    method: "GET",
    url: "/api/stuac/supplies-borrow/supplies-export",
    params,
  });
};

export default GetExportAPI;