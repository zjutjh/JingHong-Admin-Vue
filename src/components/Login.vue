<script setup lang="ts">
import { ref } from "vue";
import { NInput, NIcon, NButton } from "naive-ui";
import { 
    KeyOutline as KeyIcon,
    PersonOutline as PersonIcon
} from "@vicons/ionicons5";
import loginAPI from "../apis/UserAPI/login";
import { useRouter } from "vue-router";
import { useLoginStore } from "../store/index";
import pinia from "../store/store"

const router = useRouter();
const username = ref("");
const password = ref("");

const store = useLoginStore(pinia);

const handleLogin = async () => {
  try {
    const res = await loginAPI({
      username: username.value,
      password: password.value
    });
    if (res.code === 1) {
      localStorage.setItem("isLogin", "true");
      router.push("/");
    } else {
      throw new Error(res.msg);
    }
  } catch (e: any) {
    console.log(e);
  }
}

const handleReset = () =>{
  username.value = "";
  password.value = "";
} 

</script>

<template>
    <div class="title"><h2>管理员页面</h2></div>

    <n-icon size="30" class="person">
      <PersonIcon></PersonIcon>
    </n-icon>

    <n-icon size="32" class="key">
      <KeyIcon></KeyIcon>
    </n-icon>

    <div>
     <n-input  round placeholder="用户名"  v-model:value="username" 
     type="text" class="username"/>
    </div>
    <div>
     <n-input round placeholder="密码"  v-model:value="password"
     type="text" class="password"/>
    </div>
    <div>
     <n-button class="button1" @click="handleLogin" type="success">登录</n-button>
    </div>
    <div>
     <n-button class="button2" @click="handleReset" type="error">清空</n-button>
    </div>

</template>

<style scoped>
.title{  position: absolute;
    right: 15%;
    width: 20%;
    top:28%;
    font-family: Arial, Helvetica, sans-serif;
}
.username{
    position: absolute;
    right: 20%;
    width: 20%;
    top:36%;
}
.password{
    position: absolute;
    right: 20%;
    width:20%;
    top:42%;
}

.button1{
    position: absolute;
    right: 36%;
    top:48%;
}
.button2{
    position: absolute;
    right: 30%;
    top:48%;
}

.person{
    position: absolute;
    right: 41%;
    top:36%;
}
.key{
    position: absolute;
    right: 41%;
    top:43%;
}
</style>