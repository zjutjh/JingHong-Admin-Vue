<script setup lang="ts">
  import { NSpace,NLayout,NLoadingBarProvider,NMessageProvider,NNotificationProvider,NDialogProvider,NButton,NButtonGroup } from 'naive-ui'
  import  SchoolBusData  from './SchoolBusData.vue'
</script>

<template>
<n-space>
  <n-layout>
    <h1 id="BusTime">校车时间编辑</h1>
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <SchoolBusData></SchoolBusData>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
      <router-link tag="li" to="/SchoolBusAdd" name="SchoolBusAdd">
        <n-button type="success" round>
          增加新的记录
        </n-button>
      </router-link>
  </n-layout>
</n-space>
</template>

<style scoped>
.n-layout{
height:100%;
width: auto;
top: 80px;
position: absolute;
left: 12%;
right: 0px;
background-color: white;
}
</style>