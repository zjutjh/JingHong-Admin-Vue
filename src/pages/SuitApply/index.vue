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
        <n-button text @click="showEditorSuit(item)">编辑</n-button>/
        <n-button text @click="showEditorSuit(item)">查看</n-button>
        <n-button style="margin-left: 2vw;color: red;" text @click="deleteSuit(item);">删除</n-button>
        <n-modal v-model:show="showModalConfirmDelete">
    <n-card
      style="width: 400px"
      title="确认删除"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
    <div style="display: flex;justify-content:space-around;">
      <n-button type="primary" @click="deleteConfirmSuit(deleteItem)">确认删除</n-button>
      <n-button @click="showModalConfirmDelete = false">取消</n-button>
    </div>
    </n-card>
  </n-modal>
      </td>
    </tr>
</tbody>

    </n-table>
    <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="正装信息"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <!-- 表单 -->
      <n-form :model="publishSuitForm" label-position="top">
        <n-form-item label="物资名称">
          <n-input v-model:value="publishSuitForm.name" />
        </n-form-item>
        <n-form-item label="类别">
          <n-input :disabled="true" default-value="正装" />
        </n-form-item>
        <n-form-item label="校区">
          <n-select :options="campusOptions" v-model:value="publishSuitForm.campus" />
        </n-form-item>
        <n-form-item label="上传图片">
    <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" style="display: none" />
    <img v-if="publishSuitForm.img" :src="publishSuitForm.img" alt="上传的图片预览" style="max-width: 200px; max-height: 200px; margin-top: 10px;" />
    <n-button v-if="publishSuitForm.img" type="error" @click="deleteImage">删除</n-button>
    <n-button @click="openFileInput">上传</n-button>
  </n-form-item>
        <n-form-item label="总数量">
          1008
        </n-form-item>
        <n-form-item label="规格" style="display: flex; align-items: center;" size="small">  <n-button @click="addSpec" style="margin-left: 30%;margin-top: -20%;">+</n-button>
</n-form-item>
<n-form-item  style="display: flex; justify-content: center; margin-top: 4vh;" size="small">
  <n-table :bordered="true" :single-line="false" style="width: 30vw;">
      <thead>
        <tr>
          <th>尺码</th>
          <th>库存</th>
          <th v-if="showModalEditorSuit">已借出</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" (item,index) in publishSuitForm.specs" :key="item.spec">
          <td>{{ item.spec }}</td>
          <td>{{ item.stock }}</td>
          <td v-if="showModalEditorSuit">{{ borrowed[index] }}</td>
          <td>
            <n-button text @click="showEditor(item)">修改</n-button>
            <n-button style="margin-left: 2vw;color: red;" text @click="deleteSpec(item)">删除</n-button>
          </td>
        </tr>
      </tbody>
    </n-table>
</n-form-item>
      </n-form>
      <template #footer>
        <div style="display: flex;justify-content: center;">
          <n-button v-if="showModalPublish" type="primary" @click="publishSuitFunction(publishSuitForm)">确认</n-button>
          <n-button v-else type="primary" @click="setSuitFunction(publishSuitForm)">确认</n-button>
          <n-button @click="showModalPublish = false;showModalEditorSuit = false;borrowed=[]; cleanPublishSuitForm();" style="margin-left: 10vh;">取消</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
  <n-modal v-model:show="showModalAddSpec">
    <n-card
      style="width: 300px;"
      title="发布正装尺码"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
            <n-form :model="specForm" label-position="top">
              <n-form-item label="尺寸">
                <n-input v-model:value="specForm.spec" />
              </n-form-item>
              <n-form-item label="库存">
                <n-input v-model:value="specForm.stock" />
              </n-form-item>
            </n-form>
            <template #footer>
              <div style="display: flex;justify-content:space-around;">
              <n-button @click="confirmSpec" type="primary">确认</n-button>
              <n-button @click="showModalAddSpec = false">取消</n-button>
            </div>
            </template>
          </n-card>
          </n-modal>
          <n-modal v-model:show="showModalEditor">
            <n-card
      style="width: 300px"
      title="修改正装信息"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
    <n-form :model="editedSpec" label-position="top">
      <n-form-item label="尺码">
        <n-input v-model:value="editedSpec.spec" />
      </n-form-item>
      <n-form-item label="库存">
        <n-input v-model:value="editedSpec.stock" />
      </n-form-item>
    </n-form>
    <template #footer>
      <n-button @click="confirmEdit">确认</n-button>
    </template>
            </n-card>
  </n-modal>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "../../components/PageTitle.vue";
import { NButton, NSpace, NTable, useMessage, NModal, NCard, NForm, NFormItem, NInput,NSelect} from "naive-ui";
import { computed, ref, onMounted } from "vue";
import { useRequest } from "vue-request";
import * as SuitApplyService from "@/apis/SuitApplyAPI";
import { messageProps } from "naive-ui/es/message/src/message-props";
const deleteItem = ref();
const showModal = computed(() => showModalPublish.value || showModalEditorSuit.value);
const deleteSuit = (item: SuitApplyAPI.SuitItem) => {
  showModalConfirmDelete.value = true;
  deleteItem.value = item;
};
const campusOptions = ref([
  { label: "朝晖", value: 1 },
  { label: "屏峰", value: 2 },
  { label: "莫干山", value: 3 }
]);
const cleanPublishSuitForm = () => {
  publishSuitForm.value = {
    campus: "",
    name: "",
    img: "",
    specs:[],
  };
};

