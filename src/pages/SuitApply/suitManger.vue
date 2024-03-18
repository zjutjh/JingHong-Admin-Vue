<template>
  <section class="pending-approval-container" v-if="containId">
    <n-page-header @back="handleBack" class="title-bar">
      <template #title> 待审批 </template>
    </n-page-header>
    <n-button type="info" @click="switchPage()" class="switch-page-button">切换为归还清点</n-button>
    <div class="button-div">
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
    </div>
    <div class="fliter">
      <span>编号</span><n-input class="f-input" type="text" placeholder="可输入ID" @keyup.enter="updataTableDataWithFliter()" :value="fliter_id" @update:value="fliter_idUpdate"/>
      <span>学号</span><n-input class="f-input" type="text" placeholder="可输入学号" @keyup.enter="updataTableDataWithFliter()" :value="fliter_student_id" @update:value="fliter_student_idUpdate"/>
      <span>物资名称</span><n-input class="f-input" type="text" placeholder="可输入名称" @keyup.enter="updataTableDataWithFliter()" :value="fliter_suitapply_name" @update:value="fliter_suitapply_nameUpdate"/>
      <span>规格</span><n-input class="f-input" type="text" placeholder="可输入尺码" @keyup.enter="updataTableDataWithFliter()" :value="fliter_spec" @update:value="fliter_specUpdate"/>
      <span>状态</span><div class="f-input"><n-select class="f-select" v-model:value="fliter_state" :options="stateOption"></n-select></div>
    </div>
    <div class="counter" @click="clickCounter">
      <span class="title">已借出正装统计</span>
      <div v-for="c in countData" :key="c[0]"><span>{{ c[0] }}</span>: {{ c[1] }} 件</div>
    </div>
    <n-modal v-model:show="showCountModal">
      <n-card
        style="width: 400px"
        title="统计"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-table>
          <tr v-for="data in countDataBeta" :key="data.name">
            <td>{{ data.name }}</td>
            <td v-for="d in data.specs" :key="d.id">{{ d.spec }} / {{ d.borrowed }}</td>
          </tr>
        </n-table>
      </n-card>
    </n-modal>
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
          <th>状态</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="tlData in tableData" :key="tlData.id">
            <manager-form
                v-if="showManagerForm"
                @open="handleOpenManagerForm"
                :source="selectedTlData"
                :campus="campusState_approval"
              />
            <td>{{ tlData.id }}</td>
            <td>{{ tlData.name }}</td>
            <td>{{ tlData.student_id }}</td>
            <td>{{ tlData.kind }}</td>
            <td>{{ tlData.supplies_name }}</td>
            <td>{{ tlData.spec }}</td>
            <td>{{ tlData.count }}</td>
            <td>{{ timeFormat(tlData.apply_time) }}</td>
            <td>{{ tlData.status === 1 ? "未审核" : (tlData.status === 2 ? "被驳回" : (tlData.status === 3 ? "借用中" : "已归还")) }}</td>
            <td>
            <n-button size="small" @click="handleManager(tlData)">审批</n-button>
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
    <n-button type="primary" class="input-button" @click="pageJumptoSuitImport">录入</n-button>
    <n-button type="primary" class="output-button" @click="exportButton">导出</n-button>
    <div class="button-div">
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
    </div>
    <div class="fliter">
      <span>编号</span><n-input class="f-input" type="text" placeholder="可输入ID" @keyup.enter="updataInventoryDataWithFliter()" :value="fliter_id" @update:value="fliter_idUpdate"/>
      <span>学号</span><n-input class="f-input" type="text" placeholder="可输入学号" @keyup.enter="updataInventoryDataWithFliter()" :value="fliter_student_id" @update:value="fliter_student_idUpdate"/>
      <span>物资名称</span><n-input class="f-input" type="text" placeholder="可输入名称" @keyup.enter="updataInventoryDataWithFliter()" :value="fliter_suitapply_name" @update:value="fliter_suitapply_nameUpdate"/>
      <span>规格</span><n-input class="f-input" type="text" placeholder="可输入尺码" @keyup.enter="updataInventoryDataWithFliter()" :value="fliter_spec" @update:value="fliter_specUpdate"/>
      <span>状态</span><div class="f-input"><n-select class="f-select" v-model:value="fliter_state" :options="stateOption"></n-select></div>
    </div>
    <div class="counter" @click="clickCounter">
      <span class="title">已借出正装统计</span>
      <div v-for="c in countData" :key="c[0]"><span>{{ c[0] }}</span>: {{ c[1] }} 件</div>
    </div>
    <n-modal v-model:show="showCountModal">
      <n-card
        style="width: 400px"
        title="统计"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-table>
          <tr v-for="data in countDataBeta" :key="data.name">
            <td>{{ data.name }}</td>
            <td v-for="d in data.specs" :key="d.id">{{ d.spec }} / {{ d.borrowed }}</td>
          </tr>
        </n-table>
      </n-card>
    </n-modal>
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
            <count-form
              v-if="showCountForm"
              @open="handleOpenCountForm"
              :source="selectedTlData"
              :campus="campusState_inventory"
            />
            <td>{{ tlData.id }}</td>
            <td>{{ tlData.name }}</td>
            <td>{{ tlData.student_id }}</td>
            <td>{{ tlData.kind }}</td>
            <td>{{ tlData.supplies_name }}</td>
            <td>{{ tlData.spec }}</td>
            <td>{{ tlData.count }}</td>
            <td>{{ timeFormat(tlData.borrow_time) }}</td>
            <td v-if="tlData.status === 4" >{{ timeFormat(tlData.return_time) }}</td>
            <td v-else-if="tlData.status === 3 && !isOverTime(tlData.borrow_time)" >剩余{{ timeCount(tlData.borrow_time) }}</td>
            <td v-else-if="tlData.status === 3 && isOverTime(tlData.borrow_time)" >超时{{ timeCount(tlData.borrow_time) }}</td>
            <td>{{ tlData.status === 1 ? "未审核" : (tlData.status === 2 ? "被驳回" : (tlData.status === 3 ? "借用中" : "已归还")) }}</td>
            <td>
              <n-button size="small" @click="handleCount(tlData)">查看</n-button>
              <n-button v-if="tlData.status !== 4" size="small" @click="() => check(tlData.id)">确认归还</n-button>
              <n-button v-if="tlData.status !== 4" size="small" @click="() => setSuppliesReturn(tlData)">{{ tlData.kind === "正装" ? "取消借出" : "删除" }}</n-button>
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
  NPagination,
  NModal,
  NCard,
  NSelect
} from "naive-ui";
import { computed, ref, watch } from "vue";
import { GetExportAPI, GetRecordAPI, GetSuitAPI, suppliesReturnAPI } from "@/apis/SuitApplyAPI/index";
import { useRequest } from "vue-request";
import type { Datum } from "@/apis/SuitApplyAPI/getRecord";
import managerForm from "./manageForm.vue";
import countForm from "./countForm.vue";
import dayjs from "dayjs";
import { useMangerStore } from "@/store";

