import request from "../request";

type DeleteRecordData = {
  lost_id: number
}

type DeleteRecordResult = Common.IResponse<null>;

const deleteRecordAPI = (params: DeleteRecordData) => {
  return request<DeleteRecordResult>({
    method: "DELETE",
    url: "/api/foru/lost",
    params
  });
};

export default deleteRecordAPI;