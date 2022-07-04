<template>
  <div class="center">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="box-icon">
        <i class="iconfont">&#xe658;</i>
      </div>
      <el-form-item label="用户名" prop="name">
        <el-input type="name" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <p>吃了么点餐系统隶属于格莱科技旗下产品，最终解释权属于本公司。</p>
    <p>还没账号请<router-link to="/regin" class="router">点击注册</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'));
      } else {
        callback()
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'));
      } else {
        if (value.length < 6 || value.length > 12) {
          return callback(new Error('请输入大于6位小于12位的密码'));
        }
        callback()
      }
    };
    return {
      ruleForm: {
        name: '',
        pass: '',
      },
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
      }
    };
  },
  created() {
    console.log(1);
  },
  methods: {
    open2() {
      this.$message({
        message: '登录成功',
        type: 'success',
        center: true
      });
    },
    open4() {
      this.$message({
        message: '登录失败',
        type: 'error',
        center: true
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: 'POST',
            url: '/login',
            data: {
              name: this.ruleForm.name,
              pass: this.ruleForm.pass,
            }
          }).then(res => {
            console.log(res);
            if (res.data.code == 0) {
              //保存tokenid
              localStorage.setItem('tokenid', res.data.tokenid)
              this.open2()
              setTimeout(() => {
                this.$router.push('/')
              }, 3000)
            } else {
              this.open4()
            }
          }).catch(err => {
            console.log(err);
          })
        } else {
          console.log('登录成功');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  width: 400px;
  margin: 0 auto;
  text-align: center;
  .box-icon {
    width: 80px;
    height: 80px;
    background-color: skyblue;
    border-radius: 50%;
    margin: 200px 0 20px 210px;
    i {
      font-size: 70px;
      line-height: 80px;
    }
  }
  p {
    font-size: 12px;
    font-family: "宋体";
    color: #8d8d8d;
    .router {
      color: #8d8d8d;
    }
  }
}
</style>