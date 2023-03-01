<script setup lang="ts">
import { ref, h, computed } from "vue";
import dayjs from "dayjs";
import { 
  NSpace, 
  NButton, 
  NModal, 
  NDataTable, 
  DataTableColumns, 
  useMessage,
  NH3,
} from "naive-ui"
import * as AnnouncementService from "../apis/AnnouncementAPI";
import { useRequest } from "vue-request";
import PageTitle from "../components/PageTitle.vue";
import AnnouncementForm from "../components/AnnouncementForm.vue";

const announcementList = computed(() => {
  return announcementData.value?.data;
})

const showModal = ref(false);
const toEditData = ref<AnnouncementAPI.Announcement>();
const message = useMessage();

const { 
  data: announcementData, 
  run: getAnnouncement,
  loading 
} = useRequest(AnnouncementService.getAnnouncementAPI, {
  onSuccess: (data) => {
    if (data.code !== 1) throw new Error(data.msg);
  },
  onError: (e) => {
    console.log(e);
    message.error(`请求数据失败, ${e.message} || "未知错误"`);
  }
})

const columns: DataTableColumns<AnnouncementAPI.Announcement> = [
  { 
    title: "ID", 
    key: "id", 
    width: 60, 
    fixed: "left",
    ellipsis: {
      tooltip: true
    } 
  },
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
    key: "publishTime", 
    width: 200,
    render: (row) => dayjs(row.publishTime).format("YYYY-MM-DD HH:mm")
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
          onClick: () => handleUpdate(row),
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

const handleCreate = () => {
  toEditData.value = undefined;
  showModal.value = true;
}

const handleUpdate = (record: AnnouncementAPI.Announcement) => {
  showModal.value = true;
  toEditData.value = record;
}

const handleRemove = async (id: AnnouncementAPI.Announcement["id"]) => {
  try {
    const res = await AnnouncementService.deleteAnnouncementAPI({ id });
    if (res.code === 1) message.success("删除成功");
    else throw new Error(res.msg);
  } catch (e: any) {
    console.log(e);
    message.error(`删除失败，${e.message || "未知错误"}`);
  }
  getAnnouncement();

}

const handleFinish = async (e: {
  value: AnnouncementAPI.Announcement
}) => {
  showModal.value = false;
  if (toEditData.value) {
    try {
      const res = await AnnouncementService.updateAnnouncementAPI(e.value);
      if (res.code === 1) message.success("修改成功");
      else throw new Error(res.msg);
    } catch (e: any) {
      console.log(e);
      message.error(`修改失败，${e.message || "未知错误"}`);
    }
  } else {
    try {
      const res = await AnnouncementService.createAnnouncementAPI(e.value);
      if (res.code === 1) message.success("创建成功");
      else throw new Error(res.msg);
    } catch (e: any) {
      console.log(e);
      message.error(`创建失败，${e.message || "未知错误"}`);
    }
  }
  getAnnouncement();
}

</script>

<template>
  <page-title :is-loading-data="loading" > 通知编辑 </page-title>
  <n-space align="baseline" justify="space-between">
    <n-h3 prefix="bar">通知列表</n-h3>
    <n-button type="primary" @click="handleCreate">新增通知</n-button>
  </n-space>
  <n-data-table 
    :columns="columns" 
    :data="announcementList"
    scroll-x="1000"
  />
  <n-modal v-model:show="showModal" preset="card" style="width: 840px">
    <announcement-form :record="toEditData" @finish="handleFinish"/>
  </n-modal>
</template>
