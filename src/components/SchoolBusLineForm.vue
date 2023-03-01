<script lang="ts" setup>
import { NForm, NH2, NFormItem, NInput, NTimePicker, NSelect, NButton, NSpace } from "naive-ui";
import { SchoolBusAddress } from "../constants/SchoolBusAddress";
import { ref } from "vue";

const props = defineProps<{
  record?: SchoolBusAPI.Line;
}>()
const emit = defineEmits(["finish"]);

const addressOptions = SchoolBusAddress.map(item => (
  { label: item, value: item }
))

const initalValue = ref(props.record);
const formData = ref<Partial<SchoolBusAPI.Line>>({
  ...initalValue.value
});

const handleSubmit = () => {
  emit("finish", { value: formData.value });
}

const handleReset = () => {
  // TODO: fix reset data
  formData.value = {
    ...initalValue.value
  }
}
</script>

<template>
  <n-h2 prefix="dot">编辑线路</n-h2>
  <n-form>
    <n-form-item label="线路名称">
      <n-input v-model:value="formData.line" placeholder="请输入路线名称" />
    </n-form-item>

    <n-form-item label="出发地点">
      <n-select 
        v-model:value="formData.departure" 
        placeholder="请选择校车出发地点" 
        :options="addressOptions" 
      />
    </n-form-item>

    <n-form-item label="目的地">
      <n-select 
        v-model:value="formData.destination" 
        placeholder="请选择校车目的地" 
        :options="addressOptions" 
      />
    </n-form-item>

    <n-form-item label="出发时间">
      <n-time-picker
      v-model:formatted-value="formData.startTime"
      format="HH:mm:ss"
      />
    </n-form-item>

    <n-form-item>
      <n-space>
        <n-button type="success" @click="handleSubmit">提交</n-button>
        <n-button secondary type="error" @click="handleReset">重置</n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>
