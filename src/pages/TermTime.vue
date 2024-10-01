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
  useDialog, useMessage,
} from "naive-ui";
import getSystemInfo from "../apis/SystemInfoAPI/getSystemInfo";
import setTermInfoAPI from "../apis/TermTimeAPI/setTermInfo";
import PageTitle from "../components/PageTitle.vue";
const message = useMessage();
const initialValue = ref();

onMounted(async () => {
  try {
    const { code, data, msg } = await getSystemInfo();
    if (code !== 1) throw new Error(msg);
    const { term, termStartDate, termYear,scoreTerm,scoreYear,schoolBusUrl,jpgUrl,fileUrl,register } = data;
      initialValue.value = {
      termYear: termYear,
      term: term,
      termStartDate: termStartDate,
      scoreTerm: scoreTerm,
      scoreYear: scoreYear,
      schoolBusUrl: schoolBusUrl,
      jpgUrl: jpgUrl,
      fileUrl: fileUrl,
      registerTips: register,
    };
  } catch (e) {
    console.log(e);
  }
});
//this.$forceUpdate()
const dialog = useDialog();

const optionsTerm = [
  { label: "上", value: "上" },
  { label: "下", value: "下" },
  { label: "短", value: "短" },
];



const handleSubmit = async () => {
  dialog.warning({
    title: "警告",
    content: `确认修改学期信息为: ${initialValue.value.termYear}学年${initialValue.value.term}学期 / ${initialValue.value.termStartDate}`,
    positiveText: "确定",
    negativeText: "回去改一下",
    onPositiveClick: async () => {
      try {
        const res = await setTermInfoAPI({
          yearValue: initialValue.value.termYear,
          termValue: initialValue.value.term,
          termStartDateValue: initialValue.value.termStartDate,
          scoreTermValue:initialValue.value.scoreTerm,
          scoreYearValue:initialValue.value.scoreYear,
          jpgUrlValue: initialValue.value.jpgUrl,
          fileUrlValue: initialValue.value.fileUrl,
          schoolBusUrlValue: initialValue.value.schoolBusUrl,
          registerTips: initialValue.value.registerTips,
        });
        const { code, msg } = res;
        if (code !== 1) throw new Error(msg);
        message.success("修改成功");
      } catch (e) {
        console.log(e);
      }
    }
  });
};

const submit = async  () => {
  try {
    const res = await setTermInfoAPI({
      yearValue: initialValue.value.termYear,
      termValue: initialValue.value.term,
      termStartDateValue: initialValue.value.termStartDate,
      scoreTermValue:initialValue.value.scoreTerm,
      scoreYearValue:initialValue.value.scoreYear,
      jpgUrlValue: initialValue.value.jpgUrl,
      fileUrlValue: initialValue.value.fileUrl,
      schoolBusUrlValue: initialValue.value.schoolBusUrl,
      registerTips: initialValue.value.registerTips,
    });
    const { code, msg } = res;
    if (code !== 1) throw new Error(msg);
    message.success("修改成功");
  } catch (e: any) {
    message.error(e);
  }
}

</script>

<template>
  <page-title>学期时间编辑</page-title>
  <n-space style="padding: 0 24px">

  <n-form style="max-width: 400px" v-if="initialValue">
    <n-form-item label="学年选择">
      <n-date-picker v-model:formatted-value="initialValue.termYear" value-format="yyyy" type="year" style="width: 400px" />
    </n-form-item>
    <n-form-item label="学期选择">
      <n-select v-model:value="initialValue.term" :options="optionsTerm" clearable />
    </n-form-item>
    <n-form-item label="学期开始时间选择：">
      <n-date-picker v-model:formatted-value="initialValue.termStartDate" value-format="yyyy-MM-dd" type="date"
        style="width: 400px" />
    </n-form-item>
    <n-form-item label="成绩查询学年选择">
      <n-date-picker v-model:formatted-value="initialValue.scoreYear" value-format="yyyy" type="year" style="width: 400px" />
    </n-form-item>
    <n-form-item label="成绩查询学期选择">
      <n-select v-model:value="initialValue.scoreTerm" :options="optionsTerm" clearable />
    </n-form-item>
    <n-form-item>
      <n-space>
        <n-button id="update" type="success" @click="handleSubmit">
          提交修改
        </n-button>
      </n-space>
    </n-form-item>
  </n-form>
  </n-space>

  <page-title>新生注册提醒</page-title>
  <n-space style="padding: 0 24px">

  <n-form style="max-width: 400px" v-if="initialValue">
  <n-form-item>
    <n-input
      v-model:value="initialValue.registerTips"
      type="textarea"
      placeholder="请输入新生注册提醒"
      style="width: 400px"
    />
  </n-form-item>

  <n-form-item>
    <n-space>
      <n-button id="update" type="success" @click="submit">
        发布提醒
      </n-button>
    </n-space>
  </n-form-item>
</n-form >
  </n-space>
  <page-title>链接编辑</page-title>
  <n-space style="padding: 0 24px">

<n-form style="max-width: 400px" v-if="initialValue">
<n-form-item >
  <n-card title="图片链接" size="small" :bordered="false">
    <n-input
    v-model:value="initialValue.jpgUrl"
    type="text"
    placeholder="请输入图片URL"
    style="width: 400px"
  />
  </n-card>

</n-form-item>
<n-form-item >
  <n-card title="文件链接" size="small" :bordered="false">
    <n-input
    v-model:value="initialValue.fileUrl"
    type="text"
    placeholder="请输入文件URL"
    style="width: 400px"
  />
  </n-card>
</n-form-item>
<n-form-item >
  <n-card title="校车链接" size="small" :bordered="false">
  <n-input
    v-model:value="initialValue.schoolBusUrl"
    type="text"
    placeholder="请输入校车URL"
    style="width: 400px"
  />
</n-card>
</n-form-item>

<n-form-item>
  <n-space>
    <n-button id="update" type="success" @click="submit">
      修改前缀
    </n-button>
  </n-space>
</n-form-item>
</n-form>
</n-space>
</template>
