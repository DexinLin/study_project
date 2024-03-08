<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>行动代号：wind</span>
            </div>
            <el-form :model="form"
                ref="form" label-width="100px" class="demo-ruleForm" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
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
            const validateName = (rule, value, callback) =>
            {
                let reg = /^[\w-]{4,16}$/;
                if (value ==='')
                    callback('请输入用户名');
                else if (!reg.test(value))
                    callback("请输入4-16位用户名");
                else
                    callback();
            };
            const validatePass = (rule, value, callback) =>
            {
                let reg = /^[\w-]{6,12}$/;
                if (value ==='')
                    callback('请输入密码');
                else if (!reg.test(value))
                    callback("请输入6-12位密码");
                else
                    callback();
            }
            return {
                form: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [{ validator: validateName, trigger: 'blur' }],
                    password: [{ validator: validatePass, trigger: 'blur' }],
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
                        this.$message({message: "验证通过", type: "success"})
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