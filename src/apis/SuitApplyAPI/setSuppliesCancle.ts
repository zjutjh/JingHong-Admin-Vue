import request from "../request";

type SuppliesCancleData = {
  id: number;
}

type SuppliesCancleResult = Common.IResponse<null>;

const suppliesCancleAPI = (data: SuppliesCancleData) => {
  return request<SuppliesCancleResult>({
    method: "POST",
    url: "/api/stuac/supplies-borrow/supplies-cancel",
    data: data,
  });
};

export default suppliesCancleAPI;