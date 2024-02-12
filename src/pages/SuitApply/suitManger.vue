<template>
  <section class="pending-approval-container" v-if="containId">
    <n-page-header @back="handleBack" class="title-bar">
      <template #title> 待审批 </template>
    </n-page-header>
    <n-button type="info" @click="switchPage()" class="switch-page-button">切换为归还清点</n-button>
    <n-button
    v-for="cam in campusList"
    :key="cam"
    type="primary"
    size="large"
    round
    class="campus-button"
    :color="getButtonColor_approval(cam)"
    @click="switchCampus_approval(cam)">
      {{ cam }}
    </n-button>
    <div class="fliter">
      <span>编号</span><n-input class="f-input" type="text" placeholder="可输入ID"/>
      <span>学号</span><n-input class="f-input" type="text" placeholder="可输入学号"/>
      <span>物资名称</span><n-input class="f-input" type="text" placeholder="可输入ID"/>
      <span>规格</span><n-input class="f-input" type="text" placeholder="可输入尺码"/>
    </div>
    <div class="counter">
      <span class="title">正装统计</span>
      <div v-for="kind in suitList" :key="kind"><span>{{ kind }}</span>:  件</div>
    </div>
    <div>
      <n-data-table
      :columns="countDataColumn"
      :data="data"
      />
    </div>
  </section>
  <!-- switch -->
  <section class="return-inventory-container" v-if="!containId">
    <n-page-header @back="handleBack" class="title-bar">
      <template #title> 归还清点 </template>
    </n-page-header>
    <n-button type="info" @click="switchPage()" class="switch-page-button">切换为待审批</n-button>
    <n-button type="primary" size="large" class="input-button">录入</n-button>
    <n-button type="primary" size="large" class="output-button">导出</n-button>
    <n-button
    v-for="cam in campusList"
    :key="cam"
    type="primary"
    size="large"
    round
    class="campus-button"
    :color="getButtonColor_inventory(cam)"
    @click="switchCampus_inventory(cam)">
      {{ cam }}
    </n-button>
    <div class="fliter">
      <span>编号</span><n-input class="f-input" type="text" placeholder="可输入ID"/>
      <span>学号</span><n-input class="f-input" type="text" placeholder="可输入学号"/>
      <span>物资名称</span><n-input class="f-input" type="text" placeholder="可输入ID"/>
      <span>规格</span><n-input class="f-input" type="text" placeholder="可输入尺码"/>
      <span>状态</span><n-input class="f-input" type="text" placeholder="可输入状态"/>
    </div>
    <div class="counter">
      <span class="title">正装统计</span>
      <div v-for="kind in suitList" :key="kind"><span>{{ kind }}</span>:  件</div>
    </div>
    <div>
      <n-data-table
      :columns="countDataColumn_in"
      :data="data_in"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import router from "@/routers";
import {
  NPageHeader,
  NButton,
  NInput,
  NDataTable
} from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { ref, h } from "vue";

const handleBack = () => {
  router.push("/suitapply");
};

const campusList = ["朝晖", "屏风", "莫干山"];
const containId = ref(true);

const switchPage = () => {
  containId.value = !containId.value;
};

/* ---- pending-approval ---- */

const suitList = ["上衣", "裤子", "衬衫", "领带", "鞋子"];
const campusState_approval = ref("朝晖");

const switchCampus_approval = (campus: string) => {
  campusState_approval.value = campus;
};

const getButtonColor_approval = (buttonName: string) => {
  return campusState_approval.value === buttonName ? "" : "rgb(144, 238, 144)";
};

type Col = {
  "id": number,
  "姓名": string,
  "学号": number,
  "种类": string,
  "名称": string,
  "尺码": string,
  "数量": number,
  "申请日期": string,
  "操作": string
}

const createColumns = (approve: (row: Col) => void, del:  (row: Col) => void): DataTableColumns<Col> => {
  return [{
      title: "id",
      key: "id"
    },{
      title: "姓名",
      key: "姓名"
    },{
      title: "学号",
      key: "学号"
    },{
      title: "种类",
      key: "种类"
    },{
      title: "名称",
      key: "名称"
    },{
      title: "尺码",
      key: "尺码"
    },{
      title: "数量",
      key: "数量"
    },{
      title: "申请日期",
      key: "申请日期"
    },{
      title: "操作",
      key: "操作",
      render (row) {
        return [h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => approve(row)
          },
          { default: () => "审批" }
        ),h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => del(row)
          },
          { default: () => "删除" }
        )];
      },
    },
  ];
};

