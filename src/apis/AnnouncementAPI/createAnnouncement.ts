import request from "../request";

type CreateAnnouncementData = {
  title: string;
  content: string;
}

type CreateAnnouncementResult = Common.IResponse<null>;

const createAnnouncementAPI = (data: CreateAnnouncementData) => {
  return request<CreateAnnouncementResult>({
    method: "POST",
    url: "/api/admin/announcement/create",
    withCredentials: true,
    data
  })
}

export default createAnnouncementAPI;