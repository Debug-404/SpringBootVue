<template>
  <div style="width: 60%">
    <el-space :fill="false" wrap>
      <el-card v-for="(item,index) in data" :key="index" class="box-card" style="width: 250px">
        <template #header>
          <div class="card-header">
            <span @click="open(item)">{{ item.title }}</span>
          </div>
        </template>
        <div class="text item">
          {{ item.time }}
        </div>
      </el-card>
    </el-space>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";
import {getNotice} from "@/api/admin";
import {markRaw} from 'vue'
import {ElMessageBox} from 'element-plus'
import {Message} from '@element-plus/icons-vue'

let data = ref([])

onBeforeMount(async () => {
  let res = await getNotice(1)
  data.value = res.data.data
  console.log(res.data.data)
})
const open = (item: any) => {
  ElMessageBox.alert(item.text, item.title, {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '关闭',
    draggable: true,
    type: 'info',
  })
}
</script>
