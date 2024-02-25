import request from "@/utils/index.ts";

import {ElMessage} from "element-plus";

export default {
    name: "ApplyRepairInfo",
    components: {},
    data() {
        return {
            loading: true,
            dialogVisible: false,
            detailDialog: false,
            search: "",
            currentPage: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            detail: {},
            name: '',
            userId: '',
            form: {
                id: "",
                sName: ""
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
            console.log(this.form)
            this.name = this.form.sName;
            this.sId = this.form.id;
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
                this.detail = row;
            });
        },
        closeDetails() {
            this.detailDialog = false;
        },
        add() {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                this.form.repairer = this.name
                this.form.dormBuildId = this.room.dormBuildId
                this.form.dormRoomId = this.room.dormRoomId
            });
        },
        save() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    //新增
                    console.log(this.form)
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
        cancel() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
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
