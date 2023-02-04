<template>
  <div>
    <div class="msg">
      <el-card class="box-card">
        <div slot="header">
          <span>新患者注册</span>
        </div>
        <div>
          <el-form :model="form">
			  <el-form-item>
			    <el-input size="medium" v-model="form.patientName" placeholder="请输入姓名"></el-input>
			  </el-form-item>
			  <div style="margin-top: 8px;margin-bottom: 18px;margin-left: 10px;">
				  请输入性别
				  <el-radio v-model="form.patientGender" label="男" style="margin-left: 50px;">男</el-radio>
				  <el-radio v-model="form.patientGender" label="女">女</el-radio>
			  </div>
			  <el-form-item>
			    <el-input size="medium" v-model="form.patientAge" placeholder="请输入年龄"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-input size="medium" v-model="form.patientIdentify" placeholder="请设置身份证号"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-input size="medium" v-model="form.patientPhone" placeholder="请输入手机号码"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-input size="medium" v-model="form.patientAddr" placeholder="请输入您的地址"></el-input>
			  </el-form-item>
			
            <el-form-item>
              <el-input size="medium" type="password" v-model="form.patientPassword" placeholder="请设置登录密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input size="medium" type="password" v-model="form.patientrepwd" placeholder="请再次输入登录密码"></el-input>
            </el-form-item>
            <el-form-item>
				<div style="text-align: center;">
					<el-button type="primary" @click="submsg()" size="medium" class="w-100">同意并注册</el-button>
				</div>  
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked"></el-checkbox>
               <el-link type="primary">同意条款和隐私权政策</el-link>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
	import { register } from '@/api/index.js';
  export default {
    name: 'register',
    data() {
      return {
        form: {
          patientName: '',
		  patientAge:'',
		  patientGender: '',
		  patientIdentify: '',
		  patientPhone: '',
		  patientAddr:'',
          patientPassword: '',
          patientrepwd: '',
          
        },
        checked: false
      };
    },
    methods: {
      submsg() {
        if (this.form.patientName == '') {
          alert("请输入姓名")
        }else if(this.form.patientGender==''){
			alert("请选择性别")
		} else if(this.form.patientAge==''){
			alert("请输入年龄")
		} else if(this.form.patientIdentify==''){
			alert("请输入身份证号")
		}else if (this.form.patientPhone == '') {
          alert("请输入电话号码")
        }else if(this.form.patientAddr==''){
			alert("请输入住址")
		}else if (this.form.patientPassword == '') {
          alert("请输入密码")
        } else if (this.form.patientPassword != this.form.patientrepwd) {
          alert("两次输入密码不一样")
        } else if(!this.checked){
          alert("请勾选同意条款和隐私权政策")
        }else {
			this.instance.register(this.form).then((res) => {
					if(res != -1 &&  res.data.code == 666){
						console.log(res);
						this.$message({
							type: 'success',
							message: '注册成功!'
						  });
						
						this.$router.push({ name:'login'})
					}
					else if(res.data.code == 701)	
					{
						console.log(res)
						this.$message({
							type: 'error',
							message: res.data.message
						  });
					}
					
				})
        }
      }
    }
  }
</script>

<style scoped>
  .msg {
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .tip {
    margin-right: 0;
    margin-left: 300px;
  }
</style>