<template>
  <PageTitle>失物寻物</PageTitle>
  <n-space v-show="changeFlag === 0" justify="space-between" style="padding: 0 24px">
    <n-space justify="start">
      <n-h3 prefix="bar">寻物启事列表</n-h3>
      <n-button type="info" @click="changeToLost">切换为失物启事</n-button>
    </n-space>
    <n-button type="primary" @click="handleOpenForm">添加寻物</n-button>
  </n-space>
  <n-space v-show="changeFlag === 1" justify="space-between" style="padding: 0 24px">
    <n-space justify="start">
      <n-h3 prefix="bar">失物启事列表</n-h3>
      <n-button type="info" @click="changeFunction">切换为寻物启事</n-button>
    </n-space>
    <n-button type="primary" @click="handleOpenForm">添加寻物</n-button>
  </n-space>
  <n-space style="padding: 0 24px">
    <n-data-table
      :columns="columns"
      :data="lostfoundList"
      scroll-x="600"
      :loading="loading"
    />
  </n-space>
</template>

<script lang="ts" setup>
import PageTitle from "@/components/PageTitle.vue";
import { useRequest } from "vue-request";
import * as LostfoundService from "@/apis/LostfoundAPI";
import PreviewCard from "./PreviewCard.vue";
import LostfoundForm from "./LostfoundForm.vue";
import {h, ref} from "vue";
import {NSpin, NSpace, NButton, useMessage, DataTableColumns} from "naive-ui";
// @ts-ignore
import VirtualList from "vue3-virtual-scroll-list";
import dayjs from "dayjs";

const changeFlag = ref(0); //界面切换寻物、失物，初始化为0，默认是寻物

const columns: DataTableColumns<LostfoundAPI.Item> = [
  {
    title: "ID",
    key: "id",
    width: 60,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "物品名称",
    key: "itemName",
    width: 120,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "拾得/遗失地点",
    width:180,
    key: "lost_or_found_place",
    ellipsis: {
      tooltip: false
    }
  },
  {
    title: "拾得/遗失时间",
    key: "lost_or_found_time",
    width: 120,
    render: (row) => dayjs(row.publish_time).format("YYYY-MM-DD HH:mm")
  },
  {
    title: "联系方式",
    key: "contact",
    width: 120,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "物品介绍",
    key: "introduction",
    width: 180,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "校区",
    key: "campus",
    width: 60,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "物品种类",
    key: "kind",
    width: 120,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "发布组织",
    key: "publisher",
    width: 180,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "发布时间",
    key: "publish_time",
    width: 200,
    ellipsis: {
      tooltip: true
    }
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

const {
  loading,
  run: getRecords
} = useRequest(LostfoundService.getRecordsAPI, {
  defaultParams: [{
    page_num: 1,
    page_size: 10
  }],
  onSuccess: (data) => {
    if (data.code === 1) {
      recordList.value = recordList.value?.concat(data.data.data || []);
      console.log(recordList.value);
      maxPage.value = data.data.total_page_num;
      currentPage.value++;
    }
  }
});
const showForm = ref(false);
const toEditData = ref<LostfoundAPI.Item>();
const recordList = ref<LostfoundAPI.Item[]>([]);
const message = useMessage();

const currentPage = ref(0);
const maxPage = ref(0);

const handleScrollToBottom = () => {
  if (loading.value || maxPage.value <= currentPage.value) return;
  else getRecords({
    page_num: currentPage.value + 1,
    page_size: 10,
  });
};

const handleCreateRecord = () => {
  toEditData.value = undefined;
  showForm.value = true;
};

const handleOpenForm = (state: boolean) => {
  showForm.value = state;
};

/** 重置虚拟列表 */
const resetList = () => {
  recordList.value = [],
  currentPage.value = 0;
  getRecords({ page_num: 1, page_size: 10 });
};

/**
 * 编辑结束后的回调
 * 在表单中已经过表单项校验
 * 直接发起请求
 * @param formData
 */
const handleFormFinish = async (formData: LostfoundAPI.Item) => {
  try {
    const res = !toEditData.value ?
     await LostfoundService.createRecordAPI(formData)
     : await LostfoundService.updateRecordAPI(formData);
    if (res.code === 1) {
      message.success("提交成功");
      resetList();
    } else {
      throw new Error(res.msg);
    }
    showForm.value = false;
    toEditData.value = undefined;
  } catch (e: any) {
    message.error(e.message || "未知错误");
  }

};

/**
 * 卡片点击回调
 * @param record
 */
const handleClickCard = (record: LostfoundAPI.Item) => {
  toEditData.value = record;
  showForm.value = true;
};

/**
 * 删除记录回调
 * @param id 记录 id
 */
const handleDelete = async (id: number) => {
  try {
    const res = await LostfoundService.deleteRecordAPI({ lost_id: id });
    if (res.code === 1) {
      showForm.value = false;
      toEditData.value = undefined;
      message.success("删除成功");
      resetList();
    } else {
      throw new Error(res.msg);
    }
  } catch (e: any) {
    message.error(`删除失败, ${e?.message || "未知错误"}`);
  }
};

</script>

<style lang="scss" scoped>

</style>