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
    <n-button type="primary" size="large" :round="true" @click="publish_"
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
      <tbody>
        <tr v-for="item in filteredData" :key="item.name">
          <td>{{ item.name }}</td>
          <td>正装</td> <!-- 类别默认显示正装 -->
          <td>{{ item.stock }}</td>
          <td>{{ item.borrowed }}</td>
          <td>
            <n-button text @click="showEditor">编辑</n-button>
            <n-button text @click="showInformation(item.id)">查看</n-button>
            <n-button style="margin-left: 2vw" text>删除</n-button>
          </td>
        </tr>
      </tbody>
    </n-table>
    <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="发布正装信息"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <!-- 表单 -->
      <n-form :model="form" label-position="top">
        <n-form-item label="物资名称">
          <n-input v-model="form.name" />
        </n-form-item>
        <n-form-item label="类别">
          <n-input :disabled="true" default-value="正装" />
        </n-form-item>
        <n-form-item label="校区">
          <n-select :options="campusOptions" v-model:value="form.campus" />
        </n-form-item>
        <n-form-item label="上传图片">
          <n-button>上传</n-button>
        </n-form-item>
        <n-form-item label="总数量">
          10086
        </n-form-item>
        <n-form-item label="规格" style="display: flex; align-items: center;" size="small">  <n-button @click="addSpec" style="margin-left: 30%;margin-top: -20%;">+</n-button>
</n-form-item>
<n-form-item  style="display: flex; justify-content: center; margin-top: 4vh;" size="small">
  <n-table :bordered="true" style="width: 40vw;">
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
          <n-button type="primary" @click="publish">确认发布</n-button>
          <n-button @click="showModal = false" style="margin-left: 10vh;">取消</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "../../components/PageTitle.vue";
import { NButton, NSpace, NTable, useMessage, NModal, NCard, NForm, NFormItem, NInput,NIcon,NSelect} from "naive-ui";
import { computed, ref } from "vue";
import { useRequest } from "vue-request";
import * as SuitApplyService from "@/apis/SuitApplyAPI";
const campusOptions = ref(["朝晖", "屏峰", "莫干山"].map(item => ({
  label: item, value: item
})));
const spec = ref('');
const specs = ref([]);
const addSpec = () => {
  specs.value.push({ size: spec.value, stock: 0 });
  spec.value = '';
};

const editSpec = (row: any) => {
  // 编辑逻辑
};

const deleteSpec = (row: any) => {
  const index = specs.value.indexOf(row);
  if (index !== -1) specs.value.splice(index, 1);
};
const form = ref({
  name: "",
  stock: 0,
  borrowed: 0,
  imageUrl: "", // 保存上传图片的地址
  size: "",
  campus: "",
  totalStock: 0
});

const publish = () => {
  // 发布逻辑
  message.success('成功发布正装信息');
};

// 发布操作
// const publish = async () => {
//   try {
//     const res = await SuitApplyService.publishSuit({
//       name: form.value.name,
//       imageUrl: form.value.imageUrl,
//     });
//     if (res.code === 1) {
//       message.success("发布成功");
//       showModal.value = false;
//     } else {
//       message.error(res.msg || "发布失败");
//     }
//   } catch (e: any) {
//     message.error(`发布失败，${e?.message || "未知错误"}`);
//   }
// };
const selectedButton = ref("button1");
const message = useMessage();
const suitList = ref<SuitApplyAPI.GetSuitInformation[]>([]);
const showModal = ref(false);
const showModalEditor = ref(false);
const showModalInformation = ref(false);
const data = ref([
  {
    name: "上衣",
    stock: 3,
    borrowed: 1,
    campus: 1,
    size: "m",
    id:1,
    category: "正装"
  },
  {
    name: "裤子",
    stock: 20,
    borrowed: 12,
    campus: 1,
    size: "l",
    id:2,
    category: "正装"
  },
  // 其他数据...
]);
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
const GetSuitInformation = async (campus: number) => {
  try {
    const res = await SuitApplyService.GetSuitAPI({ campus: campus });
    if (res.code === 1) {
      suitList.value = suitList.value?.concat(res.data || []);
    } else {
      throw new Error(res.msg);
    }
  } catch (e: any) {
    message.error(`获取失败, ${e?.message || "未知错误"}`);
  }
};
const selectButton = (buttonName: string) => {
  selectedButton.value = buttonName;
  console.log(campus.value);
  GetSuitInformation(campus.value);
};

const getButtonColor = (buttonName: string) => {
  return selectedButton.value === buttonName ? "" : "rgb(144, 238, 144)";
};

const publish_ = () => {
  showModal.value = true;
};

const filteredData = computed(() => {
  return data.value.filter(item => item.campus === campus.value);
});

const currentItem = ref({
  name: "",
  category: "正装", // 默认类别为正装
  stock: 0,
  borrowed: 0,
  id: 0
  // 添加其他需要显示的信息
});

const showInformation = (itemId: number) => {
  // 根据 itemId 查找对应的物品对象并更新到 currentItem 中
  const item = data.value.find(item => item.id === itemId);
  if (item) {
    currentItem.value = { ...item };
    showModalInformation.value = true;
    console.log("Current item:", currentItem.value); // 添加调试输出语句
  }
};
</script>

<style></style>
