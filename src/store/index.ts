import { createPinia } from "pinia";
import useUserStore from "./useUserStore";
import useLostFoundStore from "@/store/useLostFoundStore";
const pinia = createPinia();

export default pinia;

export {
  useUserStore,
  useLostFoundStore
};