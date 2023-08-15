<template>
  <PageTitle>失物寻物</PageTitle>
  <n-space justify="space-between" style="padding: 0 24px">
    <n-space justify="start">
      <n-h3 prefix="bar">寻物启事列表</n-h3>
      <n-button type="info" @click="changeFunction">切换为失物招领</n-button>
    </n-space>
    <n-button type="primary" @click="handleOpenForm">添加寻物</n-button>
  </n-space>
  <n-space style="padding: 0 24px">
    <n-data-table
      :columns="columns"
      :data="recordList"
      scroll-x="600"
      :loading="loading"
    />
  </n-space>
  <n-pagination
    v-model:page="currentPage"
    :page-count="maxPage"
   />
  <Found-form
    v-if="showForm"
    @delete="handleRemove"
    @open="handleUpdate"
    @finish="handleFinish"
    :initialValue="toEditData"
  />
</template>

<script setup lang="ts">
import {ref, h, computed, watch} from "vue";
import dayjs from "dayjs";
import {
  NSpace,
  NButton,
  NDataTable,
  DataTableColumns,
  useMessage,
  NH3,
} from "naive-ui";
import { useRequest } from "vue-request";
import PageTitle from "@/components/PageTitle.vue";
import useLostFoundStore from "@/store/useLostFoundStore";
import {useRouter} from "vue-router";
import FoundForm from "@/components/FoundForm.vue";
import * as LostfoundService from "@/apis/LostfoundAPI";
import {storeToRefs} from "pinia";

const router = useRouter();
const lostfoundStore = useLostFoundStore();
const  { lostfoundFlag } = storeToRefs(lostfoundStore);
const currentPage = ref(1);
const maxPage = ref(0);
const recordList = ref<LostfoundAPI.Item[]>([]);
const showForm = ref(false);
const toEditData = ref<LostfoundAPI.Item>();
const message = useMessage();

const changeFunction = () => {
  lostfoundStore.setLostfoundFlag(true);
  router.push("/lost");
};

const FLAG = computed(() => {
  console.log(lostfoundFlag.value ? null : "切换到寻物启事");
  return lostfoundFlag.value ? "失物" : "寻物";
});

const {
  loading,
  run: getRecords,
} = useRequest(LostfoundService.getRecordsAPI, {
  defaultParams: [{
    page_num: currentPage.value,
    page_size: 10,
    lost_or_found: FLAG.value
  }],
  onSuccess: (data) => {
    if (data.code === 1) {
      recordList.value = recordList.value?.concat(data.data.data || []);
      console.log(recordList.value);
      maxPage.value = data.data.total_page_num;
    }
  },
  onError: (e) => {
    console.log(e);
    message.error(`请求数据失败, ${e.message} || "未知错误"`);
  }
});

const handleOpenForm = () => {
  showForm.value = true;
};

const handleCreate = () => {
  toEditData.value = undefined;
  showForm.value = true;
};

const handleUpdate = (record: LostfoundAPI.Item, state: boolean) => {
  showForm.value = state;
  toEditData.value = record;
};

const handleRemove = async (id: LostfoundAPI.Item["id"]) => {
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
  await getRecords({page_num: currentPage.value, page_size: 10, lost_or_found: FLAG.value});
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
  await getRecords({page_num: currentPage.value, page_size: 10, lost_or_found: FLAG.value});
};

// const pageUpdate = () => {
//   recordList.value = [];
//   getRecords({page_num: currentPage.value, page_size: 10, lost_or_found: FLAG.value});
// };

watch(currentPage, () => {
  recordList.value = [];
  getRecords({page_num: currentPage.value, page_size: 10, lost_or_found: FLAG.value});
});
const columns: DataTableColumns<LostfoundAPI.Item> = [
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
    title: "拾得/遗失地点",
    width:120,
    key: "lost_or_found_place",
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "拾得/遗失时间",
    key: "lost_or_found_time",
    width: 80,
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
    width: 60,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "物品种类",
    key: "kind",
    width: 60,
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
