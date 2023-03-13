import request from "../request";

type UpdateRecordData = Omit<
  LostfoundAPI.Item,
  "publish_time" | "is_processed"
>;

type UpdateRecordResult = Common.IResponse<null>;

const updateRecordAPI = (data: UpdateRecordData) => {
  return request<UpdateRecordResult>({
    method: "PUT",
    url: "/api/foru/lost",
    data
  });
};

export default updateRecordAPI;