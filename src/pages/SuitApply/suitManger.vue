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
    <div style="display: inline-flex; ">
      <n-button type="primary" size="small" @click="showBatchApprovalCheck = true" style="margin-left: 10px">批量审批通过</n-button>
      <n-button type="warning" size="small"  @click="showBatchApprovalReject = true" style="margin-left: 30px">批量审批驳回</n-button>
    <div class="counter" @click="clickCounter" style="width: 800px ;margin-left: 100px">
      <span class="title">已借出正装统计</span>
      <div v-for="c in countData" :key="c[0]"><span>{{ c[0] }}</span>: {{ c[1] }} 件</div>
    </div>

    </div>
    <n-modal v-model:show="showCountModal">
      <n-card
        style="width: fit-content"
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
        <th style="justify-content: center;display: flex">选择</th>
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
            :campus="campusState"
          />
          <td ><n-checkbox  @change="toggleSelectedApproval(tlData.id)" :disabled= "tlData.status === 2" style="margin-left: 10px"/></td>
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
    <div style="display: inline-flex">
      <n-button type="primary" size="small" @click="showBatchReturnApprove = true" style="margin-left: 10px">批量确认归还</n-button>
      <n-button type="warning" size="small"  @click="showBatchReturnCancel = true" style="margin-left: 30px">批量取消借出</n-button>
    <div class="counter" @click="clickCounter" style="width: 800px;margin-left: 100px">
      <span class="title">已借出正装统计</span>
      <div v-for="c in countData" :key="c[0]"><span>{{ c[0] }}</span>: {{ c[1] }} 件</div>
    </div>
    </div>
    <n-modal v-model:show="showCountModal">
      <n-card
        style="width: fit-content"
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
        <th style="justify-content: center;display: flex">选择</th>
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
            :campus="campusState"
          />
          <td><n-checkbox  @change="toggleSelectedBack(tlData.id)" :disabled=" tlData.status !== 3" style="margin-left: 10px"/></td>
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
          <td >
            <n-button size="small" @click="handleCount(tlData)">查看</n-button>
            <n-button v-if="tlData.status !== 4" size="small" @click="() => check(tlData.id)">确认归还</n-button>
            <n-button v-if="tlData.status !== 4" size="small" @click="showConfirmModalFunc(tlData)">{{ tlData.kind === "正装" ? "取消借出" : "删除" }}</n-button>
            <n-button v-if="tlData.status == 4 && tlData.kind == '正装'" size="small" @click="() => setSuppliesCancel(tlData.id)">取消确认归还</n-button>
          </td>
        </tr>
        </tbody>
      </n-table>
      <n-pagination v-model:page="inv_page_num" :page-count="inv_total_page_num" />
      <n-modal v-model:show="showConfirmModal">
        <n-card
          style="width: 400px"
          :title="confirmModalData.kind === '正装' ? '取消借出' : '删除'"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
        >
          <div
            style="display: flex; justify-content: space-around; margin-top: 30px"
          >
            <n-button type="primary" @click="() => setSuppliesReturn(confirmModalData.id)"
              >{{ confirmModalData.kind === '正装' ? '取消借出' : '删除' }}</n-button
            >
            <n-button @click="showConfirmModal = false">取消</n-button>
          </div>
        </n-card>
      </n-modal>
    </div>
  </section>
  <n-modal v-model:show="showBatchReturnApprove">
    <n-card
      style="width: 400px"
      title="确认批量审批"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #footer>
        <div style="display: flex ;justify-content: space-evenly">
        <n-button @click="batchReturnApprove" type="primary">确认</n-button>
        <n-button @click="showBatchReturnApprove = false" type="warning">取消</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
  <n-modal v-model:show="showBatchReturnCancel">
    <n-card
      style="width: 400px"
      title="确认批量审批"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #footer>
        <div style="display: flex ;justify-content: space-evenly">
          <n-button @click="batchReturnCancel" type="primary">确认</n-button>
          <n-button @click="showBatchReturnCancel = false" type="warning">取消</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
  <n-modal v-model:show="showBatchApprovalReject">
    <n-card
      style="width: 400px"
      title="确认批量驳回"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #footer>
        <div style="display: flex ;justify-content: space-evenly">
          <n-button @click="batchApprovalReject" type="primary">确认</n-button>
          <n-button @click="showBatchApprovalReject = false" type="warning">取消</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
  <n-modal v-model:show="showBatchApprovalCheck">
    <n-card
      style="width: 400px"
      title="确认批量通过"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #footer>
        <div style="display: flex ;justify-content: space-evenly">
          <n-button @click="batchApprovalCheck" type="primary">确认</n-button>
          <n-button @click="showBatchApprovalCheck = false" type="warning">取消</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
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
import { GetExportAPI, GetRecordAPI, GetSuitAPI, suppliesCancleAPI, suppliesReturnAPI } from "@/apis/SuitApplyAPI/index";
import { useRequest } from "vue-request";
import type { Datum } from "@/apis/SuitApplyAPI/getRecord";
import managerForm from "./manageForm.vue";
import countForm from "./countForm.vue";
import dayjs from "dayjs";
import { useMangerStore } from "@/store";
import batchSuppliesReturnAPI from "@/apis/SuitApplyAPI/batchSuppilesReturn";
import batchApprovalAPI from "@/apis/SuitApplyAPI/batchApproval";

