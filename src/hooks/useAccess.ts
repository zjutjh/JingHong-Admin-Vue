import { computed } from "vue";
import { useUserStore } from "../store";
import { UserType } from "../constants/UserType";

interface IAccess {
  canNotSeeNormal: boolean;
  canSeeAdmin: boolean;
  canSeeLostfound: boolean;
  canSeeInformation: boolean;
}

/**
 * 用户权限检查
 * @returns 可见性
 */
const useAccess = () => {
  const userStore = useUserStore();

  const access = computed<IAccess>(() => {
    return {
      canNotSeeNormal: userStore.userInfo?.userType !== UserType.DEFAULT,
      canSeeAdmin: userStore.userInfo?.userType === UserType.ADMIN,
      canSeeLostfound: userStore.userInfo?.userType === UserType.FORYOU
       || userStore.userInfo?.userType === UserType.ZHSTUAC
       || userStore.userInfo?.userType === UserType.PFSTUAC
       || userStore.userInfo?.userType === UserType.MGSSTUAC,
      canSeeInformation: userStore.userInfo?.userType === UserType.FORYOU
    };
  });

  return access;
};

export default useAccess;