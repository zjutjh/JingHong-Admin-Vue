<script setup lang="ts">
import { ref, h, computed } from "vue";
import dayjs from "dayjs";
import {
  NSpace,
  NButton,
  NDataTable,
  DataTableColumns,
  useMessage,
  NH3,
} from "naive-ui";
import * as InformationService from "../apis/InformationAPI";
import { useRequest } from "vue-request";
import PageTitle from "../components/PageTitle.vue";
import InformationForm from "../components/InformationForm.vue";

const informationList = computed(() => {
  return informationDate.value?.data;
});

const showForm = ref(false);
const toEditData = ref<InformationAPI.Information>();
const message = useMessage();

const {
  data: informationDate,
  run: getInformation,
  loading
} = useRequest(InformationService.getInformationAPI, {
  onSuccess: (data) => {
    if (data.code !== 1) throw new Error(data.msg);
  },
  onError: (e) => {
    console.log(e);
    message.error(`请求数据失败, ${e.message} || "未知错误"`);
  }
});

const columns: DataTableColumns<InformationAPI.Information> = [
  {
    title: "ID",
    key: "id",
    width: 60,
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
    key: "publish_time",
    width: 200,
    render: (row) => dayjs(row.publish_time).format("YYYY-MM-DD HH:mm")
  },
  {
    title: "图片",
    key: "img1",
    width: 80,
    render: (row) => {
      if (!row.img1) {
        return "无";
      } else {
        return "有";
      }
    }
  },
  {
    title: "发布组织",
    key: "publisher",
    width: 100,
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

const handleCreate = () => {
  toEditData.value = undefined;
  showForm.value = true;
};

const handleUpdate = (record: InformationAPI.Information, state: boolean) => {
  showForm.value = state;
  toEditData.value = record;
};

const handleRemove = async (id: InformationAPI.Information["id"]) => {
  try {
    const res = await InformationService.deleteInformationAPI({ notice_id: id });
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
  getInformation();
};

const handleFinish =  async (formData: InformationAPI.Information) => {
  try {
    const res = !toEditData.value ?
      await InformationService.createInformationAPI(formData)
      : await InformationService.updateInformationAPI(formData);
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
  getInformation();
};

</script>

<template>
  <PageTitle>校园资讯</PageTitle>
  <n-space align="baseline" justify="space-between" style="padding: 0 24px">
      <n-h3 prefix="bar">资讯列表</n-h3>
      <n-button type="primary" @click="handleCreate">新增资讯</n-button>
  </n-space>
    <n-space style="padding: 0 24px">
      <n-data-table
        :columns="columns"
        :data="informationList"
        scroll-x="600"
        :loading="loading"
      />
    </n-space>
    <Information-form
      v-if="showForm"
      @delete="handleRemove"
      @open="handleUpdate"
      @finish="handleFinish"
      :initialValue="toEditData"
    />
</template>


<style scoped>


</style>