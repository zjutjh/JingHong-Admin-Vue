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
    <n-button
      type="primary"
      size="large"
      :round="true"
      @click="$router.push('/suitFaq')"
      >&ensp;&ensp;问答页面&ensp;&ensp;</n-button
    >
    <n-button type="primary" size="large" :round="true" @click="showPublish()"
      >发布正装信息</n-button
    >
    <n-button
      type="primary"
      size="large"
      :round="true"
      @click="$router.push('/suitManger')"
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
          <td>正装</td>
          <!-- 类别默认显示正装 -->
          <td>{{ item.totalStock }}</td>
          <td>{{ item.totalBorrowed }}</td>
          <td>
            <n-button text @click="showEditorSuit(item)">编辑</n-button>
            <n-button
              style="margin-left: 2vw; color: red"
              text
              @click="deleteSuit(item)"
              >删除</n-button
            >
            <n-modal v-model:show="showModalConfirmDelete">
              <n-card
                style="width: 400px"
                title="确认删除"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
              >
                <span>同步删除关于该物资的统计数据，借用记录会保留</span>
                <div
                  style="
                    display: flex;
                    justify-content: space-around;
                    margin-top: 30px;
                  "
                >
                  <n-button
                    type="primary"
                    @click="deleteConfirmSuit(deleteItem)"
                    >确认删除</n-button
                  >
                  <n-button @click="showModalConfirmDelete = false"
                    >取消</n-button
                  >
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
            <n-select
              :options="campusOptions"
              v-model:value="publishSuitForm.campus"
            />
          </n-form-item>
          <n-form-item label="上传图片">
    <!-- 隐藏的文件输入框 -->
    <input
      ref="fileInput"
      type="file"
      @change="handleFileChange"
      accept="image/*"
      style="display: none"
    />
    <!-- 显示已上传的图片预览 -->
    <img
      v-if="publishSuitForm.img"
      :src="publishSuitForm.img"
      alt="上传的图片预览"
      style="max-width: 200px; max-height: 200px; margin-top: 10px"
    />
    <!-- 如果已上传图片，则显示删除按钮 -->
    <n-button
      v-if="publishSuitForm.img"
      type="error"
      @click="deleteImage"
    >
      删除
    </n-button>
    <!-- 触发文件选择的按钮 -->
    <n-button @click="openFileInput">上传</n-button>
  </n-form-item>

          <n-form-item label="总数量">
            {{ totalStock }}
          </n-form-item>
          <n-form-item
            label="规格"
            style="display: flex; align-items: center"
            size="small"
          >
            <n-button
              @click="addSpec"
              style="margin-left: 30%; margin-top: -20%"
              >+</n-button
            >
          </n-form-item>
          <n-form-item
            style="display: flex; justify-content: center; margin-top: 4vh"
            size="small"
          >
            <n-table :bordered="true" :single-line="false" style="width: 30vw">
              <thead>
                <tr>
                  <th>尺码</th>
                  <th>库存</th>
                  <th v-if="showModalEditorSuit">已借出</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in publishSuitForm.specs" :key="item.spec">
                  <td>{{ item.spec }}</td>
                  <td>{{ item.stock }}</td>
                  <td v-if="showModalEditorSuit">{{ item.borrowed }}</td>
                  <td>
                    <n-button text @click="showEditor(item)">修改</n-button>
                    <n-button
                      style="margin-left: 2vw; color: red"
                      text
                      @click="deleteSpecConfirm(item)"
                      >删除</n-button
                    >
                  </td>
                </tr>
              </tbody>
            </n-table>
          </n-form-item>
        </n-form>
        <template #footer>
          <div style="display: flex; justify-content: center">
            <n-button
              v-if="showModalPublish"
              type="primary"
              @click="publishSuitFunction(publishSuitForm)"
              >确认</n-button
            >
            <n-button
              v-else
              type="primary"
              @click="setSuitFunction(publishSuitForm)"
              >确认</n-button
            >
            <n-button
              @click="
                showModalPublish = false;
                showModalEditorSuit = false;
                borrowed = [];
                cleanPublishSuitForm();
              "
              style="margin-left: 10vh"
              >取消</n-button
            >
          </div>
        </template>
      </n-card>
    </n-modal>
    <n-modal v-model:show="showModalAddSpec">
      <n-card
        style="width: 300px"
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
          <div style="display: flex; justify-content: space-around">
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
            <n-input-number v-model:value="editedSpec.stock" clearable :min="0"/>
          </n-form-item>
        </n-form>
        <template #footer>
          <n-button @click="confirmEdit">确认</n-button>
        </template>
      </n-card>
    </n-modal>
    <n-modal v-model:show="showModalConfirmDeleteSpec">
              <n-card
                style="width: 400px"
                title="确认删除"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
              >
                <div
                  style="
                    display: flex;
                    justify-content: space-around;
                    margin-top: 30px;
                  "
                >
                  <n-button
                    type="primary"
                    @click="deleteSpec(deleteSpecItem)"
                    >确认删除</n-button
                  >
                  <n-button @click="showModalConfirmDeleteSpec = false"
                    >取消</n-button
                  >
                </div>
              </n-card>
            </n-modal>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "../../components/PageTitle.vue";
