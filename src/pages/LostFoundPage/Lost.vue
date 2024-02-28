<template>
  <page-title>失物寻物</page-title>
  <n-space justify="space-between" style="padding: 0 24px">
    <n-space justify="start">
      <n-h3 prefix="bar">失物招领列表</n-h3>
      <n-button type="info" @click="switchLostOrFound">切换为寻物启事</n-button>
    </n-space>
    <n-button type="primary" @click="handleCreate">添加失物</n-button>
  </n-space>
  <n-space style="padding: 0 24px" justify="end">
    <n-data-table
      :columns="columns"
      :data="records"
      scroll-x="600"
      :loading="loading"
    />
    <n-pagination
      size="large"
      :page="pagination.page"
      :page-count="pagination.total"
      :on-update:page="handleClickPagination"
    />
  </n-space>
  <lost-form
    v-if="showForm"
    @delete="handleRemove"
    @open="handleUpdate"
    @finish="handleFinish"
    :initialValue="toEditData"
  />
</template>

<script setup lang="ts">
import { ref, h, computed } from "vue";
import dayjs from "dayjs";
import {
  NSpace,
  NButton,
  NDataTable,
  NPagination,
  DataTableColumns,
  useMessage,
  NH3,
} from "naive-ui";
import { useRequest } from "vue-request";
import PageTitle from "@/components/PageTitle.vue";
import {useRouter} from "vue-router";
import LostForm from "@/components/LostForm.vue";
import * as LostfoundService from "@/apis/LostfoundAPI";
const router = useRouter();
const pagination = ref({ page: 0, total: 0 });
const showForm = ref(false);
const toEditData = ref<LostfoundAPI.LostItem>();
const message = useMessage();
const switchLostOrFound = () => {
  router.push("/found");
};
const {
  loading,
  run: getRecords,
  data: rawData
} = useRequest(LostfoundService.getRecordsAPI<"失物">, {
  defaultParams: [{
    page_num: 1,
    page_size: 10,
    lost_or_found: "失物"
  }],
  onSuccess: (data) => {
    if (data.code === 1) {
      pagination.value.total = data.data.total_page_num;
    }
  },
  onError: (e) => {
    console.log(e);
    message.error(`请求数据失败, ${e.message} || "未知错误"`);
  }
});
const records = computed(() => {
  return rawData.value?.data.data;
});
const handleCreate = () => {
  toEditData.value = undefined;
  showForm.value = true;
};
const handleClickPagination = (page: number) => {
  pagination.value.page = page;
  getRecords({page_num: page, page_size: 10, lost_or_found: "失物"});
};
const handleUpdate = (record: LostfoundAPI.LostItem, state: boolean) => {
  showForm.value = state;
  toEditData.value = record;
};
const handleRemove = async (id: LostfoundAPI.LostItem["id"]) => {
  try {
    const res = await LostfoundService.deleteRecordAPI({lost_id: id});
    if (res.code === 1) {
      showForm.value = false;
      toEditData.value = undefined;
      message.success("删除成功");
    }
    else throw new Error(res.msg);
  } catch (e: any) {
    console.log(e);
    message.error(`删除失败，${e.message || "未知错误"}`);
  }
  await getRecords({page_num: pagination.value.page, page_size: 10, lost_or_found: "失物"});
};
const handleFinish =  async (formData: { campus: string; kind: string; type: boolean; content: string; publisher: string; img1: string | null; img2: string | null; img3: string | null; item_name: string; lost_or_found_place: string; lost_or_found_time: string; pickup_place: string; contact: string; introduction: string; }) => {
  try {
    const res = !toEditData.value
      ? await LostfoundService.createRecordAPI(formData)
      : await LostfoundService.updateRecordAPI(formData);
    if (res.code === 1) {
      message.success("提交成功");
    } else {
      throw new Error(res.msg);
    }
    showForm.value = false;
    toEditData.value = undefined;
  } catch (e: any) {
    message.error(e.message || "未知错误");
  }
  await getRecords({page_num: 1, page_size: 10, lost_or_found: "失物"});
  pagination.value.page = 1;
};
const columns: DataTableColumns<LostfoundAPI.LostItem> = [
  {
    title: "ID",
    key: "id",
    width: 50,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "物品名称",
    key: "item_name",
    width: 120,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "拾得地点",
    width: 120,
    key: "lost_or_found_place",
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "拾得时间",
    key: "lost_or_found_time",
    width: 80,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "领取地点",
    key: "pickup_place",
    width: 175,
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
    width: 80,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "物品种类",
    key: "kind",
    width: 80,
    ellipsis: {
      tooltip: true
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
</script>