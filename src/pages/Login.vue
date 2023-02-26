<script setup lang="ts">
import Login from '../components/Login.vue';
import { NButton } from 'naive-ui';

const clear1 = () =>{
    localStorage.clear();
    console.log(localStorage.token);
} 

</script>

<template>
  <n-button type="error" @click="clear1" round>
          点击清除缓存(测试用，点击后登录数据删除)
  </n-button>
  <Login></Login>
</template>


<style scoped>
</style>