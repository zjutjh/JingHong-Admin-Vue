import { createPinia } from "pinia";
import useUserStore from "./useUserStore";
import useMangerStore from "./useMangerStore";

const pinia = createPinia();

export default pinia;

export {
  useUserStore,
  useMangerStore
};