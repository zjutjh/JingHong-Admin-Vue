<script setup lang="ts">
  import { NDataTable,NButton, useMessage } from 'naive-ui'
  import type { DataTableColumns } from 'naive-ui'
  import { h,onMounted,ref } from 'vue'
  import { useRouter } from 'vue-router';

type Song = {
    id: number
    line: string
    departure: string
    destination: string
    startTime: string
}

const createColumns = ({
  play
}: {
  play: (row: Song) => void
}): DataTableColumns<Song> => {
  return [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: '路线',
      key: 'line'
    },
    {
      title: '出发地',
      key: 'departure'
    },
    {
      title: '目的地',
      key: 'destination'
    },
    {
      title: '出发时间',
      key: 'startTime'
    },
    {
      title: '操作',
      key: 'action',
      render (row) {
        return h(
          NButton,
          {
            strong: true,
            // tertiary: true,
            size: 'small',
            type: 'success',
            onClick: () => onSubmit(),
          },
          { default: () => '修改路线' }
        )
      }
    }
  ]
}

const data: Song[] = [
  { id: 3, line: 'Wonderwall', departure :'屏峰', destination :'朝晖',startTime: '4:18' },
  { id: 5, line: 'Wonder', departure :'屏峰', destination :'莫干山',startTime: '14:28' },
  { id: 2, line: 'wall', departure :'朝晖', destination :'莫干山',startTime: '17:56' }
]

const message = useMessage()

const columns = createColumns({
  play (row: Song) {
  message.info(`Play ${row.startTime}`)
  }
})

const pagination = false as const;

const router = useRouter()
//示例：
//定义要传递的参数
// const name ref('阿凡')
// const demoArray = ref(['A','B','C'])

//提交按钮
//这是query传参，params传参需要添加name
function onSubmit(){
	router.push({
		path:"/SchoolBusChange", //B页面的路径
    name:"SchoolBusChange",
		// query:{
		// 	name:name.value,
		// 	demoArray:JSON.stringify(demoArray.value)//传递对象数组，需要先转成字符串，值传过去在转回来
		// }
	})
}

</script>

<template>
   <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
  />
</template>