<template>
  <div>
    <el-breadcrumb separator-icon="ArrowRight" style="margin: 16px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin: 15px; min-height: calc(100vh - 111px)">
      <div>
        <!--    功能区-->
        <div style="margin: 10px 0">
          <!--    搜索区-->
          <div style="margin: 10px 0">
            <el-input v-model="search" clearable placeholder="请输入姓名" prefix-icon="Search"
                      style="width: 20%"/>
            <el-button icon="Search" style="margin-left: 5px" type="primary" @click="load"></el-button>
            <el-button icon="refresh-left" style="margin-left: 10px" @click="reset"></el-button>
            <div style="float: right">
              <el-tooltip content="添加" placement="top">
                <el-button icon="plus" style="width: 50px" type="primary" @click="add"></el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
        <!--    表格-->
        <el-table v-loading="loading" :data="tableData" border max-height="705" style="width: 100%">
          <el-table-column label="#" type="index"/>
          <el-table-column label="学号" prop="username" sortable/>
          <el-table-column label="姓名" prop="name"/>
          <el-table-column
              :filter-method="filterTag"
              :filters="[
              { text: '男', value: '男' },
              { text: '女', value: '女' },
            ]"
              filter-placement="bottom-end"
              label="性别"
              prop="gender"
          />
          <el-table-column label="年龄" prop="age" sortable/>
          <el-table-column label="手机号" prop="phoneNum"/>
          <el-table-column :show-overflow-tooltip="true" label="邮箱" prop="email"/>
          <!--      操作栏-->
          <el-table-column label="操作" width="130px">
            <template #default="scope">
              <el-button icon="Edit" type="primary" @click="handleEdit(scope.row)"></el-button>
              <el-popconfirm title="确认删除？" @confirm="handleDelete(scope.row.username)">
                <template #reference>
                  <el-button icon="Delete" type="danger"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div style="margin: 10px 0">
          <el-pagination
              v-model:currentPage="page.currentPage"
              :page-size="page.pageSize"
              :page-sizes="[10, 20]"
              :total="page.total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
        <div>
          <!--      弹窗-->
          <el-dialog v-model="dialogData.dialogVisible" title="操作" width="30%" @close="cancel">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
              <el-form-item label="学号" prop="username">
                <el-input v-model="form.username" :disabled="dialogData.judgeAddOrEdit" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" :disabled="dialogData.disabled"
                          :show-password="dialogData.showpassword"
                          style="width: 80%"></el-input>
                <el-tooltip content="修改密码" placement="right">
                  <el-icon :style="editDisplay" size="large" style="margin-left: 5px; cursor: pointer"
                           @click="EditPass">
                    <edit/>
                  </el-icon>
                </el-tooltip>
              </el-form-item>
              <el-form-item :style="display" label="确认密码" prop="checkPass">
                <el-input v-model="form.checkPass" :show-password="dialogData.showPassword" style="width: 80%"
                ></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model.number="form.age" style="width: 80%"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-radio v-model="form.gender" label="男">男</el-radio>
                <el-radio v-model="form.gender" label="女">女</el-radio>
              </el-form-item>
              <el-form-item label="手机号" prop="phoneNum">
                <el-input v-model.number="form.phoneNum" style="width: 80%"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱地址" prop="email">
                <el-input v-model="form.email" style="width: 80%"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script src="@/assets/js/StuInfo.js"></script>
