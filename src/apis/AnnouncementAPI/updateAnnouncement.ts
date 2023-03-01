import request from "../request";

type UpdateAnnouncementData = Omit<
  AnnouncementAPI.Announcement,
  "publishTime"
>;

type UpdateAnnouncementResult = Common.IResponse<null>;

const updateAnnouncementAPI = (data: UpdateAnnouncementData) => {
  return request<UpdateAnnouncementResult>({
    method: "POST",
    url: "/api/admin/announcement/update",
    withCredentials: true,
    data
  })
}

export default updateAnnouncementAPI;