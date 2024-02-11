import { createPinia } from "pinia";
import useUserStore from "./useUserStore";

const pinia = createPinia();

export default pinia;

export {
  useUserStore
};