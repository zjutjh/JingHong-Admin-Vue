<script setup lang="ts">
import Login from "../components/Login.vue";
import { onMounted } from "vue";
import { canUserAccess } from "../utils/canUserAccess";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(async () => {
  const isLogin = localStorage.getItem("isLogin");
  if (isLogin === "true") {
    const state = await canUserAccess();
    if (state === true) router.push({
      path: "/"
    })
  }
})

</script>

<template>
  <div id="photo">
    <a href="https://github.com/zjutjh" target="_blank">
      <img src="../assets/JH.png" class="logo" alt="JH logo" />
    </a>
  </div>
  <Login></Login>
</template>


<style scoped>
.logo{ height: 20em;
}
#photo{ text-align: center;
    background-color: #fff;
    border-radius: 20px;
    width: 300px;
    height: 300px;
    margin: auto;
    position: absolute;
    top: 15%;
    left: 0;
    right: 70%;
    bottom: 30%;}
</style>