<script setup lang="ts">
  import { NSpace,NLayout} from 'naive-ui'
  import SchoolBusTime from './SchoolBusTime.vue'
  import SemeterTime from './SemeterTime.vue'
  import NotificationAndSending from './NotificationAndSending.vue'
</script>

<template>
<n-space>
  <n-layout>
   <SchoolBusTime></SchoolBusTime>
   <SemeterTime></SemeterTime>
   <NotificationAndSending></NotificationAndSending>
  </n-layout>
</n-space>
</template>

<style scoped>
.n-layout{
height:2000px;
width: auto;
top: 80px;
position: absolute;
left: 12.5%;
right:0px;
background-color:white;
}
</style>