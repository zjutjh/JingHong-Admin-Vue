<script setup lang="ts">
import {
  NForm,
  NFormItem,
  NInput,
  NPageHeader,
  NRadio,
  NSelect,
  NSpace,
  NRadioGroup,
  NUpload,
  NButton,
  UploadCustomRequestOptions,
  UploadFileInfo,
  useMessage
} from "naive-ui";
import { onMounted, ref, toRefs } from "vue";
import * as LostfoundService from "@/apis/LostfoundAPI";

const props = defineProps<{
  initialValue?: LostfoundAPI.Item;
  show: boolean;
}>();
const { initialValue } = toRefs(props);
const emit = defineEmits(["finish", "update:show"]);
const message = useMessage();

const formData = ref(initialValue?.value || {
  kind: "其他",
  type: false,
  content: "",
  campus: "朝晖"
});

const kindOptions = ref<{ label: string; value: string }[]>();
const lostfoundOptions = ref([
  { label: "失物启事", value: false },
  { label: "寻物启事", value: true }
]);
const campusOptions = ref(["朝晖", "屏峰", "莫干山"].map(item => ({
  label: item, value: item
})));

onMounted(() => {
  LostfoundService.getKindsAPI().then(res => {
    kindOptions.value = res.data.map((item) => ({
      label: item,
      value: item
    }));
  });
});

const photoList = ref<UploadFileInfo[]>([]);

const handleBack = () => {
  emit("update:show", false);
};

const photoPathTemp = ref<string>();

const handleUpload = (options: UploadCustomRequestOptions) => {
  if (!options.file.file) return;
  const bodyFormData = new FormData();
  bodyFormData.append("img", options.file.file);
  LostfoundService.uploadPhotoAPI(bodyFormData)
    .then(res => {
      photoPathTemp.value = res.data;
      options.onFinish();
    })
    .catch(e => {
      options.onError();
    });
};

const handleFileListChange = (fileList: UploadFileInfo[]) => {
  photoList.value = fileList;
};

const handlePhotoUploadFinish = (options: { file: UploadFileInfo }) => {
  options.file.url = photoPathTemp.value;
  photoPathTemp.value = undefined;
  return options.file;
};

const handleSubmit = () => {
  try {
    if (!formData.value.content) throw new Error("请填写内容");
    if (photoList.value.find(item => item.status !== "finished")) {
      throw new Error("存在未上传成功的照片");
    }
    emit("finish", {
      ...formData.value,
      img1: photoList.value[0]?.url || null,
      img2: photoList.value[1]?.url || null,
      img3: photoList.value[2]?.url || null,
    });
  } catch (e: any) {
    message.error(e.message || "表单填写有误");
  }
};

</script>

<template>
  <section class="container" v-show="show">
    <n-page-header @back="handleBack">
      <template #title> 编辑失物招领信息 </template>
    </n-page-header>
    <n-space style="width: 100%">
      <n-form style="max-width: 400px">
        <n-form-item>
          <n-radio-group v-model:value="formData.type">
            <n-radio
              v-for="item in lostfoundOptions"
              :key="item.label"
              :value="item.value"
            >{{ item.label }}</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="分类">
          <n-select :options="kindOptions" v-model:value="formData.kind"/>
        </n-form-item>
        <n-form-item label="校区">
          <n-select :options="campusOptions" v-model:value="formData.campus"/>
        </n-form-item>
        <n-form-item label="内容">
          <n-input type="textarea" v-model:value="formData.content" style="width: 400px"/>
        </n-form-item>
        <n-form-item label="上传图片 (最多3张)">
          <n-upload
            :max="3"
            show-preview-button
            accept=".jpg,.png"
            list-type="image-card"
            multiple
            @finish="handlePhotoUploadFinish"
            :on-update-file-list="handleFileListChange"
            :custom-request="handleUpload"
          />
        </n-form-item>
        <n-form-item>
          <n-space justify="end" style="width: 100%">
            <n-button type="primary" round size="large" @click="handleSubmit">提交</n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </n-space>
  </section>
</template>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding: 16px 24px;
  background-color: var(--wjh-color-background);
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>