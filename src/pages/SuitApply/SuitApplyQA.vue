<script setup lang="ts">
import { ref, h, computed } from "vue";
import { useRequest } from "vue-request";
import dayjs from "dayjs";
import {
    NButton,
    NDataTable,
    DataTableColumns,
    NPageHeader,
    NSpace,
    useMessage,
    NModal,
    NH3
} from "naive-ui";
import * as SuitApplyQAService from "@/apis/SuitApplyQAAPI";
import SuitApplyQAForm from "@/components/SuitApplyQAForm.vue";

const showModal = ref(false);
const toEditData = ref<SuitApplyQAAPI.SuitApplyQA>();
const message = useMessage();

const suitApplyQAList = computed(() => {
  return suitApplyQADate.value?.data;
});

const {
  data: suitApplyQADate,
  run: getSuitApplyQA,
  loading
} = useRequest(SuitApplyQAService.getSuitApplyQAAPI, {
  onSuccess: (data) => {
    if (data.code !== 1) throw new Error(data.msg);
  },
  onError: (e) => {
    console.log(e);
    message.error(`请求数据失败, ${e.message} || "未知错误"`);
  }
});

const columns: DataTableColumns<SuitApplyQAAPI.SuitApplyQA> = [
  {
    title: "标题",
    key: "title",
    width: 200,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "内容",
    minWidth: 200,
    key: "content",
    ellipsis: {
      tooltip: false
    }
  },
  {
    title: "发布时间",
    key: "publish_time",
    width: 200,
    render: (row) => dayjs(row.publish_time).format("YYYY-MM-DD HH:mm")
  },
  {
    title: "操作",
    fixed: "right",
    width: 100,
    key: "action",
    render: (row) => h(
      NSpace, () => [
        h(NButton, {
          text: true,
          size: "small",
          type: "warning",
          onClick: () => handleUpdate(row, true),
        }, () => "编辑"),
        h(NButton, {
          text: true,
          size: "small",
          type: "error",
          onClick: () => handleRemove(row.id),
        }, () => "删除"),
      ]
    )
  },
];

const emit = defineEmits(["open"]);

const handleBack = () => {
  emit("open", false);
};

const handleUpdate = (record: SuitApplyQAAPI.SuitApplyQA, state: boolean) => {
  showModal.value = state;
  toEditData.value = record;
};

const handleCreate = () => {
  toEditData.value = undefined;
  showModal.value = true;
};

const handleRemove = async (id: SuitApplyQAAPI.SuitApplyQA["id"]) => {
  try {
    const res = await SuitApplyQAService.deleteSuitApplyQAAPI({ id: id });
    if (res.code === 1) {
      showModal.value = false;
      toEditData.value = undefined;
      message.success("删除成功");
    }
    else throw new Error(res.msg);
  } catch (e: any) {
    console.log(e);
    message.error(`删除失败，${e.message || "未知错误"}`);
  }
  getSuitApplyQA();
};

const handleFinish = async (e: {
  value: SuitApplyQAAPI.SuitApplyQA
}) => {
  showModal.value = false;
  if (toEditData.value) {
    try {
      const res = await SuitApplyQAService.updateSuitApplyQAAPI(e.value);
      if (res.code === 1) message.success("修改成功");
      else throw new Error(res.msg);
    } catch (e: any) {
      console.log(e);
      message.error(`修改失败，${e.message || "未知错误"}`);
    }
  } else {
    try {
      const res = await SuitApplyQAService.createSuitApplyQAAPI(e.value);
      if (res.code === 1) message.success("创建成功");
      else throw new Error(res.msg);
    } catch (e: any) {
      console.log(e);
      message.error(`创建失败，${e.message || "未知错误"}`);
    }
  }
  getSuitApplyQA();
};
</script>

<template>
    <section class="container">
      <n-page-header @back="handleBack">
        <template #title> 问答页面 </template>
      </n-page-header>
      <n-space align="baseline" justify="space-between" style="padding: 0 24px">
        <n-h3 prefix="bar"> 问答列表 </n-h3>
        <n-button type="primary" @click="handleCreate">新增问答</n-button>
      </n-space>
      <n-space style="padding: 0 24px">
        <n-data-table
          :columns="columns"
          :data="suitApplyQAList"
          scroll-x="600"
          :loading="loading"
        />
      </n-space>
      <n-modal v-model:show="showModal" preset="card" style="width: 840px">
        <SuitApplyQA-form :record="toEditData" @finish="handleFinish"/>
      </n-modal>
    </section>
</template>

<style lang="scss" scoped>
.container {
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