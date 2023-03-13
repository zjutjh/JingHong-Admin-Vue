<script setup lang="ts">
import { NSpin, NSpace } from "naive-ui";

const props = defineProps<{
  isLoadingData?: boolean
  loadingText?: string
}>();

</script>

<template>
  <n-space class="page-title" align="baseline">
    <h1><slot /></h1>
    <n-space size="small" v-if="props.isLoadingData">
      <n-spin :size="10"/>
      <span style="font-size: 8">
        {{ loadingText ? loadingText : "加载中" }}
      </span>
    </n-space>
  </n-space>

</template>

<style lang="scss" scoped>

.page-title {
  display: flex;
  padding: 0 24px;
  gap: 12px;

  span {
    font-size: 12px;
    color: rgba(0, 0, 0, .4);
  }
}

</style>