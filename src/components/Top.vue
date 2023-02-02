<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import {
  PersonOutline as PersonIcon,
  LogInOutline as LogInIcon
} from '@vicons/ionicons5';

</script>
  
<template>
  <header>
    <div class="brand">
      <n-icon size="24">
        <person-icon />
      </n-icon>
      <h1>精弘管理员页面</h1>
    </div>
    <div class="user-info">
      <span>用户名</span>
      <n-button type="default" round>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        注销
      </n-button>
    </div>
  </header>
</template>
  
<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid rgba(0, 0, 0, .06);
  box-sizing: border-box;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;

  h1 {
    font-size: 1.2rem;
  }
}

.user-info {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
