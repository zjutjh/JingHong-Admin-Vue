<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import {
  LogInOutline as LogInIcon,
  Menu as MenuIcon
} from "@vicons/ionicons5";
import { useRouter } from "vue-router";
import { useUserStore } from "../store";
import logo from "@/assets/favicon.svg";

const router = useRouter();
const userStore = useUserStore();
const emit = defineEmits(["expandMenu"]);

const { userInfo } = userStore;

const handleLogout = () => {
  userStore.logout();
  router.push("/login");
};

const handleShowMenu = () => {
  emit("expandMenu");
};

</script>

<template>
  <header class="header">
    <div class="expand">
      <n-button quaternary circle @click="handleShowMenu">
        <n-icon size="22">
          <menu-icon />
        </n-icon>
      </n-button>
    </div>
    <a class="brand" href="/dashboard">
      <n-icon size="24">
        <img :src="logo" style="width: 100%" />
      </n-icon>
      <span>WeJH-CMS</span>
    </a>
    <div class="user-info">
      <span class="name">{{ userInfo?.username }} </span>
      <n-button
        @click="handleLogout"
        secondary
        round
      >
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        注销
      </n-button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid rgba(0, 0, 0, .06);
  box-sizing: border-box;
}

.expand {
  display: none;
}

@media screen and (max-width: 600px) {

  .header {
    font-size: 14px;
  }
  .expand {
    display: block;
  }

  .user-info {
    .name {
      display: none;
    }
  }
}

.brand {
  text-decoration: none;
  color: #000;
  transition: .3s;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  white-space: nowrap;

  span {
    font-size: 1.1em;
    font-weight: 600;
  }
}

.brand:active {
  background-color: rgba(0, 0, 0, .06);
}

.user-info {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
