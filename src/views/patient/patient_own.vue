<template>
	<div class='top'>
		<el-descriptions class="margin-top" title="我的基本信息" :column="1">
			<template slot="extra">
				<el-button type="primary" size="small" @click="dialog1Click()">修改基本信息</el-button>
				<el-button type="warning" size="small" @click="dialog2Click()">修改密码</el-button>
				<el-button type="warning" size="small" @click="logout()">登出</el-button>
			</template>
			<el-descriptions-item label="姓名">{{form.patient_name}}</el-descriptions-item>
			<el-descriptions-item label="手机号">{{form.patient_phone}}</el-descriptions-item>
			<el-descriptions-item label="性别">{{form.patient_gender}}</el-descriptions-item>
			<el-descriptions-item label="年龄">{{form.patient_age}}</el-descriptions-item>
			<el-descriptions-item label="身份证号">{{form.patient_identify}}</el-descriptions-item>
			<el-descriptions-item label="住址">{{form.patient_addr}}</el-descriptions-item>
			
		</el-descriptions>
		<el-dialog title="修改基本信息" :visible.sync="dialog1" center>
			<el-form :model="formChange">
				<el-form-item label="姓名" label-width="120px">
					<el-input v-model="formChange.patientName"></el-input>
				</el-form-item>
				<el-form-item label="性别" label-width="120px">
					<el-input v-model="formChange.patientGender"></el-input>
				</el-form-item>
				<el-form-item label="年龄" label-width="120px">
					<el-input v-model="formChange.patientAge"></el-input>
				</el-form-item>
				<el-form-item label="手机号" label-width="120px">
					<el-input v-model="formChange.patientPhone"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" label-width="120px">
					<el-input v-model="formChange.patientIdentify"></el-input>
				</el-form-item>
				<el-form-item label="住址" label-width="120px">
					<el-input v-model="formChange.patientAddr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialog1 = false">取 消</el-button>
				<el-button type="primary" @click="dialog1Sure()">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改密码" :visible.sync="dialog2" center>
			<el-form :model="form">
				<el-form-item label="旧密码" label-width="120px">
					<el-input v-model="patientPwd" type="password"></el-input>
				</el-form-item>
				<el-form-item label="新密码" label-width="120px">
					<el-input v-model="patientNewPwd" type="password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" label-width="120px">
					<el-input v-model="patientNewPwd1" type="password"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialog2 = false">取 消</el-button>
				<el-button type="primary" @click="dialog2Sure()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {editInfo, editPwd} from '@/api/index.js';
	export default {
		name: "patient_own",
		data() {
			return {
				dialog1: false,
				dialog2: false,
				form: {
					patient_id: window.localStorage.patientId,
					patient_name: window.localStorage.patientName,
					patient_phone: window.localStorage.patientPhone,
					patient_age:window.localStorage.patientAge,
					patient_gender:window.localStorage.patientGender,
					patient_identify:window.localStorage.patientIdentify,
					patient_addr:window.localStorage.patientAddr
					
				},
				formChange: {
					patientId: '',
					patientName: '',
					patientPhone: '',
					patientAge: '',
					patientGender: '',
					patientIdentify: '',
					patientAddr:''
				},
				patientPwd: '',
				patientNewPwd: '',
				patientNewPwd1: ''
			}
		},
		methods: {
			dialog1Click() {
				this.formChange.patientId = this.form.patient_id;
				this.formChange.patientName = this.form.patient_name;
				this.formChange.patientAge=this.form.patient_age;
				this.formChange.patientGender=this.form.patient_gender;
				this.formChange.patientPhone = this.form.patient_phone;
				this.formChange.patientIdentify = this.form.patient_identify;
				this.formChange.patientAddr=this.form.patient_addr;
				this.dialog1 = true;
		 },
			dialog2Click(){
				this.patientPwd="";
				this.patientNewPwd1="";
				this.patientNewPwd="";
				this.dialog2 = true;
			},
			dialog1Sure() {
				this.instance.editInfo(this.formChange).then(res => {
					if(res.data.datas.isSuccess){
						window.localStorage.setItem("patientName",this.formChange.patientName);
						window.localStorage.setItem("patientAge",this.formChange.patientAge);
						window.localStorage.setItem("patientGender",this.formChange.patientGender);
						window.localStorage.setItem("patientPhone",this.formChange.patientPhone);
						window.localStorage.setItem("patientIdentify",this.formChange.patientIdentify);
						window.localStorage.setItem("patientAddr",this.formChange.patientAddr);
						this.form.patient_name=this.formChange.patientName,
						this.form.patient_age=this.formChange.patientAge,
						this.form.patient_gender=this.formChange.patientGender,
						this.form.patient_phone=this.formChange.patientPhone,
						this.form.patient_identify=this.formChange.patientIdentify,
						this.form.patient_addr=this.formChange.patientAddr,
						alert("修改成功");
					}else{
						alert("修改失败")
					}
				});
				this.dialog1 = false;
			},
			dialog2Sure() {
				if (this.patientNewPwd != this.patientNewPwd1) {
					alert("两次输入新密码不匹配");
				} else {
					this.instance.editPwd({
						patientId:this.form.patient_id,
						patientPwd: this.patientPwd,
						newPwd: this.patientNewPwd
					}).then(res => {
						if(res.data.datas.isSuccess){
							alert(res.data.datas.success);
							this.$router.push({path:"/login"});
						}else{
							alert(res.data.datas.error);
						}
					});
					this.dialog2 = false;
				}
			},
			//退出登录
			logout(){
				window.localStorage.clear();
				this.$router.push({path:"/login"})
			}
		}
	}
</script>

<style scope>
	.margin-top {
		margin: 10px;
	}
</style>
