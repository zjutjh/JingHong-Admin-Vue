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
      <span>编号</span><n-input class="f-input" type="text" placeholder="可输入ID" @keyup.enter="updataTableDataWithFliter()" :value="fliter_id" @update:value="fliter_idUpdate"/>
      <span>学号</span><n-input class="f-input" type="text" placeholder="可输入学号" @keyup.enter="updataTableDataWithFliter()" :value="fliter_student_id" @update:value="fliter_student_idUpdate"/>
      <span>物资名称</span><n-input class="f-input" type="text" placeholder="可输入名称" @keyup.enter="updataTableDataWithFliter()" :value="fliter_suitapply_name" @update:value="fliter_suitapply_nameUpdate"/>
      <span>规格</span><n-input class="f-input" type="text" placeholder="可输入尺码" @keyup.enter="updataTableDataWithFliter()" :value="fliter_spec" @update:value="fliter_specUpdate"/>
    </div>
    <div class="counter">
      <span class="title">正装统计</span>
      <div><span>上衣</span>: {{ countData.上衣 }} 件</div>
      <div><span>裤子</span>: {{ countData.裤子 }} 件</div>
      <div><span>衬衫</span>: {{ countData.衬衫 }} 件</div>
      <div><span>领带</span>: {{ countData.领带 }} 件</div>
      <div><span>鞋子</span>: {{ countData.鞋子 }} 件</div>
    </div>
    <div>
      <n-table size="small">
        <thead>
          <th>id</th>
          <th>姓名</th>
          <th>学号</th>
          <th>种类</th>
          <th>名称</th>
          <th>尺码</th>
          <th>数量</th>
          <th>申请日期</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="tlData in tableData" :key="tlData.id">
            <td>{{ tlData.id }}</td>
            <td>{{ tlData.name }}</td>
            <td>{{ tlData.student_id }}</td>
            <td>{{ tlData.kind }}</td>
            <td>{{ tlData.supplies_name }}</td>
            <td>{{ tlData.spec }}</td>
            <td>{{ tlData.count }}</td>
            <td>{{ timeFormat(tlData.apply_time) }}</td>
            <td>
              <n-button size="small">审批</n-button>
              <n-popconfirm
                @positive-click="confirmDeleteApprovalData(tlData.id)"
                @negative-click="() => {message.info('取消删除')}"
              >
                <template #trigger>
                  <n-button size="small">删除</n-button>
                </template>
                一切都将一去杳然，任何人都无法将其捕获。
              </n-popconfirm>
            </td>
          </tr>
        </tbody>
      </n-table>
      <n-pagination v-model:page="page_num" :page-count="total_page_num" />
    </div>
  </section>
  <!-- switch -->
  <section class="return-inventory-container" v-if="!containId">
    <n-page-header @back="handleBack" class="title-bar">
      <template #title> 归还清点 </template>
    </n-page-header>
    <n-button type="info" @click="switchPage()" class="switch-page-button">切换为待审批</n-button>
    <n-button type="primary" size="large" class="input-button">录入</n-button>
    <n-button type="primary" size="large" class="output-button" @click="exportButton">导出</n-button>
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
      <span>编号</span><n-input class="f-input" type="text" placeholder="可输入ID" @keyup.enter="updataInventoryDataWithFliter()" :value="fliter_id" @update:value="fliter_idUpdate"/>
      <span>学号</span><n-input class="f-input" type="text" placeholder="可输入学号" @keyup.enter="updataInventoryDataWithFliter()" :value="fliter_student_id" @update:value="fliter_student_idUpdate"/>
      <span>物资名称</span><n-input class="f-input" type="text" placeholder="可输入名称" @keyup.enter="updataInventoryDataWithFliter()" :value="fliter_suitapply_name" @update:value="fliter_suitapply_nameUpdate"/>
      <span>规格</span><n-input class="f-input" type="text" placeholder="可输入尺码" @keyup.enter="updataInventoryDataWithFliter()" :value="fliter_spec" @update:value="fliter_specUpdate"/>
      <span>状态</span><n-input class="f-input" type="text" placeholder="可输入状态" @keyup.enter="updataInventoryDataWithFliter()" :value="fliter_state" @update:value="fliter_stateUpdate"/>
    </div>
    <div class="counter">
      <span class="title">正装统计</span>
      <div><span>上衣</span>: {{ countData.上衣 }} 件</div>
      <div><span>裤子</span>: {{ countData.裤子 }} 件</div>
      <div><span>衬衫</span>: {{ countData.衬衫 }} 件</div>
      <div><span>领带</span>: {{ countData.领带 }} 件</div>
      <div><span>鞋子</span>: {{ countData.鞋子 }} 件</div>
    </div>
    <div>
      <n-table size="small">
        <thead>
          <th>id</th>
          <th>姓名</th>
          <th>学号</th>
          <th>种类</th>
          <th>名称</th>
          <th>尺码</th>
          <th>数量</th>
          <th>借用日期</th>
          <th>归还日期</th>
          <th>状态</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="tlData in inv_tableData" :key="tlData.id">
            <td>{{ tlData.id }}</td>
            <td>{{ tlData.name }}</td>
            <td>{{ tlData.student_id }}</td>
            <td>{{ tlData.kind }}</td>
            <td>{{ tlData.supplies_name }}</td>
            <td>{{ tlData.spec }}</td>
            <td>{{ tlData.count }}</td>
            <td>{{ timeFormat(tlData.borrow_time) }}</td>
            <td>{{ timeFormat(tlData.return_time) }}</td>
            <td>{{ tlData.status === 1 ? "未审核" : (tlData.status === 2 ? "被驳回" : (tlData.status === 3 ? "借用中" : "已归还")) }}</td>
            <td>
              <n-button size="small">查看</n-button>
              <n-button size="small">编辑</n-button>
              <n-button size="small">删除</n-button>
            </td>
          </tr>
        </tbody>
      </n-table>
      <n-pagination v-model:page="inv_page_num" :page-count="inv_total_page_num" />
    </div>
  </section>
