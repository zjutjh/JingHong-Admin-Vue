import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("manger", () => {
  const containId = ref(true);
  const setContianId = (id: boolean) => {
    containId.value = id;
  };
  /* 控制suitManger页面为 待审批/审批清点 */

  const campusState = ref("朝晖");
  const setCampusState = (campus: string) => {
    campusState.value = campus;
  };
  const campusState_index = ref("button1");
  const setCampusState_index = (campus: string) => {
    campusState_index.value = campus;
  };
  return {
    containId,
    setContianId,
    campusState,
    setCampusState,
    campusState_index,
    setCampusState_index
  };
});