<template>
  <el-container>
    <!--    侧边功能栏-->
    <el-aside width="200px">
      <Aside/>
    </el-aside>
    <el-container>
      <!--      头部-->
      <el-header style="height: 50px;border-bottom: 1px solid #ccc;">
        <Header/>
      </el-header>
      <el-main style="padding: 0;">
        <!--        内容区域-->
        <RouterView/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Aside from "@/components/Aside.vue"
import Header from "@/components/Header.vue"
import {RouterView} from 'vue-router'
</script>
