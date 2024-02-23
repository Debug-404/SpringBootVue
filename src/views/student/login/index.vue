<template>
  <el-row :style="{ background: `url(${imgUrl})` }" align="middle" style="height: 100%">
    <el-col :lg="18" :md="12" :xs="24">
      <div class="flex items-center flex-col">
        <div class="font-semibold text-6xl text-yellow-500 mb-4">欢迎使用</div>
        <div class="text-yellow-500">学生信息管理系统</div>
      </div>
    </el-col>
    <el-col :lg="6" :md="12" :xs="24">
      <div class="flex items-center flex-col">
        <h1 class="text-gray-500 text-3xl mb-6">-学号密码登录-</h1>
        <el-form ref="ruleFormRef" :model="formInline" :rules="rules" label-position="left" label-width="70px"
                 style="width: 300px">
          <el-form-item label="账号" prop="user">
            <el-input v-model="formInline.user" :prefix-icon="User" placeholder="user"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formInline.password" :prefix-icon="Lock" placeholder="password" show-password/>
          </el-form-item>
          <el-form-item>
            <el-button class="w-[250px]" round type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "login"
})
</script>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {User, Lock} from "@element-plus/icons-vue"
import {ElNotification} from "element-plus";
import imgUrl from "@/assets/img/01.jpg"
import {useRouter} from "vue-router"
import {useCounterStore} from "@/stores"
import {login} from "@/api/student";
import {setToKen} from "@/utils/tokenUtils";

const router = useRouter()
const Store = useCounterStore()

const rules = {
  user: [
    {required: true, message: "用户名不能为空", trigger: "blur"},
    {min: 10, max: 10, message: "用户名长度是10", trigger: "blur"},
  ],
  password: [
    {required: true, message: "密码不能为空", trigger: "blur"},
    {min: 6, max: 20, message: "密码长度是6-20", trigger: "blur"},
  ],
}

let ruleFormRef = ref()
let formInline = reactive({
  user: "",
  password: "",
})
//登录提交表单并且设置token
const onSubmit = () => {
  ruleFormRef.value.validate((flag: Boolean) => {
    if (flag) {
      login(formInline.user, formInline.password)
          .then(
              (data: any) => {
                if (data.data["code"] === 200) {
                  Store.setUser(formInline.user)
                  setToKen(data.data["token"])
                  router.push({path: "/system"})
                  ElNotification({"title": formInline.user, "message": data.data["message"], "type": "success"})
                } else ElNotification({"title": "Error", "message": data.data["message"], "type": "error"})
              },
          )
    } else ElNotification({"title": "Error", "message": "操作失败", "type": "error"})
  })
}

</script>
<style scoped>
.el-main {
  --el-main-padding: 10px;
}
</style>
