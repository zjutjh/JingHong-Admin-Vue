<script setup lang="ts">
  import {NLayout} from 'naive-ui';
  import {NSpace}from 'naive-ui';
  import {NLayoutHeader}from 'naive-ui';
  import {NButton}from 'naive-ui';
</script>

  <template>
    <n-space vertical size="large">
      <n-layout>
        <n-layout-header>
          <p id="Title">精弘管理员页面</p>
          <n-button id="Login">
             登录
          </n-button>
        </n-layout-header>
      </n-layout>
    </n-space>
  </template>
  
  <style scoped>
  .n-layout-header {
    /* background: rgba(128, 128, 128, 0.2); */
    background-color:gainsboro;
    /* padding: 1%; */
    height:80px;
    width:100%;
    position: fixed;
    left: 0px;
    right:0px;
    top:0px;
  }

  #Title{
    position:fixed;
    left: 5%;
    top:12px;
  }

  #Login{
    background:white;
    position:fixed;
    right:10%;
    top:20px;
  }
  </style>
