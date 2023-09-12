<template>
  <div v-for="(Sitem,index) in Data.arr" :key="index">
    <div v-for="(item,index) in Sitem" :key="item">{{ index }}：{{ item }}</div>
  </div>
</template>
<script lang="ts" setup>
import {reactive, onBeforeMount} from 'vue';
import request from "@/utils";

type Student = {
  id: string,
  name: string,
  phone?: string,
  roomNo?: string
}

let Data = reactive({
  arr: Array<Student>
})

onBeforeMount(async () => {
  let data = await request.get("/get")
  Data.arr = data.data.map((val: Student) => {
    return {
      id: val["id"],
      name: val["name"],
      phone: val["phone"],
      roomNo: val["roomNo"]
    }
  })
})

</script>
<style scoped>

</style>