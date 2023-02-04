<template>
    <div>
      <div class="msg">
        <el-card class="box-card">
          <div slot="header">
            <span>医院系统</span>
          </div>
          <div>
            <el-form :model="form">
              <el-form-item>
                <el-input size="medium" v-model="form.patientPhone" placeholder="请输入电话"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input size="medium" type="password" v-model="form.patientPassword" placeholder="请输入密码"></el-input>
              </el-form-item>
			  <el-form-item>
				    <el-radio v-model="classification" label="1">患者</el-radio>
					<el-radio v-model="classification" label="2">医务人员</el-radio>
			  </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submsg()" size="medium" class="w-100">登录</el-button>
              </el-form-item>
            </el-form>
            <div class="tip">
              <el-link type="primary" href="/register">新患者注册</el-link>
              <span> | </span>
              <el-link type="primary">忘记密码</el-link>
            </div>
          </div>
        </el-card>
      </div>
    </div>
</template>

<script>
	import{loginPatient} from '@/api/index.js';
	import{loginDoctor} from '@/api/index.js';
  export default {
    name: 'login',
    data() {
      return {
        form: {
          patientPhone: '',
          patientPassword:'',
        },
		docform: {
		  docPhone: '',
		  docPassword:'',
		},
		classification: '',
		patientInfo:{},
		docInfo:{}
      };
    },
    methods:{
      submsg(){
        if (this.form.patientPhone == '') {
          alert("请输入用户名");
        } else if (this.form.patientPassword == '') {
          alert("请输入密码");
        }else if(this.classification == ''){
			alert("请选择身份");
		}else{
			if(this.classification=='1'){
				this.instance.loginPatient(this.form).then((res) => {
					if(res != -1 && res.data.code == 666){
						this.$message({
							type: 'success',
							message: '登录成功!',
							duration:500,
							center:true
						  });
						  this.patientInfo = res.data.datas;
						  //将患者信息存入缓存
						  window.localStorage.setItem('patientId',this.patientInfo.patientId);
						  window.localStorage.setItem('patientName',this.patientInfo.patientName);
						  window.localStorage.setItem('patientAge',this.patientInfo.patientAge);
						  window.localStorage.setItem('patientGender',this.patientInfo.patientGender);
						  window.localStorage.setItem('patientIdentify',this.patientInfo.patientIdentify);
						  window.localStorage.setItem('patientPhone',this.patientInfo.patientPhone);
						  window.localStorage.setItem('patientAddr',this.patientInfo.patientAddr);
						  window.localStorage.setItem('patientPassword',this.patientInfo.patientPassword);
						  window.localStorage.setItem('user_identity',4);
						  this.$router.push("/app/patient_mng/patient_reg");
					}
					else if(res.data.code == 700){
						this.$message({
							type: 'error',
							message: res.data.message
						  });
					}
				})
			}
			else{
				//调用医生登录接口
				this.docform.docPhone=this.form.patientPhone;
				this.docform.docPassword=this.form.patientPassword;
				console.log("我是医生");
				this.instance.loginDoctor(
				  this.docform
				).then(res => {
					if(res != -1 && res.data.code == 666){
							this.$message({
								type: 'success',
								message: '登录成功!',
								duration:500,
								center:true
							  });
							  this.docInfo = res.data.datas;
							  //将医生信息存入缓存
							  window.localStorage.setItem('docId',this.docInfo.docId);
							  window.localStorage.setItem('docName',this.docInfo.docName);
							  window.localStorage.setItem('officeId',this.docInfo.officeId);
							  window.localStorage.setItem('docPassword',this.docInfo.docPassword);
							  window.localStorage.setItem('docLevel',this.docInfo.docLevel);
							  window.localStorage.setItem('docPhone',this.docInfo.docPhone);
							  window.localStorage.setItem('docGender',this.docInfo.docGender);
							  window.localStorage.setItem('docAge',this.docInfo.docAge);
							  window.localStorage.setItem('docIdentify',this.docInfo.docIdentify);
							  //window.localStorage.setItem('docPrice',this.docInfo.docPrice);
							  //window.localStorage.setItem('maxPatient',this.docInfo.maxPatient);
							  //window.localStorage.setItem('currentPatient',this.docInfo.currentPatient);
							  window.localStorage.setItem('classifcation',this.docInfo.classifcation);
							  window.localStorage.setItem('user_identity',this.docInfo.classifcation);
							  if(this.docInfo.classifcation=='0')
							  {
								  this.$router.push("/app/doctor_mng/doctor_patient");
							  }else if(this.docInfo.classifcation=='1')
							  {
								  this.$router.push("/app/medical_mng/medical_list");
							  }
							  else if(this.docInfo.classifcation=='2'){
								  this.$router.push("/app/reception_mng/reception_register");
							  }
							  else{
								  this.$router.push("/app/check_mng/check_list");
							  }
							  
						}
						else if(res.data.code == 700){
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
  }
</script>

<style scoped>
.msg{
  width:500px;
  text-align: center;
  position:absolute;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
}
  .tip{
    margin-right:0;
    margin-left:300px;
  }
</style>
