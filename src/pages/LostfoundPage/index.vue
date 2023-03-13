<script lang="ts" setup>
import PageTitle from "@/components/PageTitle.vue";
import { useRequest } from "vue-request";
import * as LostfoundService from "@/apis/LostfoundAPI";
import PreviewCard from "./PreviewCard.vue";
import LostfoundForm from "./LostfoundForm.vue";
import { ref } from "vue";
import { NSpin, NSpace, NButton, useMessage } from "naive-ui";
// @ts-ignore
import VirtualList from "vue3-virtual-scroll-list";

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

<template>
  <n-space align="center" justify="space-between" style="padding-right: 24px">
    <page-title :is-loading-data="loading"> 失物招领 </page-title>
    <n-button type="primary" @click="handleCreateRecord">登记失物寻物</n-button>
  </n-space>
  <virtual-list
    class="v-list"
    data-key="id"
    :data-sources="recordList"
    :data-component="PreviewCard"
    @tobottom="handleScrollToBottom"
    :extra-props="{ onClick: handleClickCard }"
  >
    <template v-slot:footer>
      <div class="loading-prompt">
        <n-space v-if="loading">
          <n-spin :size="14"/>
          <span>加载中</span>
        </n-space>
        <span v-else-if="maxPage > currentPage">下拉查看更多</span>
      </div>
    </template>
  </virtual-list>
  <lostfound-form
    v-if="showForm"
    @delete="handleDelete"
    @open="handleOpenForm"
    @finish="handleFormFinish"
    :initialValue="toEditData"
  />
</template>

<style lang="scss" scoped>
.v-list {
  overflow-y: auto;
  height: calc(100vh - 60px - 64px);
  padding-left: 24px;
  padding-right: 24px;
}

.loading-prompt {
  padding: 8px 0;
  display: flex;
  color: var(--wjh-color-week);
  justify-content: center;
}
</style>