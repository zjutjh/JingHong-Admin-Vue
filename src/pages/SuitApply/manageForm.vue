<template>
  <section class="form-container">
    <n-page-header @back="handleBack">
      <template #title>审批申请</template>
    </n-page-header>
    <n-space style="width: 688px">
      <n-form style="width:688px">
        <n-form-item>
          <n-space>
            <n-card :bordered="false" title="编号" style="width: 275px;height:43px">
              {{ source.id }}
            </n-card>
            <n-card :bordered="false" title="姓名" style="width: 275px;height:43px">
              <n-input v-model:value="form.name" type="text" placeholder="请输入姓名" />
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-space>
          <n-card :bordered="false" title="学号" style="width: 275px;height:43px">
              {{ source.student_id }}
            </n-card>
            <n-card :bordered="false" title="性别" style="width: 275px;height:43px">
              <n-input v-model:value="form.gender" type="text" placeholder="请输入性别" />
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-space>
          <n-card :bordered="false" title="寝室号" style="width: 275px;height:43px">
            <n-input v-model:value="form.dormitory" type="text" placeholder="请输入寝室号" />
            </n-card>
            <n-card :bordered="false" title="学院" style="width: 275px;height:43px">
              <n-input v-model:value="form.college" type="text" placeholder="请输入学院名" />
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-space>
          <n-card :bordered="false" title="联系方式" style="width: 275px;height:43px">
            <n-input v-model:value="form.contact" type="text" placeholder="请输入联系方式" />
            </n-card>
          </n-space>
        </n-form-item>
      </n-form>
    </n-space>
    <n-divider style="left: 19px;width: 634px;" />
    <n-space style="width: 688px">
      <n-form style="width:688px">
        <n-form-item>
          <n-space>
            <n-card :bordered="false" title="校区" style="width: 275px;height:43px">
              <n-select v-model:value="form.campus" :options="campusOptions" />
            </n-card>
            <n-card :bordered="false" title="种类" style="width: 275px;height:43px">
              正装
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-space>
          <n-card :bordered="false" title="名称" style="width: 275px;height:43px">
            <n-select :key="refreshKey" v-model:value="form.supplies_name" :options="nameOptions"></n-select>
            </n-card>
            <n-card :bordered="false" title="规格" style="width: 275px;height:43px">
              <n-select :key="refreshNextKey" v-model:value="form.spec" :options="sizeOptions"></n-select>
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-space>
          <n-card :bordered="false" title="数量" style="width: 275px;height:43px">
            <n-input-number v-model:value="form.count" clearable />
            </n-card>
            <n-card :bordered="false" title="库存" style="width: 275px;height:43px">
              {{ form.stock }}
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-button v-if="!isReject" type="primary" style="left: 19px;top: 37px;" @click="check">
            同意
          </n-button>
          <n-button v-if="!isReject" type="error" secondary style="left: 39px ;top: 37px" @click="reject">
            否决
          </n-button>
          <n-button v-if="!isReject" type="info" third style="left: 59px ;top: 37px" @click="change">
            确认修改
          </n-button>
          <n-button v-if="isReject" type="error" secondary style="left: 39px ;top: 37px" @click="rejectCancel">
            取消否决
          </n-button>
        </n-form-item>
      </n-form>
    </n-space>

  </section>
</template>
<script setup lang="ts">
import {
  NForm,
  NFormItem,
  NPageHeader,
  NSelect,
  NSpace,
  NButton,
  useMessage,
} from "naive-ui";
import { toRefs , reactive , watch ,computed} from "vue";
import * as SuitApplyService from "@/apis/SuitApplyAPI";
import { GetSuitAPI } from "@/apis/SuitApplyAPI/index";
//import type suitcheckitem from "@/apis/typing";
import { useRequest } from "vue-request";
import { Datum } from "@/apis/SuitApplyAPI/getRecord";

const campusOptions = [
  {
    label:"朝晖",
    value:"朝晖"
  },
  {
    label:"屏峰",
    value:"屏峰"
  },
  {
    label:"莫干山",
    value:"莫干山",
  },
];
const nameOptions: any[] =[];
const sizeOptions: any[] =[];
const emit = defineEmits(["open"]);
const message = useMessage();
const props = defineProps<{
  source:Datum;
  campus:string;
}>();
const {source ,campus} = toRefs(props);
let refreshKey = 0;
let refreshNextKey = 100;

