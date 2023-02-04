<template>
	<div class="top">
		<el-container>
			<el-aside width="200px">
		    <el-menu 
			:default-active="this.$router.path" 
			@select="handleSelect" 
			mode="vertical"
			background-color="#545c64"
		    text-color="#fff" 
			active-text-color="#ffd04b"
			style="height: 90vh;">
		      <el-menu-item index="/app/doctor_mng/doctor_patient" >
		        <i class="el-icon-s-flag"></i>
		        <span slot="title">我的病人</span>
		      </el-menu-item>
			  <el-menu-item index="/app/doctor_mng/doctor_own">
			    <i class="el-icon-s-data"></i>
			    <span slot="title">我的基本信息</span>
			  </el-menu-item>
		    </el-menu>	
		  </el-aside>
		  <el-main class="main">
			  <router-view/>
		  </el-main>
		</el-container>
	</div>
</template>

<script>
	import{visitPatient} from '@/api/index.js';
	export default {
	  name: 'doctor_mng',
	  data(){
	    return{
			patientQueue:{},
			doc_id:window.localStorage.docId
			}
		},
	  methods: {
	      handleSelect(key) {
			  this.instance.visitPatient(
			    	doc_id : this.form.doc_id,
			    	).then(res => {
			    		if(res != -1 && res.data.code == 666){
			    			this.$message({
			    				type: 'success',
			    				message: '登录成功!',
			    				duration:500,
			    				center:true
			    			  });
			    			  this.patientQueue = res.data.datas;
			    			  //将患者信息存入缓存
			  			  window.localStorage.setItem('reg_id',this.patientQueue.reg_id);
			    		  window.localStorage.setItem('patient_id',this.patientQueue.patient_id);
			  			  window.localStorage.setItem('patient_name',this.patientQueue.patient_name);
			  			  window.localStorage.setItem('patient_gender',this.patientQueue.patient_gender);
			  			  window.localStorage.setItem('patient_identify',this.patientQueue.patient_identify);
			  			  window.localStorage.setItem('patient_phone',this.patientQueue.patient_phone);
			  			  window.localStorage.setItem('patient_password',this.patientQueue.patient_password);
			  			  window.localStorage.setItem('patient_age',this.patientQueue.patient_age);
			  			  window.localStorage.setItem('patient_addr',this.patientQueue.patient_addr);
			    			  
			  			  this.$router.push({name:'doctor_patient'});
			    	
			    		}else if(res.data.code == 700){
			    				this.$message({
			    					type: 'error',
			    					message: res.data.message
			    				  });
			    				  alert("失败");
			    			}
			    	});
			
		  }
		  }
		}
	}
</script>

<style>
</style>



