import request from "../request";

type UploadPhotoData = FormData;

type UploadPhotoResult = Common.IResponse<string>;

const uploadPhotoAPI = (data: UploadPhotoData) => {
  return request<UploadPhotoResult>({
    method: "POST",
    url: "/api/foru/upload_img",
    headers: { "Content-Type": "multipart/form-data" },
    data,
  });
};

export default uploadPhotoAPI;