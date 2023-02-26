import getUserInfoAPI from "../apis/UserAPI/getUserInfo";

export const canUserAccess = async () => {
  try {
    const res = await getUserInfoAPI();
    if (res.code === 1) return true;
    else throw new Error(res.msg);
  } catch (error) {
    localStorage.setItem("isLogin", "false");
    console.log(error);
  }
  return false;
};
