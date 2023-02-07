<script setup lang="ts">
  import { ref,onMounted } from "vue";
  import { NSpace,NLayout,NInput,NButton,NTable,NDatePicker } from 'naive-ui'
  import { TrashBinOutline } from '@vicons/ionicons5'
  import createAPI from "../apis/AnnouncementAPI/AnnoucementCreate";
  import updateAPI from "../apis/AnnouncementAPI/AnnoucementUpdate";
  import deleteAPI from "../apis/AnnouncementAPI/AnnoucementDelete";
  import getAPI from "../apis/AnnouncementAPI/AnnoucementGet";

  const Announcement1 ={title:'通知1',content:'...',publishTime:'2007.06.30 12:08:55',id:1}
  const Announcement2 ={title:'通知2',content:'...',publishTime:'2007.06.30 12:08:55',id:2}
  const Announcement3 ={title:'通知3',content:'...',publishTime:'2007.06.30 12:08:55',id:3}
  const AnnouncementsTest =[Announcement1,Announcement2,Announcement3]; //通知的测试数据(历史测数据用)
  
  const formattedValue = ref("2007.06.30 12:08:55");//新通知的上传时间
  const newContent = ref("");//新通知的内容
  const newTitle = ref("");//新通知的标题
  const selectedContent = ref("");//选中通知的内容
  const selectedTitle = ref("");//选中通知的标题
  const selectedId = ref();//选中通知的id
  
  const onClickSelect = (id:number,title:string,content:string )=>{
    selectedContent.value = content;
    selectedTitle.value = title;
    selectedId.value = id;
  }
  
  let Announcements = <any>ref([]);

  const getAnnouncements = async () =>{
    const res = await getAPI();
    console.log(res);
    console.log("获取通知数据成功"); 
    return res.data;
  }


  const onClickSend = async() =>{
    const res = await createAPI({
     content:newContent.value,
     title:newTitle.value,
     }); 
    console.log(res);
    const list = await getAnnouncements();
    Announcements.value = list.data;
   } 

  const onClickUpdate = async()=>{
    const res = await updateAPI({
     content:selectedContent.value,
     title:selectedTitle.value,
     id:selectedId.value
    });
    console.log(res);
    const list = await getAnnouncements();
    Announcements.value = list.data;
  }

  
  const onClickDelete = async(id:number) =>{
    const res = await deleteAPI({
     id:id
     });
    console.log(res);
    const list = await getAnnouncements();
    Announcements.value = list.data;
   } 

  const onClickClear = () =>{
    newContent.value="";
    newTitle.value="";
   }
 
 onMounted(
  async ()=>{
  const res = await getAnnouncements();
  Announcements.value = res.data;
})

</script>

<template>
<n-space >
  <n-layout id="layout1">  
          
    <n-space space-around>  
       <n-space  vertical>
       <h2>新建通知与发送</h2>   
       <n-input placeholder="编辑通知标题"  v-model:value="newTitle"></n-input>
       <n-input placeholder="编辑通知内容" class="Content" 
       type="textarea" clearable v-model:value="newContent">
         <template #clear-icon>
           <n-icon :component="TrashBinOutline" />
         </template>
       </n-input>
        <n-date-picker
        v-model:formatted-value="formattedValue"
        value-format="yyyy.MM.dd HH:mm:ss"
        placeholder="获取当前时间"
        type="datetime" clearable />
       <n-space>  
         <n-button id="Send" @click="onClickSend">发送</n-button>
         <n-button id="Clear" @click="onClickClear">清空</n-button>
       </n-space>
      </n-space>

    <n-space vertical>    
     <h2>通知栏</h2>
      <n-table>
          <thead>
            <tr>
            <th>标题</th>
            <th>内容</th>
            <th>上传的时间</th>
            <th></th>
            <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="Announcement in Announcements">
              <td>{{ Announcement.title }}</td>
              <td>{{ Announcement.content }}</td>
              <td>{{ Announcement.publishTime }}</td>
              <td><n-button size="small" @click="()=> onClickSelect(Announcement.id, Announcement.title, Announcement.content)">编辑</n-button></td>
              <td><n-button size="small" @click="()=> onClickDelete(Announcement.id)">删除</n-button></td>
            </tr>
          </tbody>
      </n-table>
    </n-space>

     <n-space vertical> 
       <h2>编辑通知与发送</h2>
       <n-space> 
         <n-input disabled placeholder="正在编辑的内容↓" id="h2"></n-input>
       </n-space>
         <n-input placeholder="编辑通知标题"  v-model:value="selectedTitle"></n-input>
         <n-input placeholder="编辑通知内容" class="Content" 
         type="textarea" clearable v-model:value="selectedContent">
            <template #clear-icon>
             <n-icon :component="TrashBinOutline" />
           </template>
         </n-input>
      <n-button @click="()=> onClickUpdate()">提交</n-button>
      </n-space>
    </n-space>   
  </n-layout>
</n-space>
</template>

<style scoped>
#layout1{
height:100%;
width: auto;
top: 80px;
position: absolute;
left: 12%;
right: 0px;
background-color: white;
}

.Content{
width: 500px;
position:relative;
}

#h2{
  width: 130px;
}

</style>