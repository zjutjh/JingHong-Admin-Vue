<script setup lang="ts">
import { ref } from "vue";
import { NInput,NIcon,NButton} from 'naive-ui';
import { 
    KeyOutline as KeyIcon,
    PersonOutline as PersonIcon
} from '@vicons/ionicons5';
import loginAPI from "../apis/login";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

const onClick1 = async () => {
  const res = await loginAPI({
    username: username.value,
    password: password.value
  });

  console.log(res);
  if (res.data.code === 1) {
    console.log("登录成功");
    router.push("/");
  } else {
    console.log("登录失败");
  }
}

const onClick2 = () =>{
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
     <n-button class="button1" @click="onClick1">登录</n-button>
    </div>
    <div>
     <n-button class="button2" @click="onClick2">清空</n-button>
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