import request from "../request";

type DeleteAnnouncementData = {
  id: AnnouncementAPI.Announcement["id"];
}

type DeleteAnnouncementResult = Common.IResponse<null>;

const deleteAnnouncementAPI = (data: DeleteAnnouncementData) => {
  return request<DeleteAnnouncementResult>({
    method: "POST",
    url: "/api/admin/announcement/delete",
    withCredentials: true,
    data
  });
};

export default deleteAnnouncementAPI;