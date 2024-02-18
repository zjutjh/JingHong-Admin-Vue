<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{
  title?: string;
  content?: string;
  publishTime?: string;
}>();

</script>

<template>
  <div class="card">
    <div class="header">{{ props.title || "请输入标题" }}</div>
    <div class="body">{{ (props.content || "请输入内容").replace(/\\n/g, '\n') }}</div>
    <template v-if="props.publishTime">
      <div class="footer">发布于：{{ dayjs(props.publishTime).format("YYYY年MM月DD日") }} </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  border-radius: 8px;
  box-shadow: 1Px 1Px 8Px 1Px rgba(0,0,0,.1);

  .header {
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 16px 0;
    border-bottom: 1Px solid #eee;
  }
  .body {
    font-size: .875rem;
    padding: 12px 0;
    white-space: break-spaces;
    color: #333;
  }

  .footer {
    font-size: .75rem;
    padding: 12px;
    border-top: 1Px solid #eee;
    color: #999;
    text-align: end;
  }
}
</style>