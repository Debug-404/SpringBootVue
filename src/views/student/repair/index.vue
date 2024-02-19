<template>
  <div style="width: 500px;margin-top: 10px">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        :size="formSize"
        class="demo-ruleForm"
        label-width="120px"
        status-icon
    >
      <el-form-item label="报修人" prop="name">
        <el-input v-model="ruleForm.name"/>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="ruleForm.phone"/>
      </el-form-item>
      <el-form-item label="报修区域" prop="region">
        <el-select-v2
            v-model="ruleForm.region"
            :options="options"
            placeholder="报修区域"
        />
      </el-form-item>
      <el-form-item label="详细地址" prop="roomNo">
        <el-input v-model="ruleForm.roomNo"/>
      </el-form-item>
      <el-form-item label="报修项目" prop="type">
        <el-cascader v-model="ruleForm.type" :options="option" :show-all-levels="false"
                     clearable/>
      </el-form-item>
      <el-form-item label="报修详情" prop="desc">
        <el-input v-model="ruleForm.details" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {ElNotification} from "element-plus";
import {useCounterStore} from "@/stores";
import {repair} from "@/api/student";
import option from '@/assets/data/typeInfo'


const Store = useCounterStore()
const formSize = ref('default')

const ruleFormRef = ref<FormInstance>()
let formData = {
  name: '',
  phone: '',
  region: '',
  roomNo: '',
  type: [''],
  details: '',
}

const ruleForm = reactive(formData)

const rules = reactive({
  name: [
    {required: true, message: '请输入名字', trigger: 'blur'},
    {min: 2, max: 10, message: 'Length should be 2 to 10', trigger: 'blur'},
  ],
  phone: [
    {required: true, message: '请输入联系方式', trigger: 'blur'},
    {min: 11, max: 11, message: '请输入正确的联系方式', trigger: 'blur'}
  ],
  region: [
    {
      required: true, message: 'Please select Activity count', trigger: 'blur'
    }
  ],
  type: [
    {
      required: true, message: '请选择类型', trigger: 'blur',
    }
  ],
  roomNo: [
    {
      required: true, message: '请输入详细地址', trigger: 'blur',
    }
  ],
})


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      repair(Store.userId, formData)
          .then(response => {
            ElNotification({
              title: 'Success',
              message: response.data.message,
              type: 'success',
            })
          })
    } else {
      console.log(ruleForm.type)
      //console.log(new Date(formData.time).toLocaleDateString())
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({length: 10}).map((_, idx) => ({
  value: `${idx + 1}`,
  label: "学生宿舍" + `${idx + 1}` + "栋",
}))
</script>

