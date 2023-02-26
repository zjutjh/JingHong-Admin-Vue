<script setup lang="ts">
   import { ref,onMounted } from "vue";
  import { NSpace,NLayout,NCard,NSelect,NButton} from 'naive-ui';
  import setAPI from "../apis/TermTimeAPI/TerminfoSet";
  import getAPI from '../apis/TermTimeAPI/TerminfoGet';
  const yearValue=ref("");
  const termValue=ref("");
  const termStartDate=ref("");
  const optionsYear = [
  {label:'2021' ,value:'2021'},
  {label:'2022' ,value:'2022'},
  {label:'2023' ,value:'2023'},
  {label:'2024' ,value:'2024'},
  ];

  const optionsTerm =[
  {label:'上' , value:'上'},
  {label:'下' , value:'下'},
  {label:'短' , value:'短'},
  ];
  const optionsTermStartDate =[
  {label:'2021-09-05' , value:'2021-09-05'},
  {label:'2022-09-05' , value:'2022-09-05'},
  {label:'2023-02-10' , value:'2023-02-10'},
  {label:'2024-02-10' , value:'2024-02-10'},
  ];

  const onClickClear =()=>{
    yearValue.value="",
    termValue.value="",
    termStartDate.value=""
  }

  const onClickUpdate = async()=>{
    if(yearValue.value!==""&&termValue.value!==""&&termStartDate.value!==""){   
    const res = await setAPI({
    yearValue:yearValue.value,
    termValue:termValue.value,
    termStartDate:termStartDate.value
    });
    console.log(res);
    alert("上传成功")}
    else alert("选项不能为空")
  }
  

  const setTermInfo = async()=>{
    const res = await setAPI();
    yearValue.value=res.data.date.yearValue;
    termValue.value=res.data.data.termTime;
    termStartDate.value=res.data.data.termStartDate;
    console.log("学期时间初始化成功")
    console.log(res);
  } //后端传值接口
 

</script>

<template>
<n-space>
  <n-layout>
   <h1 id="termTime">学期时间编辑</h1>
   <n-card id="card">
    <n-space vertical>
    学年选择：
    <n-select  v-model:value="yearValue" :options="optionsYear" clearable/>
    学期选择：
    <n-select  v-model:value="termValue"  :options="optionsTerm" clearable/>
    学期开始时间选择：
    <n-select  v-model:value="termStartDate"  :options="optionsTermStartDate" clearable/>
    </n-space>
    <n-button id="update" type="success" @click="onClickUpdate()">上交</n-button> <n-button type="warning" id="clear" @click="onClickClear()">清空</n-button>
   </n-card>
  </n-layout>
</n-space>
</template>

<style scoped>
.n-layout{
height:100%;
width: auto;
top: 80px;
position: absolute;
left: 12%;
right: 0px;
background-color:white;
}

#card{
width: 50%;
}

#clear{
  position: relative;
  left: 10px;
  top: 8px;
}

#update{
  position: relative;
  top: 8px;
}

#termTime{
position: relative;
left: 1%;
}
</style>