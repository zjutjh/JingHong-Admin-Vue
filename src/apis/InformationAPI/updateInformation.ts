import request from "../request";

type UpdateInformationData = Omit<
  InformationAPI.Information,
  "publish_time"
>;

type UpdateInformationResult = Common.IResponse<null>;

const updateInformationAPI = (data: UpdateInformationData) => {
  return request<UpdateInformationResult>({
    method: "PUT",
    url: "/api/foru/information",
    withCredentials: true,
    data
  });
};

export default updateInformationAPI;