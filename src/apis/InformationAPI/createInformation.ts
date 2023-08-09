import request from "../request";

type CreateInformationData = {
  title: string;
  content: string;
  img1: string | null;
  img2: string | null;
  img3: string | null;
}

type CreateInformationResult = Common.IResponse<null>;

const createInformationAPI = (data: CreateInformationData) => {
  return request<CreateInformationResult>({
    method: "POST",
    url: "/api/foru/information",
    withCredentials: true,
    data
  });
};

export default createInformationAPI;