</template>

<script setup lang="ts">
import router from "@/routers";
import {
  NPageHeader,
  NButton,
  NInput,
  useMessage,
  NTable,
  NPopconfirm,
  NPagination
} from "naive-ui";
import { ref, watch } from "vue";
import { GetExportAPI, GetRecordAPI, GetSuitAPI } from "@/apis/SuitApplyAPI/index";
import { useRequest } from "vue-request";
import type { Datum } from "@/apis/SuitApplyAPI/getRecord";
import dayjs from "dayjs";

const handleBack = () => {
  router.push("/suitapply");
};

const campusList = ["朝晖", "屏风", "莫干山"];
const containId = ref(true);
const message = useMessage();
const fliter_id = ref<string>();
const fliter_student_id = ref<string>();
const fliter_suitapply_name = ref<string>();
const fliter_spec = ref<string>();
const fliter_state = ref<string>();

const fliter_idUpdate = (value: string) => { fliter_id.value = value; };
const fliter_student_idUpdate = (value: string) => { fliter_student_id.value = value; };
const fliter_suitapply_nameUpdate = (value: string) => { fliter_suitapply_name.value = value; };
const fliter_specUpdate = (value: string) => { fliter_spec.value = value; };
const fliter_stateUpdate = (value: string) => { fliter_state.value = value; };
const countData = ref({
  "上衣": 0,
  "裤子": 0,
  "衬衫": 0,
  "领带": 0,
  "鞋子": 0,
});

const switchPage = () => {
  containId.value = !containId.value;
  updateSuitCount();
};

const timeFormat= (time: string) => {
  return dayjs(time).format("YYYY年MM月DD日");
};

const updateSuitCount = () => {
  useRequest(GetSuitAPI({
    campus: containId.value ?
      ( campusState_approval.value === "朝晖" ? 1 : (campusState_approval.value==="屏风" ? 2 : 3) ) :
      ( campusState_inventory.value === "朝晖" ? 1 : (campusState_inventory.value==="屏风" ? 2 : 3) ),
  }),{
    onSuccess: (data) => {
      console.log(data);
      const resData = data.data;
      if (data.code !== 1) throw new Error(data.msg);
      countData.value.上衣 = 0;
      countData.value.衬衫 = 0;
      countData.value.裤子 = 0;
      countData.value.鞋子 = 0;
      countData.value.领带 = 0;
      for(let i=0; i<resData.length; i++){
        if(resData[i].name === "上衣"){
          for(let j=0; j<resData[i].specs.length; j++)
            countData.value.上衣 += resData[i].specs[j].stock;
        } else if(resData[i].name === "裤子"){
          for(let j=0; j<resData[i].specs.length; j++)
            countData.value.裤子 += resData[i].specs[j].stock;
        } else if(resData[i].name === "衬衫"){
          for(let j=0; j<resData[i].specs.length; j++)
            countData.value.衬衫 += resData[i].specs[j].stock;
        } else if(resData[i].name === "领带"){
          for(let j=0; j<resData[i].specs.length; j++)
            countData.value.领带 += resData[i].specs[j].stock;
        } else {
          for(let j=0; j<resData[i].specs.length; j++)
            countData.value.鞋子 += resData[i].specs[j].stock;
        }
      }
    },
    onError: (e) => {
      console.log(e);
      message.error(`请求数据失败, ${e.message} || "未知错误"`);
    },
  });
};

/* ---- pending-approval ---- */

const campusState_approval = ref("朝晖");
const page_num = ref(1);
const total_page_num = ref(0);
const page_size = 16;
const tableData = ref<Datum[]>();