const handleBack = () => {
  router.push("/suitapply");
};

const mangerStore = useMangerStore();
mangerStore.setCampusState("朝晖");
const campusState = ref(mangerStore.campusState);
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
const fliter_idUpdate = (value: string) => { fliter_id.value = value; };
const fliter_student_idUpdate = (value: string) => { fliter_student_id.value = value; };
const fliter_suitapply_nameUpdate = (value: string) => { fliter_suitapply_name.value = value; };
const fliter_specUpdate = (value: string) => { fliter_spec.value = value; };
const countData = ref();
const countDataBeta = ref();
const showBatchReturnApprove = ref(false);
const showBatchReturnCancel = ref(false);
const showBatchApprovalCheck = ref(false);
const showBatchApprovalReject = ref(false);
const checkedBackId = ref<number[]>([]);
const checkedApprovalId = ref<number[]>([]);
const showConfirmModal = ref(false);
const confirmModalData = ref();

const showConfirmModalFunc = (data: any) => {
  console.log("1145141919810");
  showConfirmModal.value = true;
  confirmModalData.value = data;
};

const batchReturnApprove = () => {
  showBatchReturnApprove.value = false;
  useRequest(batchSuppliesReturnAPI({
    ids: checkedBackId.value,
    supplies_return: 1,
  }),{
    onSuccess: (data) => {
      if(data.code === 1){
        message.success("批量操作成功");
        updateSuitCount();
        updataInventoryData();
        updataTableData();
        checkedBackId.value = [];
      }else{
        message.error(data.msg);
        throw new Error(data.msg);
      }
    },
    onError: (e) => {
      throw new Error(e);
    },
  });
};

const toggleSelectedBack = (Id: number) => {
  if (checkedBackId.value.includes(Id)) {
    // 如果学生已选中，则取消选中
    checkedBackId.value = checkedBackId.value.filter(id => id !== Id);
  } else {
    // 如果学生未选中，则选中
    checkedBackId.value.push(Id);
  }
};

const toggleSelectedApproval = (Id: number) => {
  if (checkedApprovalId.value.includes(Id)) {
    // 如果学生已选中，则取消选中
    checkedApprovalId.value = checkedApprovalId.value.filter(id => id !== Id);
  } else {
    // 如果学生未选中，则选中
    checkedApprovalId.value.push(Id);
  }
};

const batchReturnCancel = () => {
  showBatchReturnCancel.value = false;
  useRequest(batchSuppliesReturnAPI({
    ids: checkedBackId.value,
    supplies_return: 2,
  }),{
    onSuccess: (data) => {
      if(data.code === 1){
        message.success("批量操作成功");
        updateSuitCount();
        updataInventoryData();
        updataTableData();
        checkedBackId.value = [];
      }else{
        message.error(data.msg);
        throw new Error(data.msg);
      }
    },
    onError: (e) => {
      throw new Error(e);
    },
  });
};
const batchApprovalCheck = () => {
  showBatchApprovalCheck.value = false;
  useRequest(batchApprovalAPI({
    ids: checkedApprovalId.value,
    supplies_check: 1,
  }),{
    onSuccess: (data) => {
      if(data.code === 1){
        message.success("批量操作成功");
        updataTableData();
        checkedApprovalId.value = [];
      }else{
        message.error( data.msg);
        throw new Error(data.msg);
      }
    },
    onError: (e) => {
      throw new Error(e);
    },
  });
};
const batchApprovalReject = () => {
  showBatchApprovalReject.value = false;
  useRequest(batchApprovalAPI({
    ids: checkedApprovalId.value,
    supplies_check: 2,
  }),{
    onSuccess: (data) => {
      if(data.code === 1){
        message.success("批量操作成功");
        updataTableData();
        checkedApprovalId.value = [];
      }else{
        message.error( data.msg);
        throw new Error(data.msg);
      }
    },
    onError: (e) => {
      throw new Error(e);
    },
  });
};
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
  updataInventoryDataWithFliter();
  updataTableDataWithFliter();
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
      ( campusState.value === "朝晖" ? 1 : (campusState.value==="屏峰" ? 2 : 3) ) :
      ( campusState.value === "朝晖" ? 1 : (campusState.value==="屏峰" ? 2 : 3) ),
  }),{
    onSuccess: (data) => {
      if(data.data !== null){
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
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

/* ---- pending-approval ---- */

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
    campus: campusState.value=="朝晖" ? 1 : (campusState.value=="屏峰" ? 2 : 3),
    choice: 1,
    id: fliter_id.value ? parseInt(fliter_id.value, 10) : undefined,
    student_id: fliter_student_id.value,
    supplies_name: fliter_suitapply_name.value,
    spec: fliter_spec.value,
    status: fliter_state.value === "未审核" ? 1 : (fliter_state.value === "被驳回" ? 2 : (fliter_state.value === "借用中" ? 3 : (fliter_state.value === "已归还" ? 4 : undefined))),
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
    },
  });
};

