<script setup lang="ts">
import dayjs from "dayjs";
import { NImage } from "naive-ui";
import { computed, toRefs, defineProps } from "vue";
import fallbackImage from "@/assets/image-fallback.svg";

const props = defineProps<{
  source: LostfoundAPI.Item
  onClick: (record: LostfoundAPI.Item) => void;
}>();

const { source } = toRefs(props);

const imgList = computed(() => {
  return [
    source.value.img1,
    source.value.img2,
    source.value.img3,
  ].filter(item => item) as string[];
});

</script>

<template>
  <div :class="['container', source.type ? 'lost': 'found']">
    <div class="header">
      <div class="title">
        {{ source.type ? "失物招领" : "寻物启事" }}
      </div>
      <div class="extra">
        {{ dayjs(source.publish_time).format("YYYY/MM/DD HH:mm") }}
      </div>
    </div>
    <div class="body">
      <div class="content" @click="() => onClick(source)">
        {{ source.content }}
      </div>
      <div class="img-wrapper">
        <n-image
          v-for="(img, index) in imgList"
          class="image"
          width="100"
          :key="index"
          :src="img"
        >
          <template #placeholder>
            <n-image class="image" width="100" :src="fallbackImage"/>
          </template>
        </n-image>
      </div>
    </div>
    <div class="footer">
      <span> 数据来源: {{ source.publisher }} </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
   .container {
      width: 100% !important;
   }
}

.container {
  width: 400px;
  padding: 0 18px;
  box-sizing: border-box;
  border: 2px solid var(--wjh-color-border);
  border-radius: 8px;
  margin-bottom: 12px;
}

.header {
  display: flex;
  padding-top: 12px;
  padding-bottom: 8px;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 2px solid var(--wjh-color-border);

  .title {
    padding-left: 8px;
    border-left: 2px solid;
    font-size: 1rem;
    line-height: 100%;
  }
  .extra {
    font-size: .9rem;
  }
}

.body {
  .content {
    padding: 12px 0;
    white-space: pre-wrap;
  }

  .img-wrapper {
    display: flex;
    overflow-x: auto;
    gap: 6px;
    padding-bottom: 6px;
  }
}

.footer {
  padding: 12px 0;
  color: var(--wjh-color-week);
  text-align: center;
  font-size: .8rem;
}

.lost {
  .header {
    color: var(--wjh-color-cyan);
  }
}

.found {
  .header {
    color: var(--wjh-color-orange);
  }
}

</style>