const form = reactive({
  campus:campus.value,
  supplies_name:source.value.supplies_name,
  name:source.value.name,
  gender:source.value.gender,
  dormitory:source.value.dormitory,
  college:source.value.college,
  contact:source.value.contact,
  count:source.value.count,
  spec:source.value.spec,
  stock:0,
  supplies_id:-1
});

const handleBack = () => {
  emit("open", false);
};

const updateName = () => {
  useRequest(GetSuitAPI({
    campus: ( form.campus === "朝晖" ? 1 : (form.campus==="屏峰" ? 2 : 3) )
  }),{
    onSuccess: (data) => {
      const resData = data.data;
      if (data.code !== 1) throw new Error(data.msg);
      else{
        for(let i=0; i<resData.length; i++){
          if(resData[i].campus == (form.campus === "朝晖" ? 1 : (form.campus==="屏峰" ? 2 : 3))){
            nameOptions.push({label:resData[i].name,value:resData[i].name});
          }
        }
      }
    },
    onError: (e) => {
      if(!form.supplies_name || !form.spec){
      message.error("请选择完整数据");
      }
      else{
      console.log(e);
      message.error(`请求数据失败, ${e.message} || "未知错误"`);
      }
    },
  });
};

const updateSize = () => {
  useRequest(GetSuitAPI({
    campus: ( form.campus === "朝晖" ? 1 : (form.campus==="屏峰" ? 2 : 3) )
  }),{
    onSuccess: (data) => {
      const resData = data.data;
      if (data.code !== 1) throw new Error(data.msg);
      else{
        for(let i=0; i<resData.length; i++){
          if(resData[i].campus == (form.campus === "朝晖" ? 1 : (form.campus==="屏峰" ? 2 : 3))){
            if(resData[i].name == form.supplies_name){
              console.log(resData[i]);
              for(let j=0; j<resData[i].specs.length;j++){
                sizeOptions.push({label:resData[i].specs[j].spec,value:resData[i].specs[j].spec});
                if(resData[i].specs[j].spec == form.spec){
                  form.stock = resData[i].specs[j].stock;
                  form.supplies_id = resData[i].specs[j].id;
                }
              }
            }
          }
        }
      }
    },
    onError: (e) => {
      if(!form.supplies_name || !form.spec){
      message.error("请选择完整数据");
      }
      else{
      console.log(e);
      message.error(`请求数据失败, ${e.message} || "未知错误"`);
      }
    },
  });
};

const change = () =>{
  useRequest(SuitApplyService.SetRecordAPI({
    id: source.value.id,
    name:form.name,
    gender:form.gender,
    college:form.college,
    supplies_id:form.supplies_id,
    dormitory: form.dormitory,
    count: form.count,
    contact: form.contact
  }),{
    onSuccess: (data) =>{
      if (data.code !== 1) throw new Error(data.msg);
      else{
        message.success("修改成功");
      }
    },
  });
};

const check = () => {
  useRequest(SuitApplyService.suppliesCheckAPI({
    supplies_check: 1,
    id:source.value.id,
  }),{
    onSuccess: (data) =>{
        if(data.code==1){
        message.success("已同意申请");
        emit("open",false);
        }
    },
  });
};

const reject = () => {
  useRequest(SuitApplyService.suppliesCheckAPI({
    supplies_check: 2,
    id: source.value.id,
  }),{
    onSuccess: (data) =>{
      if(data.code==1){
      message.success("已否决申请");
      emit("open",false);
    }},
  });
};

const rejectCancel = () => {
  useRequest(SuitApplyService.SetRejectCancelAPI({
    id: source.value.id,
  }),{
    onSuccess: (data) =>{
      if(data.code==1){
      message.success("已取消否决");
      emit("open",false);
    }},
  });
};

const resetForm = () => {
  nameOptions.splice(0, nameOptions.length);
  sizeOptions.splice(0, sizeOptions.length);
};

updateName();
updateSize();

watch(
  () =>form.spec,
  () => {
  refreshNextKey +=1;
  resetForm();
  updateSize();
});

watch(
  () =>form.campus,
  () => {
    refreshKey +=1;
    refreshNextKey +=1;
    form.supplies_name="";
    form.spec="";
    resetForm();
    updateName();
    updateSize();
});
watch(
  () =>form.supplies_name,
  () => {
    refreshNextKey +=1;
    form.spec="";
    resetForm();
    updateName();
    updateSize();
    console.log(sizeOptions);
    console.log(nameOptions);
});
const isReject = computed(() => {
  return source.value.status === 2;
});
</script>
<style>
.form-container {
  box-sizing: border-box;
  padding: 16px 24px;
  background-color: var(--wjh-color-background);
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>