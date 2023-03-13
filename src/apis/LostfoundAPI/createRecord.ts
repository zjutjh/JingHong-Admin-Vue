import request from "../request";

type CreateRecordData = Omit<
  LostfoundAPI.Item,
  "id" | "publish_time" | "is_processed"
>;

type CreateRecordResult = Common.IResponse<null>;

const createRecordAPI = (data: CreateRecordData) => {
  return request<CreateRecordResult>({
    method: "POST",
    url: "/api/foru/lost",
    data
  });
};

export default createRecordAPI;