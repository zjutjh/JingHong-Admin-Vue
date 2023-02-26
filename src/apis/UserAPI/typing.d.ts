declare namespace UserAPI {
  interface BindState {
    card: boolean;
    lib: boolean;
    yxy: boolean;
    zf: boolean;
  }

  interface User {
    bind: BindState;
    createTime: string;
    id: number;
    phoneNum: string;
    studentID: string;
    username: string;
    userType: number;
  }
}