<script setup>
import {ElMessage} from "element-plus";
import {reactive, ref} from "vue";
import request from "@/utils";
//搜索栏
let search = ref("")
const load = () => {
  /**
   *111
   * */
  request.get("/stu/find", {
    params: {
      pageNum: this.currentPage,
      pageSize: this.pageSize,
      search: this.search,
    },
  }).then((res) => {
    console.log(res);
    tableData = res.data.data.records;
    this.total = res.data.data.total;
    this.loading = false;
  });
}
const reset = () => {
  this.search = ''
  request.get("/stu/find", {
    params: {
      pageNum: 1,
      pageSize: this.pageSize,
      search: this.search,
    },
  }).then((res) => {
    console.log(res);
    this.tableData = res.data.records;
    this.total = res.data.total;
    this.loading = false;
  });
}
const add = () => {
  this.dialogVisible = true;
  this.$nextTick(() => {
    this.$refs.form.resetFields();
    this.judgeAddOrEdit = false;
    this.editDisplay = {display: "none"};
    this.disabled = false;
    this.form = {};
    this.judge = false;
  });
}
let page = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})
let tableData = reactive([{}])
let loading = ref(true)
let form = reactive({
  userId: "",
  name: "",
  age: "",
  gender: "",
  phoneNum: "",
  email: "",
})
let dialogData = reactive({
  dialogVisible: false,
  judgeAddOrEdit: true,
  disabled: false,
  judge: false,
})
let editDisplay = reactive({
  display: "block",
})
let display = reactive({
  display: "none",
})
const checkPhone = (rule, value, callback) => {
  const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
  if (!value) {
    return callback(new Error("电话号码不能为空"));
  }
  setTimeout(() => {
    if (!Number.isInteger(+value)) {
      callback(new Error("请输入数字值"));
    } else {
      if (phoneReg.test(value)) {
        callback();
      } else {
        callback(new Error("电话号码格式不正确"));
      }
    }
  }, 100);
}
const checkPass = (rule, value, callback) => {
  if (!this.editJudge) {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== this.form.password) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  } else {
    callback();
  }
};
const rules = reactive({
  userId: [
    {required: true, message: "请输入学号", trigger: "blur"},
    {
      pattern: /^[a-zA-Z0-9]{4,9}$/,
      message: "必须由 2 到 5 个字母或数字组成",
      trigger: "blur",
    },
  ],
  name: [
    {required: true, message: "请输入姓名", trigger: "blur"},
    {
      pattern: /^(?:[\u4E00-\u9FA5·]{2,10})$/,
      message: "必须由 2 到 10 个汉字组成",
      trigger: "blur",
    },
  ],
  age: [
    {required: true, message: "请输入年龄", trigger: "blur"},
    {type: "number", message: "年龄必须为数字值", trigger: "blur"},
    {
      pattern: /^(1|[1-9]\d?|100)$/,
      message: "范围：1-100",
      trigger: "blur",
    },
  ],
  gender: [{required: true, message: "请选择性别", trigger: "change"}],
  phoneNum: [{required: true, validator: checkPhone, trigger: "blur"}],
  email: [
    {type: "email", message: "请输入正确的邮箱地址", trigger: "blur"},
  ],
  password: [
    {required: true, message: "请输入密码", trigger: "blur"},
    {
      min: 6,
      max: 32,
      message: "长度在 6 到 16 个字符",
      trigger: "blur",
    },
  ],
  checkPass: [{validator: checkPass, trigger: "blur"}],
})
const handleEdit = (row) => {
  //修改
  //判断操作类型
  this.judge = true;
  // 生拷贝
  this.dialogVisible = true;
  this.$nextTick(() => {
    this.$refs.form.resetFields();
    this.form = JSON.parse(JSON.stringify(row));
    this.judgeAddOrEdit = true;
    this.editDisplay = {display: "block"};
    this.disabled = true;
  });
}
const handleDelete = (username) => {
  //删除
  console.log(username);
  request.delete("/stu/delete/" + username).then((res) => {
    if (res.code === "0") {
      ElMessage({
        message: "删除成功",
        type: "success",
      });
      this.search = "";
      this.load();
    } else {
      ElMessage({
        message: res.msg,
        type: "error",
      });
    }
  });
}
const handleSizeChange = (pageSize) => {
  //改变每页个数
  page.pageSize = pageSize;
  this.load();
}
const handleCurrentChange = (pageNum) => {
  //改变页码
  page.currentPage = pageNum;
  this.load();
}


const filterTag = (value, row) => {
  return row.gender === value;
}

const save = () => {
  this.$refs.form.validate((valid) => {
    if (valid) {
      if (this.judge === false) {
        //新增
        request.post("/stu/add", this.form).then((res) => {
          console.log(res);
          if (res.code === "0") {
            ElMessage({
              message: "新增成功",
              type: "success",
            });
            this.search = "";
            this.loading = true;
            this.load();
            this.dialogVisible = false;
          } else {
            ElMessage({
              message: res.msg,
              type: "error",
            });
          }
        });
      } else {
        //修改
        request.put("/stu/update", this.form).then((res) => {
          console.log(res);
          if (res.code === "0") {
            ElMessage({
              message: "修改成功",
              type: "success",
            });
            this.search = "";
            this.load();
            this.dialogVisible = false;
          } else {
            ElMessage({
              message: res.msg,
              type: "error",
            });
          }
        });
      }
    }
  });
}
const cancel = () => {
  this.$refs.form.resetFields();
  this.display = {display: "none"};
  this.editJudge = true;
  this.disabled = true;
  this.showpassword = true;
  this.dialogVisible = false;
}
const EditPass = () => {
  if (this.editJudge) {
    this.showpassword = false;
    this.display = {display: "flex"};
    this.disabled = false;
    this.editJudge = false;
  } else {
    this.showpassword = true;
    this.display = {display: "none"};
    this.editJudge = true;
    this.disabled = true;
  }
}
</script>
