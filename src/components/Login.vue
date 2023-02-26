<script setup lang="ts">
import { ref } from "vue";
import { NInput,NIcon,NButton,NSpace,NLayout} from 'naive-ui';
import { 
    KeyOutline as KeyIcon,
    PersonOutline as PersonIcon
} from '@vicons/ionicons5';

import loginAPI from "../apis/Login";
import { useRouter } from "vue-router";
import { useLoginStore } from "../store";
import pinia from "../store/store"

const store = useLoginStore(pinia);

const router = useRouter();
const isLoginSuccess = ref(false);
const username = ref("");
const password = ref("");

const onClick1 = async () => {
  const res = await loginAPI({
    username: username.value,
    password: password.value
  });

  console.log(res);
  if (res.data.code === 200) {
    console.log("登录成功");
    alert("登陆成功");
    isLoginSuccess.value = true;
    store.setToken();
    router.push("Announcement");
  } else {
    console.log("登录失败");
    alert("账号或者密码输入错误");
  }
}

const onClick2 = () =>{
    username.value = "";
    password.value = "";
} 

</script>

<template>
<n-space>
  
  <n-layout id="layout">

  <div class="title"><h2>管理员页面</h2></div>

  <n-space space-around>
    <n-icon size="30" class="person">
      <PersonIcon></PersonIcon>
    </n-icon>

    <n-input  round placeholder="用户名"  v-model:value="username" 
     type="text" class="username"/>
  </n-space>

  <n-space space-around>
    <n-icon size="32" class="key">
      <KeyIcon></KeyIcon>
    </n-icon>

     <n-input round placeholder="密码"  v-model:value="password"
      type="password" :maxlength="10"
      show-password-on="mousedown"
      class="password"/>
  </n-space>
  
  <n-space space-around>
     <n-button class="button1" @click="onClick1">登录</n-button>
     <n-button class="button2" @click="onClick2">清空</n-button>
  </n-space>
  <div id="photo">
    <a href="https://github.com/zjutjh" target="_blank">
      <img src="../assets/JH.png" class="logo" alt="JH logo" />
    </a>
  </div>
  </n-layout>
</n-space>

</template>

<style scoped>
#layout{
  top: 20%;
  left: 40%;
  width: 500px;
  height: 500px;
  background-color: white;
  position: absolute;
}

.title{
  left: 70px;
  position: relative;
}

.button1{
  position: relative;
  top: 3px;
  left: 45px;
}

.button2{
  position: relative;
  top: 3px;
  left: 45px;
}

.logo{
   height: 20em;
}

#photo{
    text-align: center;
    background-color: #fff;
    border-radius: 20px;
    width: 300px;
    height: 300px;
    margin: auto;
    position: relative;
    right: 120px;
    top: 20px;
    
    }
</style>