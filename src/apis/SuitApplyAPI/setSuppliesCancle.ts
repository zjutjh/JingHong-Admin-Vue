import request from "../request";

type SuppliesCancleData = {
  id: number;
}

type SuppliesCancleResult = Common.IResponse<null>;

const suppliesCancleAPI = (params: SuppliesCancleData) => {
  return request<SuppliesCancleResult>({
    method: "POST",
    url: "/api/stuac/supplies-borrow/supplies-cancel",
    params
  });
};

export default suppliesCancleAPI;