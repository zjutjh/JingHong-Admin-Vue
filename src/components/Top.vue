<script setup lang="ts">
import {NLayout,NSpace,NLayoutHeader,NButton,NIcon,NButtonGroup,useMessage} from 'naive-ui';
import {
  PersonOutline as PersonIcon,
  KeyOutline as KeyIcon,
  LogInOutline as LogInIcon
 } from '@vicons/ionicons5';
import { RouterLink } from 'vue-router';

</script>
  
  <template>
    <n-space vertical size="large">
      <n-layout>
        <n-layout-header> 
          <n-space space-around>
          <n-icon size="30" id="person-icon">
             <person-icon />
          </n-icon>
          <p id="Title">精弘管理员页面</p>
         </n-space>
        </n-layout-header>
      </n-layout>
      <div id="logOff">
      <n-button-group size="small">
        <router-link tag="li" to="/Login">
        <n-button type="warning" round >
          <template #icon>
            <n-icon><log-in-icon /></n-icon>
          </template>
          注销
        </n-button>
        </router-link>
      </n-button-group>
      </div>
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

 
  
  #logOff{
    position:fixed;
    right:2%;
    top:25px;
  }

  a {
  text-decoration: none;
  }

  .router-link-active {
  text-decoration: none;
  }

  #person-icon{
    position: relative;
    top: 20px;
    left: 28px;
  }

  #Title{
    position: relative;
    top: 12px;
    left: 20px;
  }


  </style>
