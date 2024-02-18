<template>
  <section>
    <n-page-header @back="handleBack" class="title-bar">
      <template #title> 导入借用信息 </template>
    </n-page-header>
    <div class="person-info">
      <div class="stu-id">学号</div>
      <n-input type="text" placeholder="请输入学生学号" class="input-stu-id" v-model:value="studentId"></n-input>
      <div class="import-setting">
        <n-button type="primary" size="small" class="import-button" @click="getStudentInfo">导入</n-button>
        <div>
          <span>没有微精弘账号?</span>
          <hr>
          <span>没有填写个人信息?</span>
        </div>
        <div class="manual-import-button" @click="showManualImport">手动导入</div>
      </div>
      <div class="stu-info-input" v-if="showManualImportBar">
        <div>
          <div>
            <span>姓名</span>
            <n-input type="text" class="info-input" size="small" v-model:value="stuName" :disabled="isManualImport === 2"></n-input>
          </div>
          <div>
            <span>寝室号</span>
            <n-input type="text" class="info-input" size="small" v-model:value="stuRoomNum" :disabled="isManualImport === 2"></n-input>
          </div>
          <div>
            <span>联系方式</span>
            <n-input type="text" class="info-input" size="small" v-model:value="stuPhone" :disabled="isManualImport === 2"></n-input>
          </div>
        </div>
        <div>
          <div>
            <span>性别</span>
            <n-input type="text" class="info-input" size="small" v-model:value="stuGender" :disabled="isManualImport === 2"></n-input>
          </div>
          <div>
            <span>学院</span>
            <n-input type="text" class="info-input" size="small" v-model:value="stuCollege" :disabled="isManualImport === 2"></n-input>
          </div>
        </div>
      </div>
    </div>
    <div class="rent-info">
      <hr>
      <div>
        <span>是否为正装</span>
        <n-select :options="suitSelectOption" size="small" style="width: 250px;" v-model:value="isSuit" :disabled="isManualImport === 0 || !matualImportOver"></n-select>
      </div>
      <div class="rent-info-input">
        <div>
          <div class="selector">
            <span>校区</span>
            <n-select :options="campusSelectOption" size="small" v-model:value="suitCampus" :disabled="isSuit === undefined"></n-select>
          </div>
          <div>
            <span>名称</span>
            <n-input type="text" class="info-input" size="small" v-model:value="suitName" :disabled="isSuit !== 0 && suitCampus === undefined"></n-input>
          </div>
          <div>
            <span>数量</span>
            <n-input type="text" class="info-input" size="small" v-model:value="suitNumber" :disabled="isSuit !== 0 && suitCampus === undefined"></n-input>
          </div>
        </div>
        <div>
          <div>
            <span>种类</span>
            <n-input type="text" class="info-input" size="small" v-model:value="suitkind" :disabled="isSuit !== 0 && suitCampus === undefined"></n-input>
          </div>
          <div>
            <span>规格</span>
            <n-input type="text" class="info-input" size="small" v-model:value="suitSpec" :disabled="isSuit !== 0 && suitCampus === undefined"></n-input>
          </div>
          <div>
            <span>库存</span>
            <n-input type="text" class="info-input" size="small" v-model:value="suitStock" :disabled="true"></n-input>
          </div>
        </div>
      </div>
      <n-button type="primary" size="small" @click="importInfo">录入</n-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import router from "@/routers";
import {
  NInput,
  NPageHeader,
  NButton,
  NSelect,
  useMessage
} from "naive-ui";
import { computed, ref, watch } from "vue";
import { useRequest } from "vue-request";
import { getStudentInfoAPI, GetSuitAPI, setSuppliesImportAPI } from "@/apis/SuitApplyAPI";

