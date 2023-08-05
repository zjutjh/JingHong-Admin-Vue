<script setup lang="ts">
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NSpace,
  NH2
} from "naive-ui";
import { ref } from "vue";
import AnnouncementPreview from "./AnnouncementPreview.vue";

const props = defineProps<{
  record?: AnnouncementAPI.Announcement;
}>();
const emit = defineEmits(["finish"]);

const initialValue = ref(props.record);
const formData = ref<Partial<AnnouncementAPI.Announcement>>({
  ...initialValue.value
});

const handleSubmit = () => {
  emit("finish", { value: formData.value });
};

const handleReset = () => {
  formData.value = {
    ...initialValue.value
  };
};

</script>

<template>
  <n-h2>编辑通知</n-h2>
  <main class="container">
    <n-form class="form">
      <n-form-item label="标题">
        <n-input v-model:value="formData.title" />
      </n-form-item>
      <n-form-item label="通知内容">
        <n-input 
          type="textarea"
          v-model:value="formData.content"
          :autosize="{ minRows: 4, maxRows: 12}"
        />
      </n-form-item>
      <n-form-item>
        <n-space>
          <n-button type="success" @click="handleSubmit">发送</n-button>
          <n-button type="warning" @click="handleReset">重置</n-button>
        </n-space>
      </n-form-item>
    </n-form>
    <section class="preview">
      <announcement-preview
        :title="formData.title"
        :content="formData.content"
        :publish-time="formData.publishTime"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .preview {
    display: none;
  }

  .form {
    flex: auto !important;
  }
}

.form {
  flex: 0 50%
}

.container {
  display: flex;
  gap: 24px;
}

.preview {
  flex: 0 50%;
  max-height: 400px;
  overflow-y: auto;
  padding: 12px
}
</style>