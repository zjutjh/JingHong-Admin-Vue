<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  NSelect,
  NButton,
  NForm,
  NFormItem,
  NAlert,
  NSpace,
  NDatePicker,
  useDialog,
} from "naive-ui";
import getSystemInfo from "../apis/SystemInfoAPI/getSystemInfo";
import setTermInfoAPI from "../apis/TermTimeAPI/setTermInfo";
import PageTitle from "../components/PageTitle.vue";

const initialValue = ref({
  termYear: new Date().getFullYear().toString(),
  term: "上",
  termStartDate: "1970-01-01"
});

const termYearValue = ref(initialValue.value.termYear);
const termValue = ref(initialValue.value.term);
const termStartDateValue = ref(initialValue.value.termStartDate);
const dialog = useDialog();

onMounted(async () => {
  try {
    const { code, data, msg } = await getSystemInfo();
    if (code !== 1) throw new Error(msg);
    const { term, termStartDate, termYear } = data;
    termYearValue.value = termYear;
    termValue.value = term;
    termStartDateValue.value = termStartDate;
    initialValue.value = data;
  } catch (e) {
    console.log(e);
  }
});

const optionsTerm = [
  { label: "上", value: "上" },
  { label: "下", value: "下" },
  { label: "短", value: "短" },
];

const handleReset = () => {
  termYearValue.value = initialValue.value.termYear,
    termValue.value = initialValue.value.term,
    termStartDateValue.value = initialValue.value.termStartDate;
};

const handleSubmit = async () => {
  dialog.warning({
    title: "警告",
    content: `确认修改学期信息为: ${termYearValue.value}学年${termValue.value}学期 / ${termStartDateValue.value}`,
    positiveText: "确定",
    negativeText: "回去改一下",
    onPositiveClick: async () => {
      try {
        const res = await setTermInfoAPI({
          yearValue: termYearValue.value,
          termValue: termValue.value,
          termStartDateValue: termStartDateValue.value
        });
        const { code, msg } = res;
        if (code !== 1) throw new Error(msg);
      } catch (e) {
        console.log(e);
      }
    }
  });
};
</script>

<template>
  <page-title>学期时间编辑</page-title>
  <n-space style="padding: 0 24px">

  <n-form style="max-width: 400px">
    <n-form-item>
      <n-alert type="info" style="width: 400px">
        表单的初始值为当前系统的数据
      </n-alert>
    </n-form-item>
    <n-form-item label="学年选择">
      <n-date-picker v-model:formatted-value="termYearValue" value-format="yyyy" type="year" style="width: 400px" />
    </n-form-item>
    <n-form-item label="学期选择">
      <n-select v-model:value="termValue" :options="optionsTerm" clearable />
    </n-form-item>
    <n-form-item label="学期开始时间选择：">
      <n-date-picker v-model:formatted-value="termStartDateValue" value-format="yyyy-MM-dd" type="date"
        style="width: 400px" />
    </n-form-item>

    <n-form-item>
      <n-space>
        <n-button id="update" type="success" @click="handleSubmit">
          提交修改
        </n-button>
        <n-button secondary type="error" id="clear" @click="handleReset">
          重置表单
        </n-button>
      </n-space>
    </n-form-item>
  </n-form>
  </n-space>
</template>
