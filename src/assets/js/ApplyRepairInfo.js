import request from "@/utils/index.ts";

import {ElMessage} from "element-plus";

export default {
    name: "ApplyRepairInfo",
    components: {},
    data() {
        return {
            loading: true,
            dialogVisible: false,
            evaluateVisible: false,
            detailDialog: false,
            search: "",
            currentPage: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            detail: {},
            evaluate: {},
            sName: '',
            sId: '',
            form: {
                id: "",
                sName: "",
                finish: 0
            },
            room: {
                dormRoomId: '',
                dormBuildId: '',
            },
            rules: {
                title: [{required: true, message: "请输入标题", trigger: "blur"}],
                content: [{required: true, message: "请输入内容", trigger: "blur"}],
                orderBuildTime: [{required: true, message: "请选择时间", trigger: "blur"},],
            },
        };
    },
    created() {
        this.init()
        //this.getInfo()
        this.load()
        this.loading = true
        setTimeout(() => {
            //设置延迟执行
            this.loading = false
        }, 1000);
    },
    methods: {
        init() {
            this.form = JSON.parse(sessionStorage.getItem("user"));
            this.sName = this.form.name;
            this.sId = this.form.id;
            this.room.dormRoomId = this.form.dormRoomId
            this.room.dormBuildId = this.form.dormBuildId
        },
        async load() {
            request.get("/repair/find/" + this.sId, {
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
        getInfo() {
            request.get("/room/getMyRoom/" + this.sId).then((res) => {
                if (res.data.code === 200) {
                    this.room = res.data.data;
                } else {
                    ElMessage({
                        message: res.data.msg,
                        type: "error",
                    });
                }
            });
        },
        filterTag(value, row) {
            return row.state === value;
        },
        showDetail(row) {
            this.detailDialog = true;
            this.$nextTick(() => {
                console.log(row)
                this.detail = row;
            });
        },
        showEvaluate(row) {
            this.evaluateVisible = true;
            this.$nextTick(() => {
                this.evaluate = row;
            });
        },
        closeDetails() {
            this.detailDialog = false;
        },
        add() {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                this.form.repairer = this.sName
                this.form.dormBuildId = this.room.dormBuildId
                this.form.dormRoomId = this.room.dormRoomId
            });
        },
        save() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    //新增
                    await request.post("/repair/add", this.form).then((res) => {
                        if (res.data.code === 200) {
                            ElMessage({
                                message: "新增成功",
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
            })
        },
        update() {
            console.log(this.evaluate)
            request.put('/repair/update', this.evaluate).then(res => {
                if (res.data.code === 200) {
                    ElMessage({
                        message: "评价成功",
                        type: "success",
                    });
                    this.load();
                    this.evaluateVisible = false
                } else {
                    ElMessage({
                        message: res.data.message,
                        type: "error",
                    });
                }
            })
        },
        cancel() {
            this.$refs.form.resetFields();
            this.dialogVisible = false
            this.evaluateVisible = false
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
