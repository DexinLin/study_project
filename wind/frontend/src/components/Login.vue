<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>行动代号：wind</span>
            </div>
            <el-form :model="form"
                ref="form" label-width="100px" class="demo-ruleForm" :rules="rules" @submit.native.prevent="login('form')">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import { nameRule, passRule } from "../utils/validate";
    import { login } from "../api/login";
    import { setToken } from "../utils/token";

    export default {
        data () {
            return {
                form: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [{ validator: nameRule, trigger: 'blur' }],
                    password: [{ validator: passRule, trigger: 'blur' }],
                }
            }
        },
        methods: {
            login(form) {
                this.$refs[form].validate((valid) =>
                {
                    if (valid)
                    {
                        console.log("验证通过", this.form);// admin 123456
                        login(this.form).then((res) =>
                        {
                            console.log('res >>>>', res);
                            const { username } = res.data;
                            setToken("username", username);
                            this.$message({message: "验证通过", type: "success"})
                            this.$router.push('/home');
                        }).
                        catch(err =>
                        {
                            const { errInfo } = err.response.data;
                            this.$message({message: errInfo, type: "error"})
                        })
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
    background: url('../assets/login.jpg') center no-repeat;
    .el-card {
        background: #65768557;
    }
    .box-card {
        width: 450px;
        margin: 200px auto;
        color: #fff;
        .el-card__header {
            font-size: 34px;
        }
        .el-button {
            width: 100%;
        }
    }
    .el-form .el-form-item__label {
        color: #fff;
    }
}
</style>