const message = useMessage();
const showManualImportBar = ref(false);
const studentId = ref();
const isManualImport = ref(0); // 0为未导入 1为手动导入 2为自动导入
const suitSelectOption = [{
  label: "是",
  value: 1
},{
  label: "否",
  value: 0
}];
const campusSelectOption = [{
  label: "朝晖",
  value: 1
},{
  label: "屏风",
  value: 2
},{
  label: "莫干山",
  value: 3
}];
const isSuit = ref();
const stuName = ref();
const stuRoomNum = ref();
const stuPhone = ref();
const stuGender = ref();
const stuCollege = ref();
const suitCampus = ref();
const suitNumber = ref();
const suitName = ref();
const suitStock = ref();
const suitSpec = ref();
const suitkind = ref();
const matualImportOver = computed(() => {
  return stuName.value !== undefined && stuRoomNum.value !== undefined && stuPhone.value !== undefined && stuGender.value !== undefined && stuCollege.value !== undefined;
});
const suitImportOver = computed(() => {
  return suitCampus.value !== undefined && suitNumber.value !== undefined && suitName.value !== undefined && suitSpec.value !== undefined && suitkind.value !== undefined;
});

watch(suitCampus, () => {
  if(isSuit.value === 1){
    suitkind.value = "正装";
    useRequest(GetSuitAPI({campus: suitCampus.value}), {
      onSuccess(data){
        if(data.code !== 1) throw new Error(data.msg);
        suitName.value = data.data[0].name;
        suitSpec.value = data.data[0].specs[0].spec;
        suitNumber.value = 1;
        suitStock.value = data.data[0].specs[0].stock;
      },
      onError: (e) => {
        console.log(e);
        message.error(`${e.message} || "未知错误"`);
      },
    });
  }
});

const handleBack = () => {
  router.push("/suitManger");
};

const showManualImport = () => {
  showManualImportBar.value = true;
  isManualImport.value = 1;
};

const getStudentInfo = () => {
  useRequest(getStudentInfoAPI({
    student_id: studentId.value
  }), {
    onSuccess(data){
      if(data.code !== 1) throw new Error(data.msg);
      message.success("导入成功");
      showManualImportBar.value = true;
      stuName.value = data.data.name;
      stuCollege.value = data.data.college;
      stuGender.value = data.data.gender;
      stuPhone.value = data.data.contact;
      stuRoomNum.value = data.data.dormitory;
      isManualImport.value = 2;
    },
    onError: (e) => {
      console.log(e);
      message.error(`${e.message} || "未知错误"`);
    },
  });
};

const importInfo = () => {
  if(suitImportOver.value && matualImportOver){
    const data = {
      campus: parseInt(suitCampus.value, 10),
      count: parseInt(suitNumber.value, 10),
      kind: suitkind.value,
      spec:suitSpec.value,
      supplies_name: suitName.value,
      college: stuCollege.value,
      contact: stuPhone.value,
      dormitory: stuRoomNum.value,
      gender: stuGender.value,
      name: stuName.value,
      student_id: studentId.value,
    };
    console.log(data);
    useRequest(setSuppliesImportAPI(data), {
      onSuccess(data){
        if(data.code !== 1) throw new Error(data.msg);
        message.success("导入成功");
        router.push("/suitManger");
      },
      onError: (e) => {
        console.log(e);
        message.error(`${e.message} || "未知错误"`);
      },
    });
  } else {
    message.warning("请先检查信息是否填写完毕");
  }
};

</script>

<style lang="scss">
.title-bar {
  margin: 30px 0 15px 30px;
}

.person-info {
  margin:  0 0 15px 60px;

  .stu-id {
    margin: 5px;
    font-size: large;
  }

  .input-stu-id {
    margin: 5px;
    width: 300px;
  }

  .import-setting {
    margin: 5px;
    display: flex;

    .import-button {
      margin-top: 10px;
      margin-right: 30px;
    }

    div {
      color: #2a2a2a;
      font-size: small;
      hr {
        margin: 0;
      }
    }

    .manual-import-button {
      margin-top: 10px;
      color: blue;
    }
  }

  .stu-info-input {
    display: flex;
    padding: 6px;
  }
}

.rent-info {
  margin:  0 15px 15px 60px;

  .rent-info-input {
    display: flex;
    padding: 6px;
  }
}

</style>