const updataTableData = () => {
  useRequest(GetRecordAPI({
    page_num: page_num.value,
    page_size: page_size,
    campus: campusState.value=="朝晖" ? 1 : (campusState.value=="屏峰" ? 2 : 3),
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
  updataTableDataWithFliter();
});

const switchCampus_approval = (campus: string) => {
  campusState.value = campus;
  updataTableDataWithFliter();
  updateSuitCount();
};

const getButtonColor_approval = (buttonName: string) => {
  return campusState.value === buttonName ? "" : "rgb(144, 238, 144)";
};

/* ---- pending-approval ---- */
/* ---- return-inventory ---- */

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
  campusState.value = campus;
  mangerStore.setCampusState(campus);
  updataInventoryData();
  updateSuitCount();
};

const getButtonColor_inventory = (buttonName: string) => {
  return campusState.value === buttonName ? "" : "rgb(144, 238, 144)";
};

const setSuppliesReturn = (id: number) => {
  useRequest(suppliesReturnAPI({id: id,supplies_return: 2}), {
    onSuccess: (data) => {
      if (data.code !== 1) throw new Error(data.msg);
      message.success("成功删除");
      updateSuitCount();
      updataInventoryDataWithFliter();
      updataTableDataWithFliter();
      showConfirmModal.value = false;
    },
    onError: (e) => {
      console.log(e);
      message.error(`${e.message} || "未知错误"`);
    }
  });
};

const setSuppliesCancel = (id: number) => {
  useRequest(suppliesCancleAPI({id: id}), {
    onSuccess: (data) => {
      if (data.code !== 1) throw new Error(data.msg);
      message.success("成功取消借出");
      updateSuitCount();
      updataInventoryDataWithFliter();
      updataTableDataWithFliter();
    },
    onError: (e) => {
      console.log(e);
      message.error(`${e.message} || "未知错误"`);
    }
  });
};

const exportButton = () => {
  let camId = 1;
  switch(campusState.value){
    case "朝晖": camId = 1; break;
    case "屏峰": camId = 2; break;
    case "莫干山": camId=3; break;
  }
  useRequest(GetExportAPI({campus: camId}),{
    onSuccess: (data) => {
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
    campus: campusState.value=="朝晖" ? 1 : (campusState.value=="屏峰" ? 2 : 3),
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
    campus: campusState.value=="朝晖" ? 1 : (campusState.value=="屏峰" ? 2 : 3),
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
  updataInventoryDataWithFliter();
};

const handleOpenManagerForm = (state: boolean) => {
  showManagerForm.value = state;
  updataTableDataWithFliter();
};

/* ---- return-inventory ---- */

const timeCount= (borrow_time:string) => {
  let secondDuring =(dayjs(borrow_time).add(7,"day").unix())-(dayjs().unix());
  if(secondDuring < 0){
    secondDuring = (dayjs().unix())-(dayjs(borrow_time).add(7,"day").unix());
  }
  const setHours = Math.floor(secondDuring/60/60%24);
  const setDay = Math.floor(secondDuring/60/60/24);
  if (Math.abs(setDay)>0){
    return setDay+"天\t";
  }
  else{
    return setHours+"小时\t";
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
        updataInventoryDataWithFliter();
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