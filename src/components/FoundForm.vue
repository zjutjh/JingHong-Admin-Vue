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
  useMessage,
} from "naive-ui";
import { onMounted, ref, toRefs, computed } from "vue";
import * as LostfoundService from "@/apis/LostfoundAPI";

const props = defineProps<{
  initialValue: LostfoundAPI.Item | undefined;
}>();
const { initialValue } = toRefs(props);
const emit = defineEmits(["finish", "delete", "open"]);
const message = useMessage();

const formData = ref(initialValue?.value || {
  kind: "其他",
  type: true,
  content: "",
  campus: "朝晖"
});

const kindOptions = ref<{ label: string; value: string }[]>();
const lostfoundOptions = ref([
  { label: "失物招领", value: true },
  { label: "寻物启事", value: false }
]);
const campusOptions = ref(["朝晖", "屏峰", "莫干山"].map(item => ({
  label: item, value: item
})));

onMounted(() => {
  LostfoundService.getKindsAPI().then(res => {
    kindOptions.value = res.data.map((item) => ({
      label: item.kind_name,
      value: item.kind_name
    }));
  });
});

/** 文件列表的copy */
const photoList = ref<UploadFileInfo[]>([]);
/** 默认文件列表 */
const defaultPhotoList = computed(() => [
    initialValue.value?.img1 || null,
    initialValue.value?.img2 || null,
    initialValue.value?.img3 || null
  ]
    .filter(item => !!item)
    .map(item=> ({
      url: item,
      status: "finished",
      id: item || "",
    })) as UploadFileInfo[]
);

/** 点击返回按钮触发 */
const handleBack = () => {
  emit("open", false);
};

/** 图片 url 👨‍🏫变量 */
const photoPathTemp = ref<string>();

/**
 * 自定义请求上传图片
 * @param options
 */
const handleUpload = (options: UploadCustomRequestOptions) => {
  if (!options.file.file) return;
  const bodyFormData = new FormData();
  bodyFormData.append("img", options.file.file);
  LostfoundService.uploadPhotoAPI(bodyFormData)
    .then(res => {
      if (res.code !== 1) throw new Error(res.msg);
      photoPathTemp.value = res.data;
      options.onFinish();
    })
    .catch(e => {
      message.error(`图片上传失败, ${e?.message || "未知错误"}`);
      options.onError();
    });
};

/**
 * 图片列表更新回调
 * 在图片上传成功之后进入
 * 得到所有图片的信息
 * @param fileList
 */
const handleFileListChange = (fileList: UploadFileInfo[]) => {
  photoList.value = fileList;
};

/**
 * 图片上传成功回调
 * 从临时变量中拿到图片的 url, 并更新
 * @param options
 */
const handlePhotoUploadFinish = (options: { file: UploadFileInfo }) => {
  options.file.url = photoPathTemp.value;
  photoPathTemp.value = undefined;
  return options.file;
};

/**
 * 提交表单
 * 提交前先检查填写状态
 */
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

/** 删除当前记录 */
const handleDelete = () => {
  emit("delete", initialValue?.value?.id);
};

</script>

<template>
  <section class="container">
    <n-page-header @back="handleBack">
      <template #title> 编辑寻物启事信息 </template>
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
          <n-input
            type="textarea"
            v-model:value="formData.content"
            :autosize="{ minRows: 5 }"
            style="width: 400px"
          />
        </n-form-item>
        <n-form-item label="上传图片 (最多3张)">
          <n-upload
            :max="3"
            show-preview-button
            accept=".jpg,.jpeg,.png"
            list-type="image-card"
            :default-file-list="defaultPhotoList"
            multiple
            @finish="handlePhotoUploadFinish"
            :on-update-file-list="handleFileListChange"
            :custom-request="handleUpload"
            :disabled="!!initialValue"
          />
        </n-form-item>
        <n-form-item>
          <n-space justify="end" style="width: 100%">
            <n-button
              type="error"
              secondary
              round
              size="large"
              @click="handleDelete"
            >删除</n-button>
            <n-button
              type="primary"
              round
              size="large"
              @click="handleSubmit"
            >提交</n-button>
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