const handleBack = () => {
  router.push("/suitapply");
};

const mangerStore = useMangerStore();
mangerStore.setCampusState_inventory("朝晖");
const showManagerForm = ref(false);
const showCountForm = ref(false);
const campusList = ["朝晖", "屏峰", "莫干山"];
const containId = ref(mangerStore.containId);
const message = useMessage();
const fliter_id = ref<string>();
const fliter_student_id = ref<string>();
const fliter_suitapply_name = ref<string>();
const fliter_spec = ref<string>();
const fliter_state = ref<string>();
const showCountModal = ref(false);
const showModalCheck = ref(false);
const showModalReject = ref(false);
const showModaldelReject = ref(false);

const fliter_idUpdate = (value: string) => { fliter_id.value = value; };
const fliter_student_idUpdate = (value: string) => { fliter_student_id.value = value; };
const fliter_suitapply_nameUpdate = (value: string) => { fliter_suitapply_name.value = value; };
const fliter_specUpdate = (value: string) => { fliter_spec.value = value; };
const countData = ref();
const countDataBeta = ref();
const stateOption = computed(() => {
  if(containId.value){
    return [{
      label: "未审核",
      value: "未审核"
    },{
      label: "被驳回",
      value: "被驳回"
    },{
      label: "所有",
      value: ""
    }];
  } else {
    return [{
      label: "借用中",
      value: "借用中"
    },{
      label: "已归还",
      value: "已归还"
    },{
      label: "所有",
      value: ""
    }];
  }
});

