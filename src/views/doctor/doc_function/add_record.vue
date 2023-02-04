<template>
	<el-container>
		<el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 20px;">
		  <el-breadcrumb-item :to="{ name: 'doctor_patient' }">我的病人</el-breadcrumb-item>
		  <el-breadcrumb-item>添加病历</el-breadcrumb-item>
		</el-breadcrumb>
		
	  <el-header 
	  style="
	  text-align: center; 
	  font-size: 48px;
	  color: white; 
	  background-color: #B3C0D1; ">门诊病历</el-header>
	  <el-container>
	      <el-main
	      style="
	      background-color: #E9EEF3;
	      <!-- line-height: 100px; -->
	      "
	      >
		  <el-descriptions title="病人信息" direction="vertical" :column="5" border>
		    <el-descriptions-item label="姓名">{{form.patient_name}}</el-descriptions-item>
			<el-descriptions-item label="性别">{{form.patient_gender}}</el-descriptions-item>
			<el-descriptions-item label="年龄">{{form.patient_age}}</el-descriptions-item>
			<el-descriptions-item label="身份证号">{{form.patient_Identify}}</el-descriptions-item>
		    <el-descriptions-item label="手机号">{{form.patient_phone}}</el-descriptions-item>
			<el-descriptions-item label="就诊医生">{{form.doc_name}}</el-descriptions-item>
			
		    <el-descriptions-item label="就诊类型">
				  <el-input placeholder="初诊/复诊" clearable 
				   v-model="Reg_record.recordType"></el-input>
		    </el-descriptions-item>
			<el-descriptions-item label="药敏史">
				<el-input placeholder="例:青霉素" clearable 
				 v-model="Reg_record.allergy"></el-input>
			</el-descriptions-item>
		    <el-descriptions-item label="家庭地址">{{form.patient_addr}}</el-descriptions-item>
			<el-descriptions-item label="诊断">
				<el-input placeholder="例:伤寒" clearable 
				 v-model="Reg_record.recordResult"></el-input>
			</el-descriptions-item>
			<el-descriptions-item label="发病日期">
				<div class="block">
				     <el-date-picker
				       v-model="Reg_record.illTime"
				       type="datetime"
					   value-format="yyyy-MM-dd HH:mm:ss"
				       placeholder="选择日期时间">
				     </el-date-picker>
				</div>
				
			</el-descriptions-item>
		  </el-descriptions>
		  <el-descriptions title=" " direction="vertical" :column="1" border>
		   
		   </el-descriptions>
		 <el-descriptions title="诊断信息" direction="vertical" :column="1" border>
		 <el-descriptions-item label="现病史">
		 	<el-input
		 	  type="textarea"
		 	  :autosize="{ minRows: 2, maxRows: 6}"
		 	  placeholder="请输入就诊内容"
		 	  style="font-size: 20px;"
		 	  v-model="Reg_record.presentIllness">
		 	</el-input>
		 </el-descriptions-item>
		 
		 </el-descriptions>
		 <el-descriptions title=" " direction="vertical" :column="1" border>
		  
		  </el-descriptions>
		  <el-button  icon="el-icon-document" @click="saveClick1()">保存</el-button>
		  <el-button  icon="el-icon-document-add" @click="saveClick2()">保存为模板</el-button>
	      </el-main>
		  
		  <el-aside  width="300px" style="background-color: aliceblue;">
			  <span>&nbsp;</span>
			  <el-descriptions class="margin-top" title=" 搜索模板:" :column="1">
			  </el-descriptions>
			  <el-row >
				  <el-col :span="15" >
				  	<el-input placeholder="模板关键词" clearable style="font-size: 16px;"
				  	 v-model="templatekey"></el-input>
				  </el-col>
				  <el-col :span="2" >
				  		<el-button icon="el-icon-search" 
						style="text-align: right;" circle
						@click="templateClick()"></el-button>
				  </el-col>
			  </el-row>
			    <el-descriptions direction="vertical" :column="1" :size="size" border>
			      <el-descriptions-item>
			        <template slot="label">
			          名称
			        </template>
			        {{recordtemplate.templateName}}
			      </el-descriptions-item>
				  <el-descriptions-item>
				    <template slot="label">
				      内容
				    </template>
				    {{recordtemplate.templateResult}}
				  </el-descriptions-item>
				</el-descriptions>
		  </el-aside>
		  
	    </el-container>
	  
	</el-container>
</template>

<script>
	import{getTemplate} from '@/api/index.js';
	import{saveTemplate} from '@/api/index.js';
	import{saveRecord} from '@/api/index.js';
  export default {
	  name: "add_record",
    data() {
      return {
		  form: {
		  	patient_id: window.localStorage.patientId,
		  	patient_Identify: window.localStorage.patientIdentify,
		  	patient_name: window.localStorage.patientName,
		  	patient_pwd:window.localStorage.patientPassword,
		  	patient_gender: window.localStorage.patientGender,
		  	patient_age:window.localStorage.patientAge,
		  	patient_addr:window.localStorage.patientAddr,
		  	patient_phone:window.localStorage.patientPhone,
			doc_name: window.localStorage.docName,
		  },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
		Reg_record:{
			recordType:'',
			illTime:'',
			recordResult:'',
			allergy:'',
			presentIllness:'',
			regId:window.localStorage.regId,
		},
		recordtemplate:{
		},
		// record_result:{
		// 	templatename:this.Reg_record.recordResult,
		// 	templateresult:this.Reg_record.presentIllness,
		// },
        value1: '',
        value2: '',
        value3: '',
		templatekey:''
      };
    },
	methods:{
		templateClick() {
			console.log(this.templateName);
			this.instance.getTemplate({
				templateName:this.templatekey,
			}).then(res => {
				if(res != -1 && res.data.code == 666){
					  this.recordtemplate = res.data.datas;
					  //将患者信息存入缓存
					  console.log(this.recordtemplate);
					  window.localStorage.setItem('templateName',this.recordtemplate.templateName);
					  window.localStorage.setItem('templateId',this.recordtemplate.templateId);
					  window.localStorage.setItem('templateResult',this.recordtemplate.templateResult);
				}else if(res.data.code == 700){
						this.$message({
							type: 'error',
							message: res.data.message
						  });
					}
			})
		},
		saveClick1(){
			console.log(this.Reg_record.illTime);
			this.instance.saveRecord(
				this.Reg_record,
			).then(res => {
				if(res != -1 && res.data.code == 666){
					  alert("保存成功");
				}else if(res.data.code == 700){
						this.$message({
							type: 'error',
							message: res.data.message
						  });
					}
			})
		},
		saveClick2(){
			this.instance.saveTemplate({
				templateName:this.Reg_record.recordResult,
				templateResult:this.Reg_record.presentIllness,
			}).then(res => {
				if(res != -1 && res.data.code == 666){
					  alert("保存成功");
				}else if(res.data.code == 700){
						this.$message({
							type: 'error',
							message: res.data.message
						  });
					}
			})
		}
	}
  };
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 12px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>