import request from "../request";


const batchApprovalAPI = (data:{
  ids:number[],
  supplies_check:number
}) => {
  return request<any>({
    method: "POST",
    url: "/api/stuac/supplies-borrow/batch-supplies-check",
    withCredentials: true,
    data
  });
};

export default batchApprovalAPI;