const switchPage = () => {
  containId.value = !containId.value;
  mangerStore.setContianId(containId.value);
  updateSuitCount();
  updataInventoryData();
  updataTableData();
};

const timeFormat = (time: string) => {
  return dayjs(time).format("YYYY年MM月DD日");
};

const clickCounter = () => {
  showCountModal.value = true;
};

const updateSuitCount = () => {
  useRequest(GetSuitAPI({
    campus: containId.value ?
      ( campusState_approval.value === "朝晖" ? 1 : (campusState_approval.value==="屏峰" ? 2 : 3) ) :
      ( campusState_inventory.value === "朝晖" ? 1 : (campusState_inventory.value==="屏峰" ? 2 : 3) ),
  }),{
    onSuccess: (data) => {
      console.log(data);
      const resData = data.data;
      countDataBeta.value = data.data;
      if (data.code !== 1) throw new Error(data.msg);
      countData.value = [];
      for(let i=0; i<resData.length; i++){
        countData.value.push([resData[i].name, 0]);
        for(let j=0; j<resData[i].specs.length; j++){
          countData.value[countData.value.length-1][1] += resData[i].specs[j].borrowed;
        }
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

const showcheck = () => {
  showModalCheck.value = true;
};
const showsetSuppliesReturn = (kind:string) => {
  if(kind == '正装'){
    showModalReject.value =true;
  }
  else{
    showModaldelReject.value =true;
  }
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
    campus: campusState_approval.value=="朝晖" ? 1 : (campusState_approval.value=="屏峰" ? 2 : 3),
    choice: 1,
    id: fliter_id.value ? parseInt(fliter_id.value, 10) : undefined,
    student_id: fliter_student_id.value,
    supplies_name: fliter_suitapply_name.value,
    spec: fliter_spec.value,
    status: fliter_state.value === "未审核" ? 1 : (fliter_state.value === "被驳回" ? 2 : (fliter_state.value === "借用中" ? 3 : (fliter_state.value === "已归还" ? 4 : undefined))),
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
    },
  });
};

const updataTableData = () => {
  useRequest(GetRecordAPI({
    page_num: page_num.value,
    page_size: page_size,
    campus: campusState_approval.value=="朝晖" ? 1 : (campusState_approval.value=="屏峰" ? 2 : 3),
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
updateSuitCount();

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

/* ---- pending-approval ---- */
/* ---- return-inventory ---- */

const campusState_inventory = ref("朝晖");
const inv_page_num = ref(1);
const inv_total_page_num = ref(0);
const inv_tableData = ref<Datum[]>();

watch(fliter_state, () => {
  updataInventoryDataWithFliter();
  updataTableDataWithFliter();
});

const pageJumptoSuitImport = () => {
  router.push("/suitImport");
};

const switchCampus_inventory = (campus: string) => {
  campusState_inventory.value = campus;
  mangerStore.setCampusState_inventory(campus);
  updataInventoryData();
  updateSuitCount();
};

const getButtonColor_inventory = (buttonName: string) => {
  return campusState_inventory.value === buttonName ? "" : "rgb(144, 238, 144)";
};

const setSuppliesReturn = (tlData: Datum) => {
  useRequest(suppliesReturnAPI({id: tlData.id,supplies_return: 2}), {
    onSuccess: (data) => {
      if (data.code !== 1) throw new Error(data.msg);
      message.success("成功"+(tlData.kind === "正装" ? "取消借出" : "删除"));
      updateSuitCount();
      updataInventoryData();
      updataTableData();
    },
    onError: (e) => {
      console.log(e);
      message.error(`${e.message} || "未知错误"`);
    }
  });
};

const exportButton = () => {
  let camId = 1;
  switch(campusState_inventory.value){
    case "朝晖": camId = 1; break;
    case "屏峰": camId = 2; break;
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
  if(Number.isNaN(fliter_id.value)){fliter_id.value = undefined;}
  inv_page_num.value = 1;
  useRequest(GetRecordAPI({
    page_num: inv_page_num.value,
    page_size: page_size,
    campus: campusState_inventory.value=="朝晖" ? 1 : (campusState_inventory.value=="屏峰" ? 2 : 3),
    choice: 2,
    id: fliter_id.value ? parseInt(fliter_id.value, 10) : undefined,
    student_id: fliter_student_id.value,
    supplies_name: fliter_suitapply_name.value,
    spec: fliter_spec.value,
    status: fliter_state.value === "未审核" ? 1 : (fliter_state.value === "被驳回" ? 2 : (fliter_state.value === "借用中" ? 3 : (fliter_state.value === "已归还" ? 4 : undefined))),
  }),{
    onSuccess: (data) => {
      if (data.code !== 1) throw new Error(data.msg);
      else {
        inv_total_page_num.value = data.data.total_page_num;
        console.log(data.data);
        inv_tableData.value = data.data.data;
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

const updataInventoryData = () => {
  useRequest(GetRecordAPI({
    page_num: inv_page_num.value,
    page_size: page_size,
    campus: campusState_inventory.value=="朝晖" ? 1 : (campusState_inventory.value=="屏峰" ? 2 : 3),
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
updateSuitCount();

watch(inv_page_num, () => {
  updataInventoryData();
});

const selectedTlData= ref<Datum>({} as Datum);

const handleManager =(tlData:Datum) =>{
  showManagerForm.value = true;
  selectedTlData.value = tlData;
};

const handleCount =(tlData:Datum) =>{
  showCountForm.value = true;
  selectedTlData.value = tlData;
};

const handleOpenCountForm = (state: boolean) => {
  showCountForm.value = state;
  updataInventoryData();
};

const handleOpenManagerForm = (state: boolean) => {
  showManagerForm.value = state;
  updataTableData();
};

/* ---- return-inventory ---- */

const timeCount= (borrow_time:string) => {
  let secondDuring =(dayjs(borrow_time).add(7,"day").unix())-(dayjs().unix());
  if(secondDuring < 0){
    secondDuring = (dayjs().unix())-(dayjs(borrow_time).add(7,"day").unix());
  }
  const setMinutes = Math.floor(secondDuring%60);
  const setHours = Math.floor(secondDuring/60/60%24);
  const setDay = Math.floor(secondDuring/60/60/24);
  if (setDay>0){
  return setDay + "天" + setHours + "小时" + setMinutes + "分";
  }
  else if (setHours>0){
  return setHours + "小时" + setMinutes + "分";
  }
  else if (setMinutes>0){
  return setMinutes + "分";
  }
};

const isOverTime = (borrow_time:string) => {
  const secondDuring =(dayjs(borrow_time).add(7,"day").unix())-(dayjs().unix());
  return (secondDuring < 0);
};

const check = (id:number) => {
  useRequest(suppliesReturnAPI({
    supplies_return: 1,
    id: id,
  }),{
    onSuccess: (data) =>{
        if(data.code==1){
          message.success("已处理归还");
          updateSuitCount();
          updataInventoryData();
          updataTableData();
        }
    },
  });
};

</script>

<style lang="scss">
.pending-approval-container {
  padding: 30px;
  position: relative;

  .switch-page-button {
    margin: 10px 60vh 10px 0;
  }

  .button-div {
    position: absolute;
    top: 100px;
    right: 160px;
    display: flex;
    flex-direction: row;

    .campus-button {
      margin: 0 10px;
    }
  }


  .fliter .f-input{
    display: inline-block;
    position: relative;
    margin: 10px;
    width: 10vw;

    .f-select {
      position: absolute;
      top: -13px;
    }
  }

  .counter {
    padding: 10px 0;
    .title { margin-right: 127px; }
    div {
      display: inline-block;
      margin: 0 25px;
      span { color: rgba(10, 111, 194, 1); }
    }
  }
}

.return-inventory-container {
  padding: 30px;
  position: relative;

  .switch-page-button {
    margin: 10px 0 10px 0;
  }

  .input-button {
    margin-left: 70px;
  }
  .output-button {
    margin-left: 70px;
    margin-right: 147px;
  }

  .button-div {
    position: absolute;
    top: 100px;
    right: 160px;
    display: flex;
    flex-direction: row;

    .campus-button {
      margin: 0 10px;
    }
  }

  .fliter .f-input{
    display: inline-block;
    position: relative;
    margin: 10px;
    width: 10vw;

    .f-select {
      position: absolute;
      top: -13px;
    }
  }

  .counter {
    padding: 10px 0;
    .title { margin-right: 127px; }
    div {
      display: inline-block;
      margin: 0 25px;
      span { color: rgba(10, 111, 194, 1); }
    }
  }
}
</style>