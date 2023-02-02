<script setup lang="ts">
import Top from '../components/Top.vue';
import Menu from '../components/Menu.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <Top />
  <section class="section">
    <aside class="sider">
      <Menu />
      <footer class="footer">精弘网络 @ {{ new Date().getFullYear() }}</footer>
    </aside>
    <main class="main">
        <RouterView />
      </main>
  </section>
</template>

<style lang="scss" scoped>
.sider {
  width: 240px;
  border-right: 1px solid rgba(0, 0, 0, .06);
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.section {
  display: flex;
}

.main {
  flex: 1;
  overflow-y: auto;
  padding: 0 24px;
  max-height: calc(100vh - 64px);
  box-sizing: border-box;
}

.footer {
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, .7);
  border-top: 1px solid rgba(0, 0, 0, .06);
  padding: 0 24px;
  height: 48px;
  box-sizing: border-box;
}
</style>