import {
  NButton,
  NSpace,
  NTable,
  useMessage,
  NModal,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NSelect,
} from "naive-ui";
import { computed, ref, onMounted, reactive, watchEffect, toRefs } from "vue";
import * as SuitApplyService from "@/apis/SuitApplyAPI";

const savedCampus = localStorage.getItem("selectedCampus");
const selectedButton = ref(savedCampus ? savedCampus: "button1");
const deleteItem = ref();
const showModalPublish = ref(false);
const showModalEditor = ref(false);
const showModalAddSpec = ref(false);
const showModalConfirmDelete = ref(false);
const showModalEditorSuit = ref(false);
const showModalConfirmDeleteSpec = ref(false);
const deleteSpecItem = ref();
const borrowed = ref<number[]>([]);
const editedSpec = ref({
  spec: "",
  stock: 0,
});
const message = useMessage();
const suitList = ref<SuitApplyAPI.SuitItem[]>([]);
  const campus = computed(() => {
  if (selectedButton.value === "button1") {
    return 1;
  } else if (selectedButton.value === "button2") {
    return 2;
  } else {
    return 3;
  }
});
const state = reactive({
  totalStock: 0,
});
const showModal = computed(
  () => showModalPublish.value || showModalEditorSuit.value
);
const { totalStock } = toRefs(state);
const specForm = ref({
  spec: "",
  stock: "",
});

const deleteSuit = (item: SuitApplyAPI.SuitItem) => {
  showModalConfirmDelete.value = true;
  deleteItem.value = item;
};
const campusOptions = ref([
  { label: "朝晖", value: 1 },
  { label: "屏峰", value: 2 },
  { label: "莫干山", value: 3 },
]);

const publishSuitForm = ref<{
  name: string;
  campus: number | string;
  img: string;
  specs: { stock: number; spec: string; id?: number; borrowed?: number }[];
}>({
  name: "",
  campus: "",
  img: "",
  specs: [],
});
const cleanPublishSuitForm = () => {
  publishSuitForm.value = {
    campus: "",
    name: "",
    img: "",
    specs: [],
  };
};

const computeTotalStock = () => {
  state.totalStock = publishSuitForm.value.specs.reduce((total, spec) => {
    return total + spec.stock;
  }, 0);
};

onMounted(() => {

  GetSuitInformation(campus.value ? campus.value : 1);
});

watchEffect(() => {
  computeTotalStock();
});

const showEditorSuit = (item: SuitApplyAPI.SuitItem) => {
  showModalEditorSuit.value = true;
  publishSuitForm.value = { ...item };
};


const showEditor = (spec: { spec: string; stock: number }) => {
  // 将要编辑的规格对象赋值给editedSpec
  showModalEditor.value = true;
  editedSpec.value = { ...spec };
};

