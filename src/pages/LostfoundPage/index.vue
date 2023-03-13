<script lang="ts" setup>
import PageTitle from "@/components/PageTitle.vue";
import { useRequest } from "vue-request";
import * as LostfoundService from "@/apis/LostfoundAPI";
import PreviewCard from "./PreviewCard.vue";
import LostfoundForm from "./LostfoundForm.vue";
import { ref, watch } from "vue";
import { NSpin, NSpace, NButton, useMessage } from "naive-ui";
// @ts-ignore
import VirtualList from "vue3-virtual-scroll-list";

/* TODO:
  1. 显示组织名称
  2. 删除和编辑按钮
*/

const {
  data: recordsData,
  loading,
  run: getRecords
} = useRequest(LostfoundService.getRecordsAPI, {
  defaultParams: [{
    page_num: 1,
    page_size: 10
  }]
});
const showForm = ref(false);
const toEditData = ref<LostfoundAPI.Item>();
const recordList = ref<LostfoundAPI.Item[]>([]);
const message = useMessage();

watch([recordsData], ([newData]) => {
  recordList.value = recordList.value?.concat(newData?.data || []);
});

const currentPage = ref(1);

const handleScrollToBottom = () => {
  if (loading.value) return;
  else getRecords({
    page_num: ++currentPage.value,
    page_size: 10,
  });
};

const handleShowForm = () => {
  showForm.value = true;
};

const handleFormFinish = async (formData: LostfoundAPI.Item) => {
  try {
    const res = !toEditData.value ?
     await LostfoundService.createRecordAPI(formData)
     : await LostfoundService.updateRecordAPI(formData);
    if (res.code === 1) {
      message.success("提交成功");
      // 重置虚拟列表
      recordList.value = [],
      currentPage.value = 1;
      getRecords({ page_num: 1, page_size: 10 });
    } else {
      throw new Error(res.msg);
    }
    showForm.value = false;
    toEditData.value = undefined;
  } catch (e: any) {
    message.error(e.message || "未知错误");
  }

};

</script>

<template>
  <n-space align="center" justify="space-between" style="padding-right: 24px">
    <page-title :is-loading-data="loading"> 失物招领 </page-title>
    <n-button type="primary" @click="handleShowForm">登记失物寻物</n-button>
  </n-space>
  <virtual-list
    class="v-list"
    data-key="id"
    :data-sources="recordList"
    :data-component="PreviewCard"
    @tobottom="handleScrollToBottom"
  >
    <template v-slot:footer>
      <div class="loading-prompt">
        <n-space v-if="loading">
          <n-spin :size="14"/>
          <span>加载中</span>
        </n-space>
        <span v-else>下拉查看更多</span>
      </div>
    </template>
  </virtual-list>
  <lostfound-form
    v-model:show="showForm"
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