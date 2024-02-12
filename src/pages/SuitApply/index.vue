<template>
  <PageTitle>物资借用</PageTitle>
  <n-space
    :inline="true"
    justify="space-between"
    :size="50"
    style="margin-left: 1.8vw; margin-top: 2vh"
  >
    <n-button
      :color="getButtonColor('button1')"
      type="primary"
      size="large"
      :round="true"
      @click="selectButton('button1')"
    >
      朝晖
    </n-button>
    <n-button
      :color="getButtonColor('button2')"
      type="primary"
      size="large"
      :round="true"
      @click="selectButton('button2')"
    >
      屏峰
    </n-button>
    <n-button
      :color="getButtonColor('button3')"
      type="primary"
      size="large"
      :round="true"
      @click="selectButton('button3')"
    >
      莫干山
    </n-button>
  </n-space>
  <n-space
    :inline="true"
    justify="space-between"
    :size="20"
    style="margin-left: 80%"
    vertical
    align="center"
  >
  <n-button type="primary" size="large" :round="true" @click="$router.push('/suitFaq')"
  >&ensp;&ensp;问答页面&ensp;&ensp;</n-button>
    <n-button type="primary" size="large" :round="true" @click="showPublish()"
      >发布正装信息</n-button
    >
    <n-button type="primary" size="large" :round="true"  @click="$router.push('/suitManger')"
      >&ensp;&ensp;审批清点&ensp;&ensp;</n-button
    >
  </n-space>
    <div style="display: flex; margin-left: 1.8vw; margin-top: -15vh">
    <n-table :bordered="false" :single-line="false" style="width: 70%">
      <thead>
        <tr>
          <th>物资</th>
          <th>类别</th>
          <th>库存</th>
          <th>已借出</th>
          <th>操作</th>
        </tr>
      </thead>
    <!-- 表格代码 -->
    <tbody>
    <tr v-for="item in suitList" :key="item.name">
      <td>{{ item.name }}</td>
      <td>正装</td> <!-- 类别默认显示正装 -->
      <td>{{ item.totalStock}}</td>
      <td>{{ item.totalBorrowed}}</td>
      <td>
        <n-button text @click="showEditor">编辑</n-button>
        <n-button text >查看</n-button>
        <n-button style="margin-left: 2vw" text>删除</n-button>
      </td>
    </tr>
</tbody>

    </n-table>
    <n-modal v-model:show="showModalPublish">
    <n-card
      style="width: 600px"
      title="发布正装信息"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <!-- 表单 -->
      <n-form :model="pubilshSuit" label-position="top">
        <n-form-item label="物资名称">
          <n-input v-model="pubilshSuit.name" />
        </n-form-item>
        <n-form-item label="类别">
          <n-input :disabled="true" default-value="正装" />
        </n-form-item>
        <n-form-item label="校区">
          <n-select :options="campusOptions" v-model:value="pubilshSuit.campus" />
        </n-form-item>
        <n-form-item label="上传图片">
          <n-button>上传</n-button>
        </n-form-item>
        <n-form-item label="总数量">
          {{ pubilshSuit.total }}
        </n-form-item>
        <n-form-item label="规格" style="display: flex; align-items: center;" size="small">  <n-button @click="addSpec" style="margin-left: 30%;margin-top: -20%;">+</n-button>
</n-form-item>
<n-form-item  style="display: flex; justify-content: center; margin-top: 4vh;" size="small">
  <n-table :bordered="true" :single-line="false" style="width: 30vw;">
      <thead>
        <tr>
          <th>尺码</th>
          <th>库存</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.stock }}</td>
          <td>
            <n-button text @click="showEditor">修改</n-button>
            <n-button style="margin-left: 2vw" text>删除</n-button>
          </td>
        </tr>
      </tbody>
    </n-table>
</n-form-item>
      </n-form>
      <template #footer>
        <div style="display: flex;justify-content: center;">
          <n-button type="primary">确认发布</n-button>
          <n-button @click="showModalPublish= false" style="margin-left: 10vh;">取消</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "../../components/PageTitle.vue";
import { NButton, NSpace, NTable, useMessage, NModal, NCard, NForm, NFormItem, NInput,NIcon,NSelect} from "naive-ui";
import { computed, ref, onMounted } from "vue";
import { useRequest } from "vue-request";
import * as SuitApplyService from "@/apis/SuitApplyAPI";
const campusOptions = ref(["朝晖", "屏峰", "莫干山"].map(item => ({
  label: item, value: item
})));
const spec = ref('');
const specs = ref([]);

const selectedButton = ref("button1");
const message = useMessage();
const suitList = ref<SuitApplyAPI.SuitItem[]>([]);
  const pubilshSuit = ref<{
  name: string;
  campus: string;
  img: string;
  total: number;
  specs: { stock: number; spec: string }[];
}>({
  name: "",
  campus: "",
  img: "",
  total: 0,
  specs: []
});
const showModalPublish = ref(false);
const showModalEditor = ref(false);
const showModalInformation = ref(false);
const campus = computed(() => {
  if (selectedButton.value === "button1") {
    return 1;
  } else if (selectedButton.value === "button2") {
    return 2;
  } else {
    return 3;
  }
});
const showEditor = () => {
  showModalEditor.value = true;
};
onMounted(() => {
  GetSuitInformation(1);
});
const GetSuitInformation = async (campus: number) => {
  suitList.value = [];
  try {
    const res = await SuitApplyService.GetSuitAPI({ campus });
    if (res.code === 1) {
      if (res.data) {
        const suitItems: SuitApplyAPI.SuitItem[] = res.data; // 更正类型定义
        suitItems.forEach((item: SuitApplyAPI.SuitItem) => {
          if (item.specs) {
            let totalStock = 0;
            let totalBorrowed = 0;
            item.specs.forEach((spec: SuitApplyAPI.SuitSpec) => {
              totalStock += spec.stock;
              totalBorrowed += spec.borrowed;
            });
            item.totalStock = totalStock;
            item.totalBorrowed = totalBorrowed;
          }
        });
        suitList.value = suitItems;
        console.log(suitList.value);
      }
    } else {
      throw new Error(res.msg);
    }
  } catch (e: any) {
    message.error(`删除失败, ${e?.message || "未知错误"}`);
  }
};






const selectButton = (buttonName: string) => {
  selectedButton.value = buttonName;
  GetSuitInformation(campus.value);
};

const getButtonColor = (buttonName: string) => {
  return selectedButton.value === buttonName ? "" : "rgb(144, 238, 144)";
};

const showPublish = () => {
  showModalPublish.value = true;
}


</script>

<style></style>