const updataTableDataWithFliter = () => {
  if(Number.isNaN(fliter_id.value)){fliter_id.value = undefined;}
  page_num.value = 1;
  useRequest(GetRecordAPI({
    page_num: page_num.value,
    page_size: page_size,
    campus: campusState_approval.value=="朝晖" ? 1 : (campusState_approval.value=="屏风" ? 2 : 3),
    choice: 1,
    id: fliter_id.value ? parseInt(fliter_id.value, 10) : undefined,
    student_id: fliter_student_id.value,
    supplies_name: fliter_suitapply_name.value,
    spec: fliter_spec.value,
  }),{
    onSuccess: (data) => {
      console.log(data);
      if (data.code !== 1) throw new Error(data.msg);
      else {
        total_page_num.value = data.data.total_page_num;
        tableData.value = data.data.data;
      }
    },
    onError: (e) => {
      console.log(e);
      message.error(`请求数据失败, ${e.message} || "未知错误"`);
    },
  });
};

const updataTableData = () => {
  useRequest(GetRecordAPI({
    page_num: page_num.value,
    page_size: page_size,
    campus: campusState_approval.value=="朝晖" ? 1 : (campusState_approval.value=="屏风" ? 2 : 3),
    choice: 1
  }),{
    onSuccess: (data) => {
      if (data.code !== 1) throw new Error(data.msg);
      else {
        total_page_num.value = data.data.total_page_num;
        tableData.value = data.data.data;
      }
    },
    onError: (e) => {
      console.log(e);
      message.error(`请求数据失败, ${e.message} || "未知错误"`);
    },
  });
};

updataTableData();

watch(page_num, () => {
  updataTableData();
});

const switchCampus_approval = (campus: string) => {
  campusState_approval.value = campus;
  updataTableData();
  updateSuitCount();
};

const getButtonColor_approval = (buttonName: string) => {
  return campusState_approval.value === buttonName ? "" : "rgb(144, 238, 144)";
};

const confirmDeleteApprovalData = (id: number) => {
  alert(id);
};

/* ---- pending-approval ---- */
/* ---- return-inventory ---- */

const campusState_inventory = ref("朝晖");
const inv_page_num = ref(1);
const inv_total_page_num = ref(0);
const inv_tableData = ref<Datum[]>();


const switchCampus_inventory = (campus: string) => {
  campusState_inventory.value = campus;
  updataInventoryData();
  updateSuitCount();
};

const getButtonColor_inventory = (buttonName: string) => {
  return campusState_inventory.value === buttonName ? "" : "rgb(144, 238, 144)";
};

const exportButton = () => {
  let camId = 1;
  switch(campusState_inventory.value){
    case "朝晖": camId = 1; break;
    case "屏风": camId = 2; break;
    case "莫干山": camId=3; break;
  }
  useRequest(GetExportAPI({campus: camId}),{
    onSuccess: (data) => {
      console.log(data);
      if (data.code !== 1) throw new Error(data.msg);
      else { window.location.href = data.data; }
    },
    onError: (e) => {
      console.log(e);
      message.error(`请求数据失败, ${e.message} || "未知错误"`);
    }
  });
};

const updataInventoryDataWithFliter = () => {
  useRequest(GetRecordAPI({
    page_num: inv_page_num.value,
    page_size: page_size,
    campus: campusState_inventory.value=="朝晖" ? 1 : (campusState_inventory.value=="屏风" ? 2 : 3),
    choice: 2,
    id: fliter_id.value ? parseInt(fliter_id.value, 10) : undefined,
    student_id: fliter_student_id.value,
    supplies_name: fliter_suitapply_name.value,
    spec: fliter_spec.value,
    status: fliter_state.value ? parseInt(fliter_state.value, 10) : undefined,
  }),{
    onSuccess: (data) => {
      if (data.code !== 1) throw new Error(data.msg);
      else {
        inv_total_page_num.value = data.data.total_page_num;
        inv_tableData.value = data.data.data;
      }
    },
    onError: (e) => {
      console.log(e);
      message.error(`请求数据失败, ${e.message} || "未知错误"`);
    },
  });
};

const updataInventoryData = () => {
  useRequest(GetRecordAPI({
    page_num: inv_page_num.value,
    page_size: page_size,
    campus: campusState_inventory.value=="朝晖" ? 1 : (campusState_inventory.value=="屏风" ? 2 : 3),
    choice: 2
  }),{
    onSuccess: (data) => {
      if (data.code !== 1) throw new Error(data.msg);
      else {
        inv_total_page_num.value = data.data.total_page_num;
        inv_tableData.value = data.data.data;
      }
    },
    onError: (e) => {
      console.log(e);
      message.error(`请求数据失败, ${e.message} || "未知错误"`);
    },
  });
};

updataInventoryData();

watch(inv_page_num, () => {
  updataInventoryData();
});

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