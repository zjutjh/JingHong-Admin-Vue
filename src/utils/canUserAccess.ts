import getUserInfoAPI from "../apis/getUserInfo"

export const canUserAccess = async () => {
  try {
    const res = await getUserInfoAPI();
    if (res.data.code === 1) return true
  } catch (error) {
    console.log(error);
  }
  return false;
}