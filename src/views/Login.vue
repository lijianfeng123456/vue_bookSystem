<template>
  <el-form
    :model="ruleForm2"
    :rules="rules2"
    ref="ruleForm2"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="handleSubmit2"
        :loading="logining"
      >登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script> import { base,requestLogin } from '../api/api';
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "admin",
        checkPass: "123456"
      },
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          //_this.$router.replace('/table');
          this.logining = true;
          //NProgress.start();
          var qs = require("qs");
          var loginParams = {
            mg_user: this.ruleForm2.account,
            mg_pwd: this.ruleForm2.checkPass
          };
          // this.$axios.defaults.headers = {
          //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          // };
          requestLogin(
              qs.stringify(loginParams, { indices: false })
            )
            .then(data => {
            // let data = response.data;
              this.logining = false;
              if (data.code !== 200) {
              this.$message({
                message: data.msg,
                type: "error"
              });
            } else {
              sessionStorage.setItem("user", JSON.stringify(data.obj));
              this.$router.push({ path: "/main" });
               this.$message({
                 message: data.msg,
                 type: "success"
               });              
             
            }
              //方法2：可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量 ：
              console.log(data);
              console.log("-----------------------");
              //console.log(response.data);
            })
            .catch(function(error) {
              console.log(error);
            });
          // requestLogin(loginParams).then(data => {
          //   this.logining = false;
          //   //NProgress.done();
          //   //let { msg, code, obj } = data;
          //   if (data.code !== 200) {
          //     this.$message({
          //       message: data.msg,
          //       type: "error"
          //     });
          //   } else {
          //     this.$message({
          //       message: data.msg,
          //       type: "success"
          //     });
          //     sessionStorage.setItem("user", JSON.stringify(data.obj));
          //     this.$router.push({ path: "/main" });
          //   }
          // });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};

</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>