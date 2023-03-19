<script setup lang="ts">
import PageTitle from "@/components/PageTitle.vue";
import { useUserStore } from "@/store";
import { NH2, NH3, NSpace } from "naive-ui";

const { userInfo } = useUserStore();

</script>

<template>
  <page-title>Dashboard</page-title>
  <section class="container">
    <n-space align="baseline">
      <n-h2> 欢迎! </n-h2>
      <n-h3>{{ userInfo?.username }}</n-h3>
    </n-space>
  </section>
</template>

<style scoped>
.container {
  padding: 0 24px;
}
</style>