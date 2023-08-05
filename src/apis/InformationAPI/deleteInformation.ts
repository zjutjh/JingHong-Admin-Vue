import request from "../request";

type DeleteInformationData = {
  notice_id: number;
}

type DeleteInformationResult = Common.IResponse<null>;

const deleteInformationAPI = (params: DeleteInformationData) => {
  return request<DeleteInformationResult>({
    method: "DELETE",
    url: "/api/foru/information",
    withCredentials: true,
    params
  });
};

export default deleteInformationAPI;