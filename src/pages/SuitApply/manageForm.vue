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
              <n-select v-model:value="form.gender" :options="genderOptions" />
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
            <n-input v-model:value="form.contact" type="text" placeholder="请输入手机号码" />
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
            <n-select  v-model:value="form.supplies_name" :options="newnameOptions"></n-select>
            </n-card>
            <n-card :bordered="false" title="规格" style="width: 275px;height:43px">
              <n-select  v-model:value="form.spec" :options="newsizeOptions"></n-select>
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-space>
          <n-card :bordered="false" title="数量" style="width: 275px;height:43px">
            <n-input-number v-model:value="form.count" :min="1" :max="form.stock" clearable />
            </n-card>
            <n-card :bordered="false" title="库存" style="width: 275px;height:43px">
              {{ form.stock }}
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-button v-if="!isReject" type="primary" style="left: 19px;top: 37px;" @click="changeAndCheck">
            通过
          </n-button>
          <n-button v-if="!isReject" type="error" secondary style="left: 39px ;top: 37px" @click="showModal">
            否决
          </n-button>
          <n-button v-if="isReject" type="error" secondary style="left: 39px ;top: 37px" @click="rejectCancel">
            取消否决
          </n-button>
        </n-form-item>
      </n-form>
    </n-space>
  </section>
  <n-modal v-model:show="showModalConfirmReject">
      <n-card
        style="width: 400px"
        title="确认否决"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div
          style="display: flex; justify-content: space-around; margin-top: 30px"
        >
          <n-button type="primary" @click="reject"
            >确认否决</n-button
          >
          <n-button @click="showModalConfirmReject = false">取消</n-button>
        </div>
      </n-card>
    </n-modal>
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
  NModal,
} from "naive-ui";
import { toRefs , reactive , watch , computed, ref} from "vue";
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

const genderOptions = [
  {
    label:"男",
    value:"男"
  },
  {
    label:"女",
    value:"女",
  },
];

type Person = {
  label:string,
  value:string
};
let nameOptions : Person[]= [];
const newnameOptions = ref<Person[]>([]);
let sizeOptions : Person[]= [];
const newsizeOptions = ref<Person[]>([]);
const emit = defineEmits(["open"]);
const message = useMessage();
const showModalConfirmReject = ref(false);
const props = defineProps<{
  source:Datum;
  campus:string;
}>();
const {source ,campus} = toRefs(props);

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
            const newArray = [{label:resData[i].name,value:resData[i].name}];
            nameOptions = nameOptions.concat(newArray);
            newnameOptions.value = nameOptions;
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
              for(let j=0; j<resData[i].specs.length;j++){
                const newArray = [{label:resData[i].specs[j].spec,value:resData[i].specs[j].spec}];
                sizeOptions = sizeOptions.concat(newArray);
                 newsizeOptions.value = sizeOptions;
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

const showModal = () => {
  showModalConfirmReject.value = true;
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
        else{
          message.error(data.msg);
        }
    },
  });
};

const changeAndCheck = () =>{
  if(!isEmpty.value){
    const phoneRegex = /^1\d{10}$/;
    if (phoneRegex.test(form.contact)){
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
          check();
        }
      },
    });
    }
    else{
      message.error("请输入正确的手机号格式");
    }
  }
  else{
    message.error("所有信息都不可为空");
  }
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
  newnameOptions.value = [];
  nameOptions = [];
  newsizeOptions.value = [];
  sizeOptions = [];
};

updateName();
updateSize();

watch(
  () =>form.spec,
  () => {
  resetForm();
  if(form.supplies_name !== "" && form.spec != "" ){
  updateSize();
  updateName();
  }
});

watch(
  () =>form.campus,
  () => {
    form.supplies_name="";
    form.spec="";
    resetForm();
    updateName();
    updateSize();
});
watch(
  () =>form.supplies_name,
  () => {
    form.spec="";
    resetForm();
    if(form.supplies_name !== ""){
    updateName();
    updateSize();
    }
});

const isEmpty = ref(false);
watch(
  () =>[form.name,form.gender,form.college,form.contact,form.dormitory],
  () =>{
    if(form.name === "" || form.gender === "" || form.college === "" || form.contact === "" || form.dormitory === ""){
      isEmpty.value = true;
    }
    else{
      isEmpty.value = false;
    }
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
  left: 0;
  top: 0;
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>