<script setup lang="ts">
import { RouterView } from "vue-router";
import { NDialogProvider, NMessageProvider } from "naive-ui";
import "@/styles/index.scss";
</script>

<template>
  <n-dialog-provider>
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-dialog-provider>
</template>
