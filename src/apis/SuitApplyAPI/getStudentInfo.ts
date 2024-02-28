import request from "../request";

type input = {
  student_id: number
};

type output = {
  code: number;
  data: {
    college: string;
    contact: string;
    dormitory: string;
    gender: string;
    id: number;
    name: string;
    student_id: string;
  };
  msg: string;
}

const getStudentInfoAPI = (params: input) => {
  return request<output>({
    method: "GET",
    url: "/api/stuac/supplies-borrow/student-info",
    params: params,
  });
};

export default getStudentInfoAPI;