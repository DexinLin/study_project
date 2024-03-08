<template>
    <div class="teacherList">
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
            <div class="newBtn">
                <el-button type="primary" @click="onAddNew" size="mini">新增</el-button>
            </div>
        </div>
        <el-table :data="teacherList" border style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="age" label="年龄" align="center"></el-table-column>
            <el-table-column prop="gender_caption" label="性别" align="center"></el-table-column>
            <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="address" label="地址" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope"><!--  slot-scope="scope" 可以让点击事件获取到 row 数据 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="update(scope.row)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="teacherForm" :rules="rules" ref="teacherForm">
                <el-form-item label="姓名" label-width="80px" prop="name">
                    <el-input v-model="teacherForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" label-width="80px" prop="gender">
                    <el-radio-group v-model="teacherForm.gender">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" label-width="80px" prop="age">
                    <el-input v-model="teacherForm.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址" label-width="80px" prop="address">
                    <el-input v-model="teacherForm.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" label-width="80px" prop="phone">
                    <el-input v-model="teacherForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="入职时间" label-width="80px" prop="workTime">
                    <el-date-picker
                        v-model="teacherForm.workTime"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('teacherForm')">取 消</el-button>
                <el-button type="primary" @click="sure(teacherForm)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getTeachers, delTeacher, getLatestTeacher, modifyTeacher, addTeacher } from "../../api/login";

const defaultTeacher = {
    id: '',
    name: '',
    gender: "1",
}

export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 5,
            pageSizes: [5,10],
            total: 0,
            formInline: {
                user: '',
            },
            teacherForm: {
                id: '',
                name: '',
                gender: "1",
                age: null,
                address: '',
                phone: null,
            },
            latestId: 0,
            title: '新增教师信息',
            dialogFormVisible: false,
            status: 'add', // update
            rules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'blur'}],
                age: [{ required: true, message: '请输入年龄', trigger: 'blur'}],
                address: [{ required: true, message: '请输入地址', trigger: 'blur'}],
                phone: [{ required: true, message: '请输入联系方式', trigger: 'blur'}],
            },
            loading: true,
        }
    },
    created() {
        this.getData('');
        this.getLatestStu();
    },
    computed: {
        teacherList() {
            const start = this.pageSize*(this.currentPage-1);
            const end = start + this.pageSize;
            return this.tableData.slice(start, end);
        }
    },
    methods: {
        getLatestStu() {
            getLatestTeacher().then(res =>
            {
                this.latestId = res.data?.id || null;
            })
        },
        getData(params) {
            getTeachers(params).then(res =>
            {
                if (res.status == 200)
                {
                    this.tableData = res.data.teachers.map(item =>
                    {
                        return {
                            ...item,
                            gender_caption: item.gender===1 ? '男' : '女',
                        }
                    });
                    this.total = res.data.teachers.length;
                    this.loading = false;
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
            delTeacher(id).then((res) =>
            {
                if (res.status === 200)
                {
                    this.$message({ message: '操作成功', type: "success" });
                    this.tableData = this.tableData.filter(item => item.id != id);
                    this.total = this.tableData.length;
    
                    if (this.teacherList.length <= 0)
                        this.currentPage = this.currentPage >1 ? this.currentPage -1 : this.currentPage;
                }
            });
        },
        onSubmit() {
            console.log("点击查询", this.formInline.user);
            this.loading = true;
            this.getData({
                name: this.formInline.user
            });
        },
        onReset() {
            console.log('点击重置');
            this.formInline.user = '';
            this.loading = true;
            this.getData();
        },
        onAddNew() {
            this.teacherForm = {
                ...defaultTeacher,
                id: this.latestId+1,
            }
            this.status = 'add';
            this.title = '新增教师信息';
            this.dialogFormVisible = true;
        },
        update(row) {
            this.teacherForm = {
                ...row,
                gender: row.gender+'',
            }

            this.status = 'update';
            this.title = '更新教师信息';
            this.dialogFormVisible = true;
        },
        add(form) {
            addTeacher(form).then(res =>
            {
                if (res.status == 200)
                {
                    this.$message({message: "新增教师数据成功", type: "success"});
                    this.dialogFormVisible = false;
                    this.getData();
                }
            }).
            catch(err =>
            {
                console.log("err >>>>", err);
            })
        },
        modify(form) {
            modifyTeacher(form).then(res =>
            {
                if (res.status == 200)
                {
                    this.$message({message: "修改教师数据成功", type: "success"});
                    this.dialogFormVisible = false;
                    this.getData();
                }
            }).
            catch(err =>
            {
                console.log("err >>>>", err);
            });
        },
        sure(form) {
            console.log("form", form, this.$refs);

            this.$refs['teacherForm'].validate((valid) => {
                if (valid)
                {
                    console.log("valid >>>", valid);
                    if (this.status=='add')
                    {
                        this.add(form);
                    }
                    else
                    {
                        this.modify(form);
                    }

                    this.resetForm('teacherForm');
                }
            });
        },
        resetForm(formName) {
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },
    }
}
</script>

<style lang="scss">
.teacherList {
    .el-pagination {
        text-align: left;
        margin-top: 20px;
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .newBtn {
            padding-top: 1px;
        }
    }
    .demo-form-inline {
        text-align: left;
    }

    .el-form-item__content {
        text-align: left;
    }
    .el-dialog__footer {
        text-align: center;
    }
}
</style>