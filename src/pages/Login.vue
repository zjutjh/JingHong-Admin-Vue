<script setup lang="ts">
import { onMounted, ref } from "vue";
import { NInput,
  NH1,
  NSpace,
  NButton,
  NForm,
  NFormItem,
  NMessageProvider,
  useMessage
} from "naive-ui";
import loginAPI from "../apis/UserAPI/login";
import { useUserStore } from "../store";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const message = useMessage();

onMounted(() => {
  if (localStorage.getItem("passTime")) {
    router.push("/");
  }
});

const username = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const res = await loginAPI({
      username: username.value,
      password: password.value
    });
    if (res.code === 1) {
      userStore.login(res.data.user);
      router.push("/");
    } else {
      throw new Error(res.msg);
    }
  } catch (e: any) {
    console.log(e);
    message.error(`登陆失败, ${e?.message || "未知错误"}`);
  }
};

const handleReset = () => {
  username.value = "";
  password.value = "";
};

</script>

<template>
  <main class="page-container">
    <section class="logo-wrapper" style="justify-content: flex-end;">
      <a class="gh-link" href="https://github.com/zjutjh" target="_blank">
        <img src="../assets/jh-logo.png" class="logo" />
      </a>
    </section>

    <section>
      <n-space vertical style="flex: auto">
        <n-h1>微精弘管理系统</n-h1>
        <n-form style="max-width: 400px; min-width: 300px;">
          <n-form-item label="账号" size="large">
            <n-input placeholder="精弘通行证账号" v-model:value="username" />
          </n-form-item>
          <n-form-item label="密码" size="large">
            <n-input placeholder="密码" v-model:value="password" type="password" />
          </n-form-item>
          <n-space>
            <n-button round @click="handleLogin" type="success">登录</n-button>
            <n-button round @click="handleReset" type="error">清空</n-button>
          </n-space>
        </n-form>
      </n-space>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .page-container {
    flex-direction: column;
  }

  .logo-wrapper {
    flex: 0 20% !important;
    flex-direction: column;
  }

  .gh-link {
    text-align: center;
    .logo {
      width: 50% !important;
    }
  }

  section {
    padding: 0 32px !important;
  }
}

.page-container {
  height: 100vh;
  display: flex;

  .gh-link {
    display: block;

    .logo {
      width: 320px;
    }
  }

  section {
    flex: 0 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 48px;
  }
}
</style>