const countDataColumn = createColumns(
  (row: Col) => {
    alert(row.id);
  },
  (row: Col) => {
    alert(row.名称);
  }
);

const data: Col[] = [
{ id: 3, "姓名": "syr", "学号": 114514, "种类": "kind", "名称": "name", "尺码": "M", "数量": 1212, "申请日期": "2024/3/1", "操作": "删除"},
{ id: 3, "姓名": "resyr", "学号": 11514, "种类": "knd", "名称": "nme", "尺码": "S", "数量": 122, "申请日期": "204/3/1", "操作": "除"},
];

/* ---- pending-approval ---- */
/* ---- return-inventory ---- */

const campusState_inventory = ref("朝晖");

const switchCampus_inventory = (campus: string) => {
  campusState_inventory.value = campus;
};

const getButtonColor_inventory = (buttonName: string) => {
  return campusState_inventory.value === buttonName ? "" : "rgb(144, 238, 144)";
};

type Col_in = {
  "id": number,
  "姓名": string,
  "学号": number,
  "种类": string,
  "名称": string,
  "尺码": string,
  "数量": number,
  "借用日期": string,
  "归还日期": string,
  "状态": string,
  "操作": string
}

const createColumns_in = (check: (row: Col_in) => void, edit: (row: Col_in) => void, del:  (row: Col_in) => void): DataTableColumns<Col_in> => {
  return [{
      title: "id",
      key: "id"
    },{
      title: "姓名",
      key: "姓名"
    },{
      title: "学号",
      key: "学号"
    },{
      title: "种类",
      key: "种类"
    },{
      title: "名称",
      key: "名称"
    },{
      title: "尺码",
      key: "尺码"
    },{
      title: "数量",
      key: "数量"
    },{
      title: "借用日期",
      key: "借用日期"
    },{
      title: "归还日期",
      key: "归还日期"
    },{
      title: "状态",
      key: "状态"
    },{
      title: "操作",
      key: "操作",
      render (row) {
        return [h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => check(row)
          },
          { default: () => "查看" }
        ),h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => edit(row)
          },
          { default: () => "编辑" }
        ),h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => del(row)
          },
          { default: () => "删除" }
        )];
      },
    },
  ];
};

const countDataColumn_in = createColumns_in(
  (row: Col_in) => {
    alert(row.id);
  },
  (row: Col_in) => {
    alert(row.归还日期);
  },
  (row: Col_in) => {
    alert(row.名称);
  }
);

const data_in: Col_in[] = [
{ id: 3, "姓名": "syr", "学号": 114514, "种类": "kind", "名称": "name", "尺码": "M", "数量": 1212, "借用日期": "2024/3/1", "归还日期": "123", "状态": "state", "操作": "删除"},
{ id: 4, "姓名": "yr", "学号": 14514, "种类": "kin", "名称": "nam", "尺码": "SS", "数量": 112, "借用日期": "202/3/1", "归还日期": "13", "状态": "sate", "操作": "除"},
];
/* ---- return-inventory ---- */

</script>

<style lang="scss">
.pending-approval-container {
  padding: 30px;

  .switch-page-button {
    margin-right: 60vh;
  }

  .campus-button {
    margin: 20px 3vh;
  }

  .fliter .f-input{
    margin: 10px;
    width: 10vw;
  }

  .counter {
    .title { margin-right: 127px; }
    div {
      display: inline-block;
      margin: 10px 25px;
      span { color: rgba(10, 111, 194, 1); }
    }
  }
}

.return-inventory-container {
  padding: 30px;

  .switch-page-button {
    margin: 0;
  }

  .input-button {
    margin-left: 70px;
  }
  .output-button {
    margin-left: 70px;
    margin-right: 147px;
  }

  .campus-button {
    margin: 20px 3vh;
  }

  .fliter .f-input{
    margin: 10px;
    width: 10vw;
  }

  .counter {
    .title { margin-right: 127px; }
    div {
      display: inline-block;
      margin: 10px 25px;
      span { color: rgba(10, 111, 194, 1); }
    }
  }
}
</style>