import request from "../request";

type GetSuitInformation = {
  code: number;
  msg: string;
  data: [{
    campus: number,
    name: string,
    img: string,
    specs: [{
      id: number,
      stock: number,
      spec: string,
      borrowed: number
    }]
  }];
};

type Campus = {
  campus: number
}
const GetSuitAPI = (params:Campus) => {
  return request<GetSuitInformation>({
    method: "GET",
    url: "/api/stuac/supplies-borrow/supplies",
    params
  });
};

export default GetSuitAPI;