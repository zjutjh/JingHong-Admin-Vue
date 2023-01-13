<script setup lang="ts">
  import { NAnchor,NAnchorLink,NSpace } from 'naive-ui'
</script>

<template>
<n-space>
  <n-anchor>
    <n-anchor-link>
     <n-anchor-link title="校车时间维护" href="#SchoolBusTime" />
     <n-anchor-link title="学期时间修改" href="#SemeterTime" />
     <n-anchor-link title="编辑通知与发送" href="#NotificationAndSending" />
     <n-anchor-link title="待定"  />
    </n-anchor-link>
  </n-anchor>
</n-space>
</template>

<style>
.n-anchor-link{
    /* position: fixed;
    left: 0px;
    top:6%; */
    height: 600px;
}
.n-anchor{
    background-color: white;
    height:100%;
    position: fixed;
    width:12%;
    left: 0%;
    top:80px;
}
</style>