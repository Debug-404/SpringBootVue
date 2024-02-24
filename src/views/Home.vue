<template>
  <el-card style="margin: 15px; min-height: calc(100vh - 80px)">
    <!--    头部数据-->
    <div>
      <el-row :gutter="20" class="topInfo">
        <el-col :span="6">
          <div id="stuNumDiv" class="el-colDiv">
            <div id="ssv1-main-text" class="nowDiv">实时</div>
            <span class="title">学生统计</span><br/>
            <span class="digital">{{ NumList.studentNum }}</span><br/>
            <span class="last-span">当前分类总记录数</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div id="haveRoomDiv" class="el-colDiv">
            <div id="ssv2-main-text" class="nowDiv">实时</div>
            <span class="title">住宿人数</span><br/>
            <span class="digital">{{ NumList.haveRoomStudentNum }}</span><br/>
            <span class="last-span">当前分类总记录数</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div id="repairNum" class="el-colDiv">
            <div id="ssv3-main-text" class="nowDiv">实时</div>
            <span class="title">报修统计</span><br/>
            <span class="digital">{{ NumList.repairOrderNum }}</span><br/>
            <span class="last-span">当前分类总记录数</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div id="emptyRoom" class="el-colDiv">
            <div id="ssv4-main-text" class="nowDiv">实时</div>
            <span class="title">空宿舍统计</span><br/>
            <span class="digital">{{ NumList.noFullRoomNum }}</span><br/>
            <span class="last-span">当前分类总记录数</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 下部-->
    <div style="display: flex;width: 100%;margin-top: 40px;align-items: center;justify-content: center;">
      <!--   左侧 宿舍通告-->
      <div style="margin-right: 5%">
        <span style="font-size: 22px;display: block;margin-bottom: 30px;margin-left: 10px;">宿舍通告</span>
        <el-timeline>
          <el-timeline-item v-for="(activity, index) in activities.slice(0, 8)" :key="index"
                            :timestamp="activity.releaseTime">
            <span style="font-size: 15px">{{ activity.title }}</span><br/>
            <!--                        <span style="font-size: 10px">{{ activity.content }}</span>-->
          </el-timeline-item>
        </el-timeline>
      </div>
      <!--   中部-->
      <div style="height: 588px">
        <span style="
            font-size: 22px;
            display: block;
            margin-bottom: 30px;
            margin-left: 10px;
          ">宿舍学生人数分布</span>
        <home_echarts/>
      </div>
      <!--  右侧-->
      <div style="margin-left: 5%">
        <!--   天气组件-->
        <weather/>
        <!--    日历组件-->
        <el-card style="width: 380px; max-height: 440px; margin-top: 17px">
          <Calender/>
        </el-card>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import weather from "@/components/weather.vue";
import Calender from "@/components/Calendar.vue";
import home_echarts from "@/components/home_echarts.vue";
import request from "@/utils/index";
import {onBeforeMount, reactive, ref} from "vue";

const activities = ref([])
const NumList = reactive({
  studentNum: "",
  haveRoomStudentNum: "",
  repairOrderNum: "",
  noFullRoomNum: "",
})

const getStuNum = async () => {
  request.get("/stu/stuNum").then((res) => {
    if (res.data.code === 200) {
      NumList.studentNum = res.data.data;
    } else {
      ElMessage({
        message: res.data.message,
        type: "error",
      });
    }
  });
}
const getHaveRoomNum = async () => {
  request.get("/room/selectHaveRoomStuNum").then((res) => {
    if (res.data.code === 200) {
      NumList.haveRoomStudentNum = res.data.data;
    } else {
      ElMessage({
        message: res.data.msg,
        type: "error",
      });
    }
  });
}
const getOrderNum = async () => {
  request.get("/repair/orderNum").then((res) => {
    if (res.data.code === 200) {
      NumList.repairOrderNum = res.data.data;
    } else {
      ElMessage({
        message: res.data.msg,
        type: "error",
      });
    }
  });
}
const getNoFullRoom = async () => {
  request.get("/room/noFullRoom").then((res) => {
    if (res.data.code === 200) {
      NumList.noFullRoomNum = res.data.data;
    } else {
      ElMessage({
        message: res.data.msg,
        type: "error",
      });
    }
  });
}
const getHomePageNotice = async () => {
  request.get("/notice/homePageNotice").then((res) => {
    if (res.data.code === 200) {
      activities.value = res.data.data;
    } else {
      ElMessage({
        message: res.data.msg,
        type: "error",
      });
    }
  });
}

onBeforeMount(async () => {
  await getHomePageNotice();
  await getStuNum();
  await getHaveRoomNum();
  await getOrderNum();
  await getNoFullRoom();
})
</script>
<style scoped>@import '../assets/css/Home.css';</style>
