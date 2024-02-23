<template>
  <div class="login-container">
    <div style="width: 400px; margin: 150px auto">
      <div style="color: black; font-size: 30px; text-align: left; padding: 30px 0">登陆</div>
      <el-form ref="ruleFormRef" :model="form" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input v-model="form.userId" clearable prefix-icon="avatar"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" prefix-icon="lock" show-password></el-input>
        </el-form-item>
        <el-form-item :model="form" prop="identity">
          <el-radio v-model="form.identity" label="stu" style="color: grey">学生</el-radio>
          <el-radio v-model="form.identity" label="dormManager" style="color: grey">宿舍管理员</el-radio>
          <el-radio v-model="form.identity" label="admin" style="color: grey">后勤管理中心</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!disabled" style="width: 20%" type="primary" @click="login(ruleFormRef)">登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, reactive, ref} from "vue";
import request from "@/utils/index";

import {ElMessage, type FormInstance} from "element-plus";
import {useRouter} from "vue-router";
import {useCounterStore} from "@/stores";

const router = useRouter()
const Store = useCounterStore()
const ruleFormRef = ref<FormInstance>()
const identity = ref("")

const form = reactive({
  userId: "",
  password: "",
  identity: "",
})

const rules = reactive({
  userId: [
    {required: true, message: "请输入用户名", trigger: "blur"},
  ],
  password: [{required: true, message: "请输入密码", trigger: "blur"}],
  identity: [{required: true, message: "请选择身份", trigger: "blur"}],
})

let disabled = computed(() => {
  const {userId, password, identity} = form;
  return Boolean(userId && password && identity);
})

const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: boolean) => {
    if (valid) {
      identity.value = form.identity;
      request.post("/" + identity.value + "/login", form).then((res) => {
        if (res.data.code === 200) {
          ElMessage({
            message: "登陆成功",
            type: "success",
          });
          // 登陆成功跳转主页
          //window.sessionStorage.setItem("user", JSON.stringify(res.data));
          //window.sessionStorage.setItem("identity", JSON.stringify(form.identity));
          router.replace({path: "/home"});
        } else {
          ElMessage({
            message: res.data.message,
            type: "error",
          });
        }
      });
    }
  });
}

</script>
<style scoped>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
      135deg,
      hsl(170deg, 80%, 70%),
      hsl(190deg, 80%, 70%),
      hsl(250deg, 80%, 70%),
      hsl(320deg, 80%, 70%),
      hsl(320deg, 80%, 70%),
      hsl(250deg, 80%, 70%),
      hsl(190deg, 80%, 70%),
      hsl(190deg, 80%, 70%),
      hsl(170deg, 80%, 70%)
  );
  background-size: 600%;
  animation: myanimation 15s linear infinite;
}

@keyframes myanimation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}

.footer {
  left: 0;
  bottom: 0;
  color: #fff;
  width: 100%;
  position: absolute;
  text-align: center;
  line-height: 30px;
  padding-bottom: 10px;
  text-shadow: #000 0.1em 0.1em 0.1em;
  font-size: 14px;
}

.footer a,
.footer span {
  color: #fff;
}
</style>
