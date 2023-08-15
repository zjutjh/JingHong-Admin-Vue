import {defineStore} from 'pinia'
import {ref} from 'vue'

export default defineStore('lostfound', () => {
  const lostfoundFlag = ref(false);
  const setLostfoundFlag = (flag: bool) => {
    lostfoundFlag.value = flag;
  };
  return {
    lostfoundFlag,
    setLostfoundFlag
  };
});