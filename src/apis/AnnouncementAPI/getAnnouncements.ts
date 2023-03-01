import request from "../request";

type GetAnnouncementResult = Common.IResponse<AnnouncementAPI.Announcement[]>

const getAnnouncementsAPI = () => {
  return request<GetAnnouncementResult>({
    method: "POST",
    url: "/api/announcement",
    withCredentials: true,
  })
}

export default getAnnouncementsAPI;