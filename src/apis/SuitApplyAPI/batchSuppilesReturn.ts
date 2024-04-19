import request from "../request";


const batchSuppliesReturnAPI = (data:{
  ids:number[],
  supplies_return:number
}) => {
  return request<any>({
    method: "POST",
    url: "/api/stuac/supplies-borrow/batch-supplies-return",
    withCredentials: true,
    data
  });
};

export default batchSuppliesReturnAPI;