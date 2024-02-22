import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("manger", () => {
  const containId = ref(true);
  const setContianId = (id: boolean) => {
    containId.value = id;
  };
  /* 控制suitManger页面为 待审批/审批清点 */

  const campusState_inventory = ref("朝晖");
  const setCampusState_inventory = (campus: string) => {
    campusState_inventory.value = campus;
  };

  return {
    containId,
    setContianId,
    campusState_inventory,
    setCampusState_inventory
  };
});