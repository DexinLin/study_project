<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>行动代号：wind</span>
            </div>
            <el-form :model="form"
                ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username" 
                    :rules="[
                        { required: true, message: '请输入用户名', trigger: 'blur'},
                        { min: 4, max: 10, message: '长度需要在4-10位之间', trigger: 'blur'}
                    ]">
                    <el-input type="text" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password"
                    :rules="[
                        { required: true, message: '请输入用户密码', trigger: 'blur'},
                        { min: 6, max: 12, message: '长度需要在6-12位之间', trigger: 'blur'}
                    ]">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login('form')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    username: '',
                    password: '',
                }
            }
        },
        methods: {
            login(form) {
                this.$refs[form].validate((valid) =>
                {
                    if (valid)
                    {
                        console.log("验证通过", this.form);
                    }
                    else
                    {
                        console.error("验证不通过");
                    }
                })
            }
        }
    }
    
</script>

<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #409Eff;
    .box-card {
        width: 450px;
        margin: 200px auto;
        .el-card__header {
            font-size: 34px;
        }
        .el-button {
            width: 100%;
        }
    }
}
</style>