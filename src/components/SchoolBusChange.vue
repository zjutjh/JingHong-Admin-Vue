<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { NSpace,NLayout,NForm,NFormItem,NSelect,NTimePicker,NButton,NPopconfirm} from 'naive-ui'

import createAPI from "../apis/SchoolBusAPI/SchoolBusCreate";
import updateAPI from "../apis/SchoolBusAPI/SchoolBusUpdate";
import deleteAPI from "../apis/SchoolBusAPI/SchoolBusDelete";
import getAPI from "../apis/SchoolBusAPI/SchoolBusGet";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function genOptions (depth = 2, iterator = 1, prefix = ''): any {
  const length = 12
}

export default defineComponent({
  setup () {

    const formRef = ref(null)
    const model = ref({
      inputValue: null,
      selectValue: null,
      selectId:null,
      selectDeparture:null,
      selectDestination:null,
      selectStartTime:null,
      selectLine:null,
      autoCompleteValue: '',
      dynamicTagsValue: ['teacher', 'frontend'],
      cascaderValue: null,
      datetimeValue: null,
      switchValue: false,
      checkboxValue: false,
      checkboxGroupValue: null,
      radioValue: 'Definitely Maybe',
      radioGroupValue: null,
      radioButtonGroupValue: null,
      inputNumberValue: null,
      timePickerValue: null,
      colorValue: null,
      sliderValue: 0,
      transferValue: null
    })

    const inputValueRef = ref('10:29')
    const inputNumberValueRef = ref(1029)
    const selectValueRef = ref('10:29')
    //注意，上面这三行为数据传输

    const message = useMessage()
    // 注意，上面这一行为确认按钮部分
    return {

      inputValue: inputValueRef,
      inputNumberValue: inputNumberValueRef,
      selectValue: selectValueRef,
      selectOptions: [
        {
          label: '10:28',
          value: '10:28'
        },
        {
          label: '10:29',
          value: '10:29'
        },
        {
          label: '10:30',
          value: '10:30'
        }
      ],
      inputValidationStatus: computed(() => {
        return createStatus(inputValueRef.value)
      }),
      inputFeedback: computed(() => {
        return createFeedback(inputValueRef.value)
      }),
      inputNumberValidationStatus: computed(() => {
        return createStatus(createTimeForNumber(inputNumberValueRef.value))
      }),
      inputNumberFeedback: computed(() => {
        return createFeedback(createTimeForNumber(inputNumberValueRef.value))
      }),
      selectValidationStatus: computed(() => {
        return createStatus(selectValueRef.value)
      }),
      selectFeedback: computed(() => {
        return createFeedback(selectValueRef.value)
      }),
      //注意，上面这一坨是数据传输

      updateDisabled: ref(false),
      formRef,
      model,

      Id: ['1', '2', '3', '4','5'].map(
        (v) => ({
          label: v,
          value: v
        })
      ),

      Line: ['直达线', '1号线', '2号线', '3号线','5号线','6号线','7号线','8号线','9号线','10号线'].map(
        (v) => ({
          label: v,
          value: v
        })
      ),

      Departure: ['朝晖校区', '屏峰校区', '莫干山校区', '翰墨香林苑','东新园'].map(
        (v) => ({
          label: v,
          value: v
        })
      ),

      Destination: ['朝晖校区', '屏峰校区', '莫干山校区', '翰墨香林苑','东新园'].map(
        (v) => ({
          label: v,
          value: v
        })
      ),

      options: genOptions(),

      // 注意，下面的部分为确认按钮部分
      handlePositiveClick () {
        message.info('确认')
      },
      handleNegativeClick () {
        message.info('取消')
      }
      // 注意，上面的部分为确认按钮部分
    }
  }
})

function createStatus (value: string) {
  switch (value) {
    case '10:30':
      return undefined
    case '10:29':
      return 'warning'
    default:
      return 'error'
  }
}

function createFeedback (value: string) {
//   示例：
//   switch (value) {
//     case '10:30':
//       return '十点半的飞机已经到了'
//     case '10:29':
//       return '虽然差不多了，请把时间调到 10:30'
//     default:
//       return '请把时间调到 10:30'
//   }
}

function createTimeForNumber (num: number) {
  return `${parseInt(String(num / 100), 10)}:${num % 100}`
}

</script>

<template>
<n-space>
  <n-layout>
   <h1 id="SchoolBus" align="center">校车时间编辑</h1>
   <n-form
      ref="formRef"
      :model="model"
      label-placement="left"
      :label-width="160"
      :style="{
        maxWidth: '640px'
      }"
    >

      <n-form-item label="校车ID" path="selectId"
      >
        <n-select
          v-model:value="model.selectId"
          placeholder="请选择校车ID"
          :options="Id"
        />
      </n-form-item>

      <n-form-item label="路线" path="selectLine"
      >
        <n-select
          v-model:value="model.selectLine"
          placeholder="请选择校车路线"
          :options="Line"
        />
      </n-form-item>

      <n-form-item label="出发地点" path="selectDeparture"
      >
        <n-select
          v-model:value="model.selectDeparture"
          placeholder="请选择校车出发地点"
          :options="Departure"
        />
      </n-form-item>

      <n-form-item label="目的地" path="selectDestination"
      >
        <n-select
          v-model:value="model.selectDestination"
          placeholder="请选择校车目的地"
          :options="Destination"
        />
      </n-form-item>

      <n-form-item label="出发时间" path="timePickerValue"
      >
        <n-time-picker v-model:value="model.timePickerValue" />
      </n-form-item>
   </n-form>

   <!-- //数据取得：feedback -->

   <!-- <n-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  >
    <template #trigger>
      <n-button type="primary">修改</n-button>
    </template>
    确认修改？
  </n-popconfirm> -->
    
    <router-link tag="li" to="/SchoolBus" name="SchoolBus">
    <n-button type="tertiary">
      返回
    </n-button>
    </router-link>

  <n-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  >
    <template #trigger>
    <router-link tag="li" to="/SchoolBus" name="SchoolBus">
    <n-button type="info">
      保存
    </n-button>
    </router-link>
     </template>
     确认修改？
  </n-popconfirm>


  </n-layout>
</n-space>
</template>

<style scoped>
.n-layout{
height:100%;
width: auto;
top: 80px;
position: absolute;
left: 12%;
right: 0px;
background-color: white;
}

</style>