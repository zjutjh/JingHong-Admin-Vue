import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("user", () => {
  const userInfo = ref<UserAPI.User>();

  /**
   * 登陆
   * @param user 用户信息
   * 更新用户信息以及登陆时间
   */
  const login = (user: UserAPI.User) => {
    userInfo.value = user;
    localStorage.setItem("passTime", new Date().getTime().toString());
  };

  /**
   * 登出
   * 删除用户信息以及上次登陆时间
   */
  const logout = () => {
    userInfo.value = undefined;
    localStorage.removeItem("passTime");
  };

  return {
    userInfo,
    login,
    logout
  };
});