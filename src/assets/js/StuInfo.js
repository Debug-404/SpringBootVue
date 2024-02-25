import request from "@/utils/index";
import { ElMessage } from "element-plus"


export default {
    name: "StuInfo",
    data() {
        // 手机号验证
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
        };
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
        const chekId = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("学号不能为空"));
            }
            if (!this.judge)
                setTimeout(() => {
                    request.get("stu/getStudent/" + value,).then(res => {
                        if (res.data.code !== 200) callback()
                        else callback(new Error("学号已经存在"))
                    })
                }, 100)
            else callback()
        };
        return {
            showpassword: true,
            judgeAddOrEdit: true,
            loading: true,
            editJudge: true,
            disabled: false,
            //判断是添加or修改 false是添加
            judge: false,
            dialogVisible: false,
            //模糊搜索的关键字
            search: "",
            //页数
            currentPage: 1,
            //每页展示多少条数
            pageSize: 10,
            //表格数据量
            total: 0,
            //表格数据
            tableData: [],
            form: {
                id: "",
                name: "",
                age: "",
                sex: "",
                phone: "",
                email: "",
            },
            rules: {
                id: [
                    { required: true, message: "请输入学号", trigger: "blur" },
                    {
                        pattern: /^[a-zA-Z0-9]{10}$/,
                        message: "必须由 10 数字组成",
                        trigger: "blur",
                    },
                    { validator: chekId, trigger: "blur" }
                ],
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                    {
                        pattern: /^(?:[\u4E00-\u9FA5·]{2,10})$/,
                        message: "必须由 2 到 10 个汉字组成",
                        trigger: "blur",
                    },
                ],
                age: [
                    { required: true, message: "请输入年龄", trigger: "blur" },
                    { type: "number", message: "年龄必须为数字值", trigger: "blur" },
                    {
                        pattern: /^(1|[1-9]\d?|100)$/,
                        message: "范围：1-100",
                        trigger: "blur",
                    },
                ],
                sex: [{ required: true, message: "请选择性别", trigger: "change" }],
                phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
                email: [
                    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 32,
                        message: "长度在 6 到 16 个字符",
                        trigger: "blur",
                    },
                ],
                checkPass: [{ validator: checkPass, trigger: "blur" }],
            },
            editDisplay: {
                display: "block",
            },
            display: {
                display: "none",
            },
        };
    },
    created() {
        this.load();
        this.loading = true;
        setTimeout(() => {
            //设置延迟执行
            this.loading = false;
        }, 1000);
    },
    methods: {
        //加载学生信息
        load() {
            request.get("/stu/find", {
                params: {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    search: this.search,
                },
            }).then((res) => {
                this.tableData = res.data.data.list;
                this.total = res.data.data.total;
                this.loading = false;
            });
        },
        reset() {
            this.search = ''
            request.get("/stu/find", {
                params: {
                    pageNum: 1,
                    pageSize: this.pageSize,
                    search: this.search,
                },
            }).then((res) => {
                this.tableData = res.data.data.list;
                this.total = res.data.data.total;
                this.loading = false;
            });
        },
        filterTag(value, row) {
            return row.gender === value;
        },
        //添加学生信息
        add() {
            this.dialogVisible = true;
            this.$nextTick(() => {
                if (this.$refs.form !== undefined) {
                    this.$refs.form.resetFields()
                }
                //this.$refs.form.resetFields();
                this.judgeAddOrEdit = false;
                this.editDisplay = { display: "none" };
                this.disabled = false;
                this.form = {};
                this.judge = false;
            });
        },
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.judge === false) {
                        //新增
                        request.post("/stu/add", this.form).then((res) => {

                            if (res.data.code === 200) {
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
                                    message: res.data.message,
                                    type: "error",
                                });
                            }
                        });
                    } else {
                        //修改
                        request.put("/stu/update", this.form)
                            .then((res) => {
                                if (res.data.code === 200) {
                                    ElMessage({
                                        message: "修改成功",
                                        type: "success",
                                    });
                                    this.search = "";
                                    this.load();
                                    this.dialogVisible = false;
                                } else {
                                    ElMessage({
                                        message: res.data.message,
                                        type: "error",
                                    });
                                }
                            });
                    }
                }
            });
        },
        //关闭弹窗
        cancel() {
            if (this.$refs.form !== undefined) {
                this.$refs.form.resetFields()
            }
            //this.$refs.form.resetFields();
            this.display = { display: "none" };
            this.editJudge = true;
            this.disabled = true;
            this.showpassword = true;
            this.dialogVisible = false;
        },
        //修改密码
        EditPass() {
            if (this.editJudge) {
                this.showpassword = false;
                this.display = { display: "flex" };
                this.disabled = false;
                this.editJudge = false;
            } else {
                this.showpassword = true;
                this.display = { display: "none" };
                this.editJudge = true;
                this.disabled = true;
            }
        },
        handleEdit(row) {
            //修改
            //判断操作类型
            this.judge = true;
            // 生拷贝
            this.dialogVisible = true;
            this.$nextTick(() => {
                if (this.$refs.form !== undefined) {
                    this.$refs.form.resetFields()
                }
                //this.$refs.form.resetFields();
                this.form = JSON.parse(JSON.stringify(row));
                this.judgeAddOrEdit = true;
                this.editDisplay = { display: "block" };
                this.disabled = true;
            });
        },
        //删除学生信息
        async handleDelete(id) {
            //删除
            request.delete("/stu/delete/" + id)
                .then((res) => {
                    if (res.data.code === 200) {
                        ElMessage({
                            message: "删除成功",
                            type: "success",
                        });
                        this.search = "";
                        this.load();
                    } else {
                        ElMessage({
                            message: res.data.msg,
                            type: "error",
                        });
                    }
                });
        },
        handleSizeChange(pageSize) {
            //改变每页个数
            this.pageSize = pageSize;
            this.load();
        },
        handleCurrentChange(pageNum) {
            //改变页码
            this.currentPage = pageNum;
            this.load();
        },
    },
};
