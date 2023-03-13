import { computed } from "vue";
import { useUserStore } from "../store";
import { UserType } from "../constants/UserType";

interface IAccess {
  canSeeAdmin: boolean;
  canSeeLostfound: boolean;
}

/**
 * 用户权限检查
 * @returns 可见性
 */
const useAccess = () => {
  const userStore = useUserStore();

  const access = computed<IAccess>(() => {
    return {
      canSeeAdmin: userStore.userInfo?.userType === UserType.ADMIN,
      canSeeLostfound: userStore.userInfo?.userType === UserType.FORYOU,
    }
  })

  return access;
}

export default useAccess;