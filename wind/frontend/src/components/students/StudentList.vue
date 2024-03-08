<template>
    <div class="studentList">
        <div class="header">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                <el-form-item label="姓名">
                    <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="studentList" border style="width: 100%">
            <el-table-column prop="number" label="学号" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="age" label="年龄" align="center"></el-table-column>
            <el-table-column prop="sex_caption" label="性别" align="center"></el-table-column>
            <el-table-column prop="class" label="班级" align="center"></el-table-column>
            <el-table-column prop="state_caption" label="状态" align="center"></el-table-column>
            <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="address" label="地址" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope"><!--  slot-scope="scope" 可以让点击事件获取到 row 数据 -->
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>

<script>
import { getStudents, delStudent } from "../../api/login";

export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 5,
            pageSizes: [5, 10],
            total: 0,
            formInline: {
                user: '',
            },
            text: '测试'
        }
    },
    created() {
        this.getData('');
    },
    mounted() {
        this.text = '面试题';
    },
    updated() {
        console.log("触发更新？ ？", this.text);
    },
    computed: {
        studentList() {
            const start = this.pageSize * (this.currentPage - 1);
            const end = start + this.pageSize;
            return this.tableData.slice(start, end);
        }
    },
    methods: {
        getData(params) {
            getStudents(params).then(res => {
                if (res.status == 200) {
                    this.tableData = res.data.students.map(item => {
                        return {
                            ...item,
                            sex_caption: item.sex === 1 ? '男' : '女',
                            state_caption: item.state === "1" ? '入学中' : item.state === "2" ? '待入学' : '休学中',
                        }
                    });
                    this.total = res.data.students.length;
                }
            })
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currentPage = val;
        },
        del(row) {
            const id = row.id;
            delStudent(id).then((res) => {
                if (res.status === 200) {
                    this.$message({ message: '操作成功', type: "success" });
                    this.tableData = this.tableData.filter(item => item.id != id);
                    this.total = this.tableData.length;

                    if (this.studentList.length <= 0)
                        this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : this.currentPage;
                }
            });
        },
        onSubmit() {
            console.log("点击查询", this.formInline.user);
            this.getData({
                name: this.formInline.user
            });
        },
        onReset() {
            console.log('点击重置');
            this.formInline.user = '';
            this.getData();
        }
    }
}
</script>

<style lang="scss">
.studentList {
    .el-pagination {
        text-align: left;
        margin-top: 20px;
    }

    .demo-form-inline {
        text-align: left;
    }
}
</style>