const selectedButton = ref("button1");
const message = useMessage();
const suitList = ref<SuitApplyAPI.SuitItem[]>([]);
  const publishSuitForm = ref<{
  name: string;
  campus: number | string;
  img: string;
  specs: { stock: number; spec: string; id?: number}[];
}>({
  name: "",
  campus: "",
  img: "",
  specs: []
});

const showModalPublish = ref(false);
const showModalEditor = ref(false);
const showModalAddSpec = ref(false);
const showModalConfirmDelete = ref(false);
const showModalEditorSuit = ref(false);
const borrowed = ref<number[]>([]);
const editedSpec = ref({
  spec: "",
  stock: 0
});

const specForm = ref({
  spec: "",
  stock: ""
});
const showEditorSuit = (item:SuitApplyAPI.SuitItem) => {
  showModalEditorSuit.value = true;
  publishSuitForm.value = {...item};


item.specs.forEach(item => {
  // 提取每个元素的 borrowed 值，并将其存储到 borrowedArray 中
  if(item.borrowed){
  borrowed.value.push(item.borrowed);
  }
});
console.log(borrowed.value);
};
const campus = computed(() => {
  if (selectedButton.value === "button1") {
    return 1;
  } else if (selectedButton.value === "button2") {
    return 2;
  } else {
    return 3;
  }
});

const showEditor = (spec: { spec: string; stock: number; }) => {
  // 将要编辑的规格对象赋值给editedSpec
  showModalEditor.value = true;
  editedSpec.value = { ...spec };
};


const confirmEdit = () => {
  const index = publishSuitForm.value.specs.findIndex(item => item.spec === editedSpec.value.spec);

  if (index !== -1) {
    publishSuitForm.value.specs[index] = { ...editedSpec.value };
  } else {
    publishSuitForm.value.specs.push({ spec: editedSpec.value.spec, stock: editedSpec.value.stock });
  }
  showModalEditor.value = false;
};

const deleteSpec = (spec: { spec: string; stock:number }) => {
  // 找到要删除的规格对象在数组中的索引
  const index = publishSuitForm.value.specs.findIndex(item => item.spec === spec.spec);
  if (index !== -1) {
    // 从数组中移除规格对象
    publishSuitForm.value.specs.splice(index, 1);
  }
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
        const suitItems: SuitApplyAPI.SuitItem[] = res.data;
        suitItems.forEach((item: SuitApplyAPI.SuitItem) => {
          if (item.specs) {
            let totalStock = 0;
            let totalBorrowed = 0;
            item.specs.forEach((spec: SuitApplyAPI.SuitSpec) => {
              totalStock += spec.stock;
              if(spec.borrowed){
              totalBorrowed += spec.borrowed;
              }
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
    message.error(`获取失败, ${e?.message || "未知错误"}`);
  }
};

const publishSuitFunction = async (publishForm: { campus: number | string; name: string; img: string; specs: { spec: string; stock: number; }[]; }) => {
   try {
     const res = await SuitApplyService.createSuitInfoDataAPI(publishForm);
     if (res.code === 1) {
       message.create("发布成功");
       GetSuitInformation(campus.value);
     }else {
      throw new Error(res.msg);
    }
   }catch (e: any) {
    message.error(e.message || "未知错误");
   }
   cleanPublishSuitForm();
  showModalPublish.value = false;
};

const deleteConfirmSuit = async (deleteItem:SuitApplyAPI.SuitItem) => {
  let res = null;
  try {
    for (const spec of deleteItem.specs) {
        res = await SuitApplyService.DeleteSuitInfoAPI({ id: spec.id });
    }
    if(res !== null){
    if (res.code === 1) {
      message.create("删除成功");
       GetSuitInformation(campus.value);
     }else {
      throw new Error(res.msg);
    }
  }
  } catch (e:any) {
    // 处理错误
    console.error("删除失败:", e.message || "未知错误");
  }
  showModalConfirmDelete.value = false;
};

const setSuitFunction = async (publishForm:SuitApplyAPI.SuitItem) => {
  publishForm.totalBorrowed = undefined;
  publishForm.totalStock = undefined;
  publishForm.specs.map(item => item.borrowed = undefined);
  try {
     const res = await SuitApplyService.SetSuitInfoDataAPI(publishForm);
     if (res.code === 1) {
       message.create("发布成功");
       GetSuitInformation(campus.value);
     }else {
      throw new Error(res.msg);
    }
   }catch (e: any) {
    message.error(e.message || "未知错误");
   }
   cleanPublishSuitForm();
  showModalPublish.value = false;
};

const addSpec = () => {
  showModalAddSpec.value = true;
};
const confirmSpec = () => {
  publishSuitForm.value.specs.push({
    spec: specForm.value.spec,
    stock: parseInt(specForm.value.stock)
  });
  showModalAddSpec.value = false;
  // 清空specForm中的数据
  specForm.value.spec = "";
  specForm.value.stock = "";
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
};

const fileInput = ref<HTMLInputElement | null>(null);


const handleFileChange = async (event: { target: { files: FileList; }; }) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const response = await SuitApplyService.UpLoadImgAPI(file);
      if (response.code === 1) {
        publishSuitForm.value.img = response.data; // 将服务器返回的图片 URL 存储到 publishSuitForm.img 中
      } else {
        throw new Error(response.msg || "上传图片失败");
      }
    } catch (e) {
      message.error(e.message || "上传图片失败");
    }
  }
};

const openFileInput = () => {
  fileInput.value?.click();
};

const deleteImage = () => {
  URL.revokeObjectURL(publishSuitForm.value.img);
  publishSuitForm.value.img = "";
};



</script>

<style></style>
