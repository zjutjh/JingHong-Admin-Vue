import {defineStore}from 'pinia'
import {ref} from 'vue'

export const useLoginStore = defineStore('main', () => {
  let is_login : boolean=false;
  // const is_login=ref(false);
  let token : string="";
  
  function getToken(){
    return is_login || localStorage.getItem("token")
  }

  function setToken(){
    is_login=true;
    token="success";
    console.log(is_login);
    localStorage.setItem('token', token);
    console.log('store、localstorage保存token成功！');
  }

  function delToken(){
    token="";
    localStorage.removeItem("token");    
  }

  return { token,is_login,setToken,delToken,getToken }
})

// export default useLoginStore;

// export default {
//   setup() {
//     const store = useLoginStore()
//     return {
//       store,
//     }
//   },
// }