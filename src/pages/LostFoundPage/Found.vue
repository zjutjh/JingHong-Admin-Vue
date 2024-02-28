<template>
  <page-title>失物寻物</page-title>
  <n-space justify="space-between" style="padding: 0 24px">
    <n-space justify="start">
      <n-h3 prefix="bar">寻物启事列表</n-h3>
      <n-button type="info" @click="switchLostOrFound">切换为失物招领</n-button>
    </n-space>
    <n-button type="primary" @click="handleCreate">添加寻物</n-button>
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
  <found-form
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
  DataTableColumns,
  NPagination,
  useMessage,
  NH3,
} from "naive-ui";
import { useRequest } from "vue-request";
import PageTitle from "@/components/PageTitle.vue";
import { useRouter } from "vue-router";
import FoundForm from "@/components/FoundForm.vue";
import * as LostfoundService from "@/apis/LostfoundAPI";
const router = useRouter();
const pagination = ref({
  page: 1,
  total: 1,
});
const showForm = ref(false);
const toEditData = ref<LostfoundAPI.FoundItem>();
const message = useMessage();
const switchLostOrFound = () => {
  router.push("/lost");
};
const {
  loading,
  run: getRecords,
  data: rawData
} = useRequest(LostfoundService.getRecordsAPI<"寻物">, {
  defaultParams: [{
    page_num: pagination.value.page,
    page_size: 10,
    lost_or_found: "寻物"
  }],
  onSuccess: (data) => {
    if (data.code === 1) {
      pagination.value = { ...pagination.value, total: data.data.total_page_num };
    }
    return data.data.data;
  },
  onError: (e) => {
    console.log(e);
    message.error(`请求数据失败, ${e.message} || "未知错误"`);
  }
});
const records = computed(() => {
  return rawData.value?.data.data || [];
});
const handleCreate = () => {
  toEditData.value = undefined;
  showForm.value = true;
};
const handleClickPagination = (page: number) => {
  pagination.value.page = page;
  getRecords({page_num: page, page_size: 10, lost_or_found: "寻物"});
};
const handleUpdate = (record: LostfoundAPI.FoundItem, state: boolean) => {
  showForm.value = state;
  toEditData.value = record;
};
const handleRemove = async (id: LostfoundAPI.FoundItem["id"]) => {
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
  getRecords({page_num: pagination.value.page, page_size: 10, lost_or_found: "寻物"});
};
const handleFinish =  async (formData: { campus: string; kind: string; type: boolean; content: string; publisher: string; img1: string | null; img2: string | null; img3: string | null; item_name: string; lost_or_found_place: string; lost_or_found_time: string; pickup_place: string; contact: string; introduction: string; }) => {
  try {
    const res = !toEditData.value ?
      await LostfoundService.createRecordAPI(formData)
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
  getRecords({page_num: pagination.value.page, page_size: 10, lost_or_found: "寻物"});
  pagination.value.page = 1;
};
const columns: DataTableColumns<LostfoundAPI.FoundItem> = [
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
    width: 100,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "遗失地点",
    width:120,
    key: "lost_or_found_place",
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "遗失时间",
    key: "lost_or_found_time",
    width: 120,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "联系方式",
    key: "contact",
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