<script setup lang="ts">
import Login from '../components/Login.vue';
import { NButton } from 'naive-ui';

const clear1 = () =>{
    localStorage.clear();
    console.log(localStorage.token);
} 

</script>

<template>
  <div id="photo">
    <a href="https://github.com/zjutjh" target="_blank">
      <img src="../assets/JH.png" class="logo" alt="JH logo" />
    </a>
  </div>
  <n-button type="error" @click="clear1" round>
          点击清除缓存(测试用，点击后登录数据删除)
  </n-button>
  <Login></Login>
</template>


<style scoped>
.logo{ height: 20em;
}
#photo{ text-align: center;
    background-color: #fff;
    border-radius: 20px;
    width: 300px;
    height: 300px;
    margin: auto;
    position: absolute;
    top: 15%;
    left: 0;
    right: 70%;
    bottom: 30%;}
</style>