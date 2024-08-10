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
  termStartDate: "1970-01-01",
  scoreTerm: "上",
  scoreYear: new Date().getFullYear().toString(),
  schoolBusUrl: "暂无",
  jpgUrl: "暂无",
  fileUrl: "暂无",
  registerTips: "暂无",
});

const termYearValue = ref(initialValue.value.termYear);
const termValue = ref(initialValue.value.term);
const termStartDateValue = ref(initialValue.value.termStartDate);
const scoreTermValue = ref(initialValue.value.scoreTerm);
const scoreYearValue = ref(initialValue.value.scoreYear);
const schoolBusUrlValue = ref(initialValue.value.schoolBusUrl);
const jpgUrlValue = ref(initialValue.value.jpgUrl);
const fileUrlValue = ref(initialValue.value.fileUrl);
const register = ref(initialValue.value.registerTips);
const dialog = useDialog();

const handleReset = async () => {
  termYearValue.value = initialValue.value.termYear,
  termValue.value = initialValue.value.term,
  termStartDateValue.value = initialValue.value.termStartDate,
  scoreTermValue.value = initialValue.value.scoreTerm,
  scoreYearValue.value = initialValue.value.scoreYear;
};

const noticeReset = async () => {
  register.value=initialValue.value.registerTips;
};

const urlReset = async () => {
  schoolBusUrlValue.value = initialValue.value.schoolBusUrl,
  jpgUrlValue.value = initialValue.value.jpgUrl,
  fileUrlValue.value = initialValue.value.fileUrl;
};



onMounted(async () => {
  try {
    const { code, data, msg } = await getSystemInfo();
    if (code !== 1) throw new Error(msg);
    const { term, termStartDate, termYear,scoreTerm,scoreYear,schoolBusUrl,jpgUrl,fileUrl,registerTips } = data;
    initialValue.value.termYear = termYear;
    initialValue.value.term = term;
    initialValue.value.termStartDate = termStartDate;
    initialValue.value.scoreTerm = scoreTerm;
    initialValue.value.scoreYear = scoreYear;
    initialValue.value.schoolBusUrl = schoolBusUrl;
    initialValue.value.jpgUrl = jpgUrl;
    initialValue.value.fileUrl = fileUrl;
    initialValue.value.registerTips = registerTips;
    initialValue.value = data;
  } catch (e) {
    console.log(e);
  }
  urlReset();
  noticeReset();
  //handleReset();
});
//this.$forceUpdate()


const optionsTerm = [
  { label: "上", value: "上" },
  { label: "下", value: "下" },
  { label: "短", value: "短" },
];



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
          termStartDateValue: termStartDateValue.value,
          scoreTermValue:scoreTermValue.value,
          scoreYearValue:scoreYearValue.value,
          jpgUrlValue: jpgUrlValue.value,
          fileUrlValue: fileUrlValue.value,
          schoolBusUrlValue:schoolBusUrlValue.value,
          registerTips:register.value,
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
        表单的初始值为当前系统的数据，刷新以查看
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
    <n-form-item label="成绩查询学年选择">
      <n-date-picker v-model:formatted-value="scoreYearValue" value-format="yyyy" type="year" style="width: 400px" />
    </n-form-item>
    <n-form-item label="成绩查询学期选择">
      <n-select v-model:value="scoreTermValue" :options="optionsTerm" clearable />
    </n-form-item>
    <n-form-item>
      <n-space>
        <n-button id="update" type="success" @click="handleSubmit">
          提交修改
        </n-button>
        <n-button secondary type="info" id="clear" @click="handleReset">
          刷新表单
        </n-button>
      </n-space>
    </n-form-item>
  </n-form>
  </n-space>

  <page-title>新生注册提醒</page-title>
  <n-space style="padding: 0 24px">

  <n-form style="max-width: 400px">
  <n-form-item>
    <n-alert type="info" style="width: 400px">
      表单的初始值为当前系统的数据，刷新以查看
    </n-alert>
  </n-form-item>
  <n-form-item>
    <n-input
      v-model:value="register"
      type="textarea"
      placeholder="请输入新生注册提醒"
    />
  </n-form-item>

  <n-form-item>
    <n-space>
      <n-button id="update" type="success" @click="handleSubmit">
        发布提醒
      </n-button>
      <n-button secondary type="info" id="clear" @click="noticeReset">
        刷新表单
      </n-button>
    </n-space>
  </n-form-item>
</n-form >
  </n-space>
  <page-title>链接编辑</page-title>
  <n-space style="padding: 0 24px">

<n-form style="max-width: 400px">
<n-form-item>
  <n-alert type="info" style="width: 400px">
    表单的初始值为当前系统的数据，刷新以查看
  </n-alert>
</n-form-item>
<n-form-item >
  <n-card title="图片链接" size="small" :bordered="false">
    <n-input
    v-model:value="jpgUrlValue"
    type="input"
    placeholder="请输入图片URL"
  />
  </n-card>

</n-form-item>
<n-form-item >
  <n-card title="文档链接" size="small" :bordered="false">
    <n-input
    v-model:value="fileUrlValue"
    type="input"
    placeholder="请输入文档URL"
  />
  </n-card>
</n-form-item>
<n-form-item >
  <n-card title="校车链接" size="small" :bordered="false">
  <n-input
    v-model:value="schoolBusUrlValue"
    type="input"
    placeholder="请输入校车URL"
  />
</n-card>
</n-form-item>

<n-form-item>
  <n-space>
    <n-button id="update" type="success" @click="handleSubmit">
      修改前缀
    </n-button>
    <n-button secondary type="info" id="clear" @click="urlReset">
      刷新表单
    </n-button>
  </n-space>
</n-form-item>
</n-form>
</n-space>
</template>