const confirmEdit = () => {
  const editedSpecUpperCase = editedSpec.value.spec.toUpperCase(); // 将输入的尺码转换为大写

  const index = publishSuitForm.value.specs.findIndex(
    (item) => item.spec.toUpperCase() === editedSpecUpperCase // 将表格中的尺码也转换为大写进行比较
  );

  if (index !== -1) {
    publishSuitForm.value.specs[index] = { ...editedSpec.value, spec: publishSuitForm.value.specs[index].spec };
  } else {
    if (showModalEditorSuit.value) {
      publishSuitForm.value.specs.push({
        spec: editedSpec.value.spec.toUpperCase(),
        stock: editedSpec.value.stock,
        id: 0,
        borrowed: 0,
      });
    } else {
      publishSuitForm.value.specs.push({
        spec: editedSpec.value.spec.toUpperCase(),
        stock: editedSpec.value.stock,
        id: 0,
      });
    }
  }
  showModalEditor.value = false;
};

const deleteSpecConfirm = async (spec: {
  spec: string;
  stock: number;
  id?: number;
  borrowed?: number;
}) => {
  // 弹出确认框，确认后再执行删除操作
  showModalConfirmDeleteSpec.value = true;
  deleteSpecItem.value = spec;
};

const deleteSpec = async (spec: {
  spec: string;
  stock: number;
  id?: number;
  borrowed?: number;
}) => {
  if(spec.id !== 0 &&spec.id !==undefined){
  try {
    // 调用删除接口传入当前规格对象的 id 进行删除
    const res = await SuitApplyService.DeleteSuitInfoAPI({ id: spec.id });
    if (res.code === 1) {
      // 删除成功后，从数组中移除该规格对象
      const index = publishSuitForm.value.specs.findIndex(
        (item) => item.id === spec.id
      );
      if (index !== -1) {
        publishSuitForm.value.specs.splice(index, 1);
      }
      message.create("删除成功");
    } else {
      throw new Error(res.msg || "删除失败");
    }
  } catch (e: any) {
    message.error(e.message || "删除失败");
  }
}else{
  const index = publishSuitForm.value.specs.findIndex(
        (item) => item.spec === spec.spec
      );
      if (index !== -1) {
        publishSuitForm.value.specs.splice(index, 1);
      }
      message.create("删除成功");
}
showModalConfirmDeleteSpec.value = false;
};

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
              if (spec.borrowed) {
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

const publishSuitFunction = async (publishForm: {
  campus: number | string;
  name: string;
  img: string;
  specs: { spec: string; stock: number }[];
}) => {
  publishForm.specs.map((item) => {
    if (item.stock < 0) {
      message.create("库存数量不能小于0");
      return;
    }
  });
  publishForm.specs.map((item) => {
    if (item.spec === "") {
      message.create("尺码不能为空");
      return;
    }
  });
  let sendRequest = true; // 控制是否发送请求
  publishForm.specs.forEach((item) => {
    if (item.stock < 0 || item.spec === "") {
      sendRequest = false;
    }
  });
  if (sendRequest) {
    try {
      const res = await SuitApplyService.createSuitInfoDataAPI(publishForm);
      if (res.code === 1) {
        message.create("发布成功");
        GetSuitInformation(campus.value);
      } else {
        throw new Error(res.msg);
      }
    } catch (e: any) {
      message.error(e.message || "未知错误");
    }
  }

  cleanPublishSuitForm();
  showModalPublish.value = false;
};

const deleteConfirmSuit = async (deleteItem: SuitApplyAPI.SuitItem) => {
  try {
    if (!deleteItem || !deleteItem.specs) {
      throw new Error("无效的删除项");
    }

    for (const spec of deleteItem.specs) {
      if (!spec || !spec.id) {
        throw new Error("无效的规格对象");
      }

      const res = await SuitApplyService.DeleteSuitInfoAPI({ id: spec.id });
      if (res.code === 1) {
        message.create("删除成功");
        GetSuitInformation(campus.value);
      } else {
        throw new Error(res.msg);
      }
    }
  } catch (e: any) {
    // 处理错误
    message.error("删除失败:", e.message || "未知错误");
  }
  showModalConfirmDelete.value = false;
  cleanPublishSuitForm();
  GetSuitInformation(campus.value);
};

const setSuitFunction = async (publishForm: {
  name: string;
  campus: string | number;
  img: string;
  specs: {
    stock: number;
    spec: string;
    id?: number | undefined;
    borrowed?: number | undefined;
  }[];
}) => {
  publishForm.specs.map((item) => (item.borrowed = undefined));
  publishForm.specs.map((item) => {
    if (item.stock < 0) {
      message.create("库存数量不能小于0");
      return;
    }
  });
  publishForm.specs.map((item) => {
    if (item.spec === "") {
      message.create("尺码不能为空");
      return;
    }
  });
  let sendRequest = true; // 控制是否发送请求的标志
  publishForm.specs.forEach((item) => {
    if (item.stock < 0 || item.spec === "") {
      sendRequest = false; // 如果任何条件不满足，则不发送请求
    }
  });
  if (sendRequest) {
    try {
      const res = await SuitApplyService.SetSuitInfoDataAPI(publishForm);
      if (res.code === 1) {
        message.create("编辑成功");
        GetSuitInformation(campus.value);
      } else {
        throw new Error(res.msg);
      }
    } catch (e: any) {
      message.error(e.message || "未知错误");
    }
  }
  showModalEditorSuit.value = false;
  cleanPublishSuitForm();
  GetSuitInformation(campus.value);
};

const addSpec = () => {
  showModalAddSpec.value = true;
};
const confirmSpec = () => {
  // 检查是否存在相同尺码
  const existingSpecIndex = publishSuitForm.value.specs.findIndex(spec => spec.spec.toUpperCase() === specForm.value.spec.toUpperCase()); 
  if (existingSpecIndex !== -1) {
    // 如果存在相同尺码，则弹出提示框
    message.warning("已存在相同尺码");
    specForm.value.spec = "";
    specForm.value.stock = "";
    showModalAddSpec.value = false;
  } else {
    // 如果不存在相同尺码，则添加新的尺码数据到表格中
    addNewSpec();
  }
};


const addNewSpec = () => {
  if (showModalEditorSuit.value) {
    publishSuitForm.value.specs.push({
      spec: specForm.value.spec.toUpperCase(),
      stock: parseInt(specForm.value.stock),
      borrowed: 0, // 初始化已借出为0
      id: 0,
    });
  } else {
    publishSuitForm.value.specs.push({
      spec: specForm.value.spec.toUpperCase(),
      stock: parseInt(specForm.value.stock),
      borrowed: 0, // 初始化已借出为0
    });
  }
  showModalAddSpec.value = false;
  // 清空specForm中的数据
  specForm.value.spec = "";
  specForm.value.stock = "";
};



const selectButton = (buttonName: string) => {
  selectedButton.value = buttonName;
  // 保存选中的校区状态到本地存储
  localStorage.setItem("selectedCampus", buttonName);
  GetSuitInformation(campus.value);
};
const getButtonColor = (buttonName: string) => {
  return selectedButton.value === buttonName ? "" : "rgb(144, 238, 144)";
};

const showPublish = () => {
  showModalPublish.value = true;
};

const fileInput = ref<HTMLInputElement | null>(null);

const handleFileChange = async (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files && fileInput.files[0];
  if (file) {
    if (!publishSuitForm.value.img) {
      const formData = new FormData();
      formData.append("img", file); // 使用 "img" 作为图片字段的名称
      try {
        const response = await SuitApplyService.uploadPhotoAPI(formData);
        if (response.code === 1) {
          publishSuitForm.value.img = response.data; // 将服务器返回的图片 URL 存储到 publishSuitForm.img 中
        } else {
          throw new Error(response.msg || "上传图片失败");
        }
      } catch (e: any) {
        message.error(e.message || "上传图片失败");
      }
    } else {
      message.warning("只能上传一张图片");
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
