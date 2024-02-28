<template>
  <section class="form-container">
    <n-page-header @back="handleBack">
      <template #title>归还清点</template>
    </n-page-header>
    <n-space style="width: 688px">
      <n-form style="width:688px">
        <n-form-item>
          <n-space>
            <n-card :bordered="false" title="编号" style="width: 275px;height:43px">
              {{ source.id }}
            </n-card>
            <n-card :bordered="false" title="姓名" style="width: 275px;height:43px">
              {{ source.name }}
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-space>
          <n-card :bordered="false" title="学号" style="width: 275px;height:43px">
              {{ source.student_id }}
            </n-card>
            <n-card :bordered="false" title="性别" style="width: 275px;height:43px">
              {{ source.gender }}
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-space>
          <n-card :bordered="false" title="寝室号" style="width: 275px;height:43px">
            {{ source.dormitory }}
            </n-card>
            <n-card :bordered="false" title="学院" style="width: 275px;height:43px">
              {{ source.college }}
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-space>
          <n-card :bordered="false" title="联系方式" style="width: 275px;height:43px">
            {{ source.contact }}
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
              {{ campus }}
            </n-card>
            <n-card :bordered="false" title="种类" style="width: 275px;height:43px">
              {{ source.kind }}
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-space>
          <n-card :bordered="false" title="名称" style="width: 275px;height:43px">
            {{ source.supplies_name }}
            </n-card>
            <n-card :bordered="false" title="规格" style="width: 275px;height:43px">
              {{ source.spec }}
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-space>
          <n-card :bordered="false" title="数量" style="width: 275px;height:43px">
            {{ source.count }}
            </n-card>
            <n-card :bordered="false" title="库存" style="width: 275px;height:43px">
            {{ form.stock }}
            </n-card>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-button v-if="isLoan" type="primary" style="left: 19px;top: 37px;" @click="showCheck">
            确认归还
          </n-button>
          <n-button v-if="!isLoan" type="primary" style="left: 19px;top: 37px;" @click="showBack">
            取消确认归还
          </n-button>
          <n-button v-if="isLoan && source.kind == '正装'" type="error" secondary style="left: 39px ;top: 37px" @click="showReject">
            取消借用
          </n-button>
          <n-button v-if="isLoan && source.kind !== '正装' " type="error" secondary style="left: 39px ;top: 37px" @click="showDelReject">
            删除
          </n-button>
        </n-form-item>
      </n-form>
    </n-space>
  </section>
  <n-modal v-model:show="showModalCheck">
      <n-card
        style="width: 400px"
        title="确认归还"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div
          style="display: flex; justify-content: space-around; margin-top: 30px"
        >
          <n-button type="primary" @click="check"
            >确认归还</n-button
          >
          <n-button @click="showModalCheck = false">取消</n-button>
        </div>
      </n-card>
    </n-modal>
    <n-modal v-model:show="showModalBack">
      <n-card
        style="width: 400px"
        title="确认取消归还"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div
          style="display: flex; justify-content: space-around; margin-top: 30px"
        >
          <n-button type="primary" @click="back"
            >确认取消归还</n-button
          >
          <n-button @click="showModalBack = false">取消</n-button>
        </div>
      </n-card>
    </n-modal>
    <n-modal v-model:show="showModalReject">
      <n-card
        style="width: 400px"
        title="确认取消借用"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div
          style="display: flex; justify-content: space-around; margin-top: 30px"
        >
          <n-button type="primary" @click="reject"
            >确认取消借用</n-button
          >
          <n-button @click="showModalReject = false">取消</n-button>
        </div>
      </n-card>
    </n-modal>
    <n-modal v-model:show="showModaldelReject">
      <n-card
        style="width: 400px"
        title="确认删除"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div
          style="display: flex; justify-content: space-around; margin-top: 30px"
        >
          <n-button type="primary" @click="reject"
            >确认删除</n-button
          >
          <n-button @click="showModaldelReject = false">取消</n-button>
        </div>
      </n-card>
    </n-modal>
</template>
<script setup lang="ts">
import {
  NForm,
  NFormItem,
  NPageHeader,
  NSpace,
  NButton,
  useMessage,
} from "naive-ui";
import {toRefs , reactive , computed ,ref} from "vue";
import * as SuitApplyService from "@/apis/SuitApplyAPI";
import { GetSuitAPI } from "@/apis/SuitApplyAPI/index";
//import type suitcheckitem from "@/apis/typing";
import { useRequest } from "vue-request";
import { Datum } from "@/apis/SuitApplyAPI/getRecord";

const showModalCheck = ref (false);
const showModalBack = ref(false);
const showModalReject = ref(false);
const showModaldelReject = ref(false);

const emit = defineEmits(["finish", "delete", "open"]);
const message = useMessage();
const props = defineProps<{
  source:Datum;
  campus:string;
}>();
const {source ,campus} = toRefs(props);

const form = reactive({
  stock:0
});

const isLoan = computed(() => {
  return source.value.status === 3;
});

const updateSize = () => {
  useRequest(GetSuitAPI({
    campus: ( campus.value === "朝晖" ? 1 : (campus.value ==="屏峰" ? 2 : 3) )
  }),{
    onSuccess: (data) => {
      console.log(data);
      const resData = data.data;
      if (data.code !== 1) throw new Error(data.msg);
      else{
        for(let i=0; i<resData.length; i++){
          if(resData[i].campus == (campus.value === "朝晖" ? 1 : (campus.value==="屏峰" ? 2 : 3))){
            if(resData[i].name == source.value.supplies_name){
              for(let j=0; j<resData[i].specs.length;j++){
                if(resData[i].specs[j].spec == source.value.spec){
                  form.stock = resData[i].specs[j].stock;
                }
              }
            }
          }
        }
      }
    },
    onError: (e) => {
      console.log(e);
      message.error(`请求数据失败, ${e.message} || "未知错误"`);
    },
  });
};

const handleBack = () => {
  emit("open", false);
};

const check = () => {
  useRequest(SuitApplyService.suppliesReturnAPI({
    supplies_return: 1,
    id: source.value.id,
  }),{
    onSuccess: (data) =>{
        if(data.code==1){
          message.success("已处理归还");
          emit("open",false);
        }
    },
  });
};

const reject = () => {
  useRequest(SuitApplyService.suppliesReturnAPI({
    supplies_return: 2,
    id: source.value.id,
  }),{
    onSuccess: (data) =>{
      if(data.code==1){
        message.success("已取消借出");
        emit("open",false);
      }
      },
  });
};

const back = () => {
  useRequest(SuitApplyService.suppliesCancleAPI({
    id:source.value.id
  }),{
    onSuccess:(data) =>{
      if(data.code==1){
        message.success("已取消归还状态");
        emit("open",false);
      }
      }
  });
};

updateSize();

const showCheck = () => {
  showModalCheck.value = true;
};
const showBack = () => {
  showModalBack.value = true;
};
const showDelReject = () => {
  showModaldelReject.value = true;
};
const showReject = () => {
  showModalReject.value = true;
};
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