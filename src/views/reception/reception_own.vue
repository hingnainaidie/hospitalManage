<template>
	<div class='top'>
		<el-descriptions class="margin-top" title="前台-我的基本信息" :column="1">
			<template slot="extra">
				<el-button type="primary" size="small" @click="dialog1Click()">修改基本信息</el-button>
				<el-button type="warning" size="small" @click="dialog2Click()">修改密码</el-button>
				<el-button type="warning" size="small" @click="logout()">登出</el-button>
			</template>
			<el-descriptions-item label="前台id">{{form.doc_id}}</el-descriptions-item>
			<el-descriptions-item label="用户名">{{form.doc_name}}</el-descriptions-item>
			<el-descriptions-item label="科室">{{form.office_id}}</el-descriptions-item>
			<el-descriptions-item label="级别">{{form.doc_level}}</el-descriptions-item>
			<el-descriptions-item label="手机号">{{form.doc_phone}}</el-descriptions-item>
			<el-descriptions-item label="性别">{{form.doc_gender}}</el-descriptions-item>
			<el-descriptions-item label="年龄">{{form.doc_age}}</el-descriptions-item>
			<el-descriptions-item label="身份证号">{{form.doc_identify}}</el-descriptions-item>
			<!--<el-descriptions-item label="挂号费">{{form.doc_price}}</el-descriptions-item>
			<el-descriptions-item label="最大可接纳病人数量">{{form.maxPatient}}</el-descriptions-item>
			<el-descriptions-item label="当前病人数量">{{form.currentPatient}}</el-descriptions-item>
			-->
			<el-descriptions-item label="类别">{{form.classifcation}}</el-descriptions-item>
			<!-- <el-descriptions-item label="密码(待删)">{{form.doc_password}}</el-descriptions-item> -->
		</el-descriptions>
		<el-dialog title="修改基本信息" :visible.sync="dialog1">
			<el-form :model="formChange">
				<el-form-item label="用户名" label-width="120px">
					<el-input v-model="formChange.docName"></el-input>
				</el-form-item>
				<el-form-item label="手机号" label-width="120px">
					<el-input v-model="formChange.docPhone"></el-input>
				</el-form-item>
				<el-form-item label="年龄" label-width="120px">
					<el-input v-model="formChange.docAge"></el-input>
				</el-form-item>
				<el-form-item label="性别" label-width="120px">
					<el-input v-model="formChange.docGender"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" label-width="120px">
					<el-input v-model="formChange.docIdentify"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialog1 = false">取 消</el-button>
				<el-button type="primary" @click="dialog1Sure()">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改密码" :visible.sync="dialog2">
			<el-form :model="form">
				<el-form-item label="旧密码" label-width="120px">
					<el-input v-model="docPassword" type="Password"></el-input>
				</el-form-item>
				<el-form-item label="新密码" label-width="120px">
					<el-input v-model="docNewPassword" type="Password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" label-width="120px">
					<el-input v-model="docNewPassword1" type="Password"></el-input>
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
	import{editDocInfo} from '@/api/index.js';
	import{editDocPwd} from '@/api/index.js';
	export default {
		name: "reception_own",
		data() {
			return {
				dialog1: false,
				dialog2: false,
				form: {
					doc_id: window.localStorage.docId,
					doc_name: window.localStorage.docName,
					office_id: window.localStorage.officeId,
					doc_level:window.localStorage.docLevel,
					doc_phone: window.localStorage.docPhone,
					doc_identify:window.localStorage.docIdentify,
					doc_gender:window.localStorage.docGender,
					doc_age:window.localStorage.docAge,
					doc_password:window.localStorage.docPassword,
					// doc_price:window.localStorage.docPrice,
					// maxPatient:window.localStorage.maxPatient,
					// currentPatient:window.localStorage.currentPatient,
					classifcation:window.localStorage.classifcation
				},
				formChange: {
					docId:'',
					docName: '',
					// officeId:'',
					// docLevel:'',
					docPhone: '',
					docGender: '',
					docAge: '',
					docIdentify: '',
					// docPassword:'',
					// docPrice:'',
					// maxPatient:'',
					// currentPatient:'',
					// classifcation:''
					
				},
				docPassword:window.localStorage.docPassword,
				docNewPassword: '',
				docNewPassword1: ''
			}
		},
		methods: {
			dialog1Click() {
				this.formChange.docId = this.form.doc_id;
				this.formChange.docName = this.form.doc_name;
				// this.formChange.officeId = this.form.office_id;
				// this.formChange.docLevel = this.form.doc_level;
				this.formChange.docPhone = this.form.doc_phone;
				this.formChange.docGender = this.form.doc_gender;
				this.formChange.docAge = this.form.doc_age;
				this.formChange.docIdentify = this.form.doc_identify;
				// this.formChange.docPassword = this.form.doc_password;
				// this.formChange.docPrice = this.form.doc_price;
				// this.formChange.maxPatient = this.form.maxPatient;
				// this.formChange.currentPatient = this.form.currentPatient;
				// this.formChange.classifcation = this.form.classifcation;
				this.dialog1 = true;
		 },
			dialog2Click(){
				this.docPassword=this.form.doc_password;
				this.docNewPassword1="";
				this.docNewPassword="";
				this.dialog2 = true;
			},
			dialog1Sure() {
				this.instance.editDocInfo(
				this.formChange
				).then(res => {
					if(res != -1 && res.data.code == 666){
						
						window.localStorage.setItem('docId',this.formChange.docId);
						window.localStorage.setItem('docName',this.formChange.docName);
						//window.localStorage.setItem('officeId',this.formChange.officeId);
						//window.localStorage.setItem('docLevel',this.formChange.docLevel);
						window.localStorage.setItem('docPhone',this.formChange.docPhone);
						window.localStorage.setItem('docGender',this.formChange.docGender);
						window.localStorage.setItem('docAge',this.formChange.docAge);
						window.localStorage.setItem('docIdentify',this.formChange.docIdentify);
						// window.localStorage.setItem('docPrice',this.formChange.docPrice);
						// window.localStorage.setItem('maxPatient',this.formChange.maxPatient);
						// window.localStorage.setItem('currentPatient',this.formChange.currentPatient);
						// window.localStorage.setItem('classifcation',this.formChange.classifcation);
						this.form.doc_name=this.formChange.docName,
						this.form.doc_phone=this.formChange.docPhone,
						this.form.doc_age=this.formChange.docAge,
						this.form.doc_gender=this.formChange.docGender,
						this.form.doc_identify=this.formChange.docIdentify,
						alert("修改成功");
				
					}else if(res.data.code == 700){
							this.$message({
								type: 'error',
								message: res.data.message
							  });
							  alert("修改失败")
						}
				});
				this.dialog1 = false;
			},
			dialog2Sure() {
				if (this.docNewPassword != this.docNewPassword1) {
					alert("两次输入新密码不匹配");
				} 
				else {
					this.instance.editDocPwd({
						docId:this.form.doc_id,
						// docPassword: this.docPassword,
						// newPassword: this.docNewPassword
						//后续补充一下旧密码问题
						docPassword: this.docNewPassword,
						//newPassword: this.docNewPassword
					}).then(res => {
						if(res != -1 && res.data.code == 666){
							alert("修改成功");
							window.localStorage.clear();
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
