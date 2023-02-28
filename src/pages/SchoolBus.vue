<script setup lang="ts">
import { NDataTable, NButton, NSpace, NH3, NModal, useMessage } from "naive-ui"
import PageTitle from "../components/PageTitle.vue";
import type { DataTableColumns } from "naive-ui"
import { computed, h, ref } from "vue"
import { useRequest } from "vue-request";
import SchoolBusLineForm from "../components/SchoolBusLineForm.vue";
import * as BusServices from "../apis/SchoolBusAPI";

const showModal = ref(false);
const toEditData = ref<SchoolBusAPI.Line>();
const message = useMessage();

const { 
  data: lineData, 
  run: getCurrentLines, 
  loading 
} = useRequest(BusServices.getCurrentLinesAPI, {
  onSuccess: (data) => {
    if (data.code !== 200)
      throw new Error(data.msg);
  },
  onError: (e) => {
    message.error(`请求数据失败${e.message}`)
  }
});

const weekdayLines = computed(() => {
  if (lineData.value) {
    return lineData.value.data.filter(item => item.type === 0);
  } else return [];
})

const weekendLines = computed(() => {
  if (lineData.value) {
    return lineData.value.data.filter(item => item.type === 1);
  } else return [];
})

const handleCreate = () => {
  toEditData.value = undefined;
  showModal.value = true;
}

/** 
 * 处理点击编辑
 * 打开编辑表单
 * @param record 线路实例
 */
const handleUpdate = (record: SchoolBusAPI.Line) => {
  toEditData.value = record;
  showModal.value = true;
}

/**
 * 处理点击删除
 * @param id 线路 id
 */
const handleRemove = async (id: number) => {
  console.log(id);
  const { code, msg } = await BusServices.deleteSchoolBusLineAPI({ id });
  if (code === 1) {
    message.success("删除成功");
  } else {
    message.error(`删除失败, ${msg}`);
  }
  getCurrentLines();
}

/**
 * 处理表单完成编辑
 * @param e 点击事件实例
 */
const handleFinish = async (e: {
  value: SchoolBusAPI.Line
}) => {
  showModal.value = false;
  
  if (!toEditData.value) {
    // 若表单缓存为 `undefined` 则请求新建接口
    const { code, msg }= await BusServices.createSchoolBusAPI(e.value);
    if (code === 1) {
      message.success("新建成功");
    } else {
      message.error(`新建失败, ${msg}`);
    }
  } else {
    // 否则请求更新接口
    const { code, msg } = await BusServices.updateSchoolBusAPI(e.value);
    if (code === 1) {
      message.success("修改成功");
    } else {
      message.error(`修改失败, ${msg}`);
    }
  }
  toEditData.value = undefined;
  getCurrentLines();
}

/** 表格列元数据 */
const columns: DataTableColumns<SchoolBusAPI.Line> = [
  { title: "ID", key: "id" },
  { title: "路线", key: "line" },
  { title: "出发地", key: "departure" },
  { title: "目的地", key: "destination" },
  { title: "出发时间", key: "startTime" },
  {
    title: "操作",
    key: "action",
    render(row) {
      return h(
        NSpace, () => [
          h(NButton, {
            text: true,
            size: "small",
            type: "warning",
            onClick: () => handleUpdate(row),
          }, () => "编辑"),
          h(NButton, {
            text: true,
            size: "small",
            type: "error",
            onClick: () => handleRemove(row.id),
          }, () => "删除")
        ])
    }
  }
];
</script>

<template>
  <n-space align="center" justify="space-between">
    <page-title :isLoadingData="loading">校车时间编辑</page-title>
    <n-button type="success" @click="handleCreate">添加线路</n-button>
  </n-space>

  <n-space vertical size="large">
    <n-space vertical size="small">
      <n-h3 prefix="bar">工作日校车</n-h3>
      <n-data-table :columns="columns" :data="weekdayLines" />
    </n-space>
    <n-space vertical size="small">
      <n-h3 prefix="bar">周末校车</n-h3>
      <n-data-table :columns="columns" :data="weekendLines" />
    </n-space>
  </n-space>
  <n-modal 
    v-model:show="showModal" 
    preset="card"
    style="width: 600px"
  >
    <SchoolBusLineForm 
      :record="toEditData" 
      @finish="handleFinish"
    />
  </n-modal>
</template>
