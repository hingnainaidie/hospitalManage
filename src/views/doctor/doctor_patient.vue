<template>
	<div class='top'>

		<el-container style="height: 280px; border: 1px solid #eee">

			<el-container>
				<el-header style="text-align: left; font-size: 24px; color: #eee;">
					<span>正在就诊</span>

				</el-header>

				<el-main>
					<el-table :data="visitNow">
						<el-table-column prop="patientName" label="姓名" width="120">
						</el-table-column>
						<el-table-column prop="patientGender" label="性别" width="120">
						</el-table-column>
						<el-table-column prop="patientAge" label="年龄" width="120">
						</el-table-column>
						<el-table-column prop="patientPhone" label="电话号码">
						</el-table-column>
						<el-table-column prop="patientIdentify" label="身份证号">
						</el-table-column>
						<el-table-column prop="patientAddr" label="地址">
						</el-table-column>
					</el-table>
				</el-main>
				<el-row>
					<el-button @click="drawer = true" type="primary" style="margin-right: 10px;" round>
						就诊
					</el-button>
					<el-drawer title="医生就诊" :visible.sync="drawer" :before-close="handleClose">

						<el-row>
							<el-col :span="24" :offset="2">功能:</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" :offset="2">
								<el-button type="primary" icon="el-icon-folder-add" @click="recordClick()"
									:disabled="isDisabled">添加病历&nbsp;&nbsp;&nbsp;</el-button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" :offset="2">
								<el-button type="primary" icon="el-icon-folder-add" @click="prescriptionClick()">
									添加处方&nbsp;&nbsp;&nbsp;</el-button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" :offset="2">
								<el-button type="primary" icon="el-icon-folder-add" @click="checklistClick()">添加检查单
								</el-button>
							</el-col>
						</el-row>
					</el-drawer>

					<el-button type="warning" round @click="dialogClick3()">挂起</el-button>
					<el-button type="danger" round @click="dialogClick4()">结束</el-button>
					<!-- <el-button style="text-align: right;" round  @click="dialogClick1()">刷新</el-button> -->
				</el-row>
				<span>&nbsp;</span>
			</el-container>
		</el-container>

		<el-container style="height: 500px; border: 1px solid #eee">
			<el-container>
				<el-header style="text-align: left; font-size: 24px; color: #eee;">
					<span>待就诊</span>

				</el-header>

				<el-row style="text-align: right;">
					<el-button type="success" round @click="dialogClick2()">叫号</el-button>
				</el-row>
				<el-main>
					<el-table :data="patientQueue">
						<el-table-column prop="patient.patientName" label="姓名" width="120">
						</el-table-column>
						<el-table-column prop="patient.patientGender" label="性别" width="120">
						</el-table-column>
						<el-table-column prop="patient.patientAge" label="年龄" width="120">
						</el-table-column>
						<el-table-column prop="patient.patientPhone" label="电话号码">
						</el-table-column>
						<el-table-column prop="patient.patientIdentify" label="身份证号">
						</el-table-column>
						<el-table-column prop="patient.patientAddr" label="地址">
						</el-table-column>
					</el-table>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>


<style>
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0px;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
</style>

<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}
</style>



<script>
	import {
		docCall
	} from '@/api/index.js';
	import {
		docEnd
	} from '@/api/index.js';
	import {
		docSuspend
	} from '@/api/index.js';
	import {
		visitPatient
	} from '@/api/index.js';
	import {
		getpatientInfo
	} from '@/api/index.js';
	import {
		docVisitNow
	} from '@/api/index.js';
	export default {
		name: 'doctor_patient',
		data() {
			return {
				isDisabled: false,
				form: {},
				patientform: {},
				visitNow: [],
				nowInfo: {},
				patientQueue: [],
				// showtable:[
				//  {
				// 	 nowId:window.localStorage.nowId,
				// 	 nowName:window.localStorage.nowName,
				// 	 nowGender:window.localStorage.nowGender,
				// 	 nowPhone:window.localStorage.nowPhone,
				//  }
				// ],

				drawer: false
			}
		},
		created() {
			this.dialogClick1()
		},
		methods: {
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			recordClick() {
				this.isDisabled = true;
				this.instance.getpatientInfo({
					regId: window.localStorage.regId,
				}).then(res => {
					if (res != -1 && res.data.code == 666) {
						this.patientform = res.data.datas;
						//将患者信息存入缓存
						console.log(this.patientform);
						window.localStorage.setItem('patientId', this.patientform.patientId);
						window.localStorage.setItem('patientName', this.patientform.patientName);
						window.localStorage.setItem('patientIdentify', this.patientform.patientIdentify);
						window.localStorage.setItem('patientPassword', this.patientform.patientPassword);
						window.localStorage.setItem('patientGender', this.patientform.patientGender);
						window.localStorage.setItem('patientAge', this.patientform.patientAge);
						window.localStorage.setItem('patientAddr', this.patientform.patientAddr);
						window.localStorage.setItem('patientPhone', this.patientform.patientPhone);
						window.localStorage.setItem('regId', window.localStorage.regId);
						this.$router.push({
							name: 'add_record'
						});
					} else if (res.data.code == 700) {
						this.$message({
							type: 'error',
							message: res.data.message
						});
					}
				})
			},
			prescriptionClick() {
				this.instance.getpatientInfo({
					regId: window.localStorage.regId,
				}).then(res => {
					if (res != -1 && res.data.code == 666) {
						this.patientform = res.data.datas;
						//将患者信息存入缓存
						console.log(this.patientform);
						window.localStorage.setItem('patientId', this.patientform.patientId);
						window.localStorage.setItem('patientName', this.patientform.patientName);
						window.localStorage.setItem('patientIdentify', this.patientform.patientIdentify);
						window.localStorage.setItem('patientPassword', this.patientform.patientPassword);
						window.localStorage.setItem('patientGender', this.patientform.patientGender);
						window.localStorage.setItem('patientAge', this.patientform.patientAge);
						window.localStorage.setItem('patientAddr', this.patientform.patientAddr);
						window.localStorage.setItem('patientPhone', this.patientform.patientPhone);
						window.localStorage.setItem('regId', window.localStorage.regId);
						this.$router.push({
							name: 'add_prescription'
						});
					} else if (res.data.code == 700) {
						this.$message({
							type: 'error',
							message: res.data.message
						});
					}
				})
			},
			checklistClick() {
				this.instance.getpatientInfo({
					regId: window.localStorage.regId,
				}).then(res => {
					if (res != -1 && res.data.code == 666) {
						this.patientform = res.data.datas;
						//将患者信息存入缓存
						console.log(this.patientform);
						window.localStorage.setItem('patientId', this.patientform.patientId);
						window.localStorage.setItem('patientName', this.patientform.patientName);
						window.localStorage.setItem('patientIdentify', this.patientform.patientIdentify);
						window.localStorage.setItem('patientPassword', this.patientform.patientPassword);
						window.localStorage.setItem('patientGender', this.patientform.patientGender);
						window.localStorage.setItem('patientAge', this.patientform.patientAge);
						window.localStorage.setItem('patientAddr', this.patientform.patientAddr);
						window.localStorage.setItem('patientPhone', this.patientform.patientPhone);
						window.localStorage.setItem('regId', window.localStorage.regId);
						this.$router.push({
							name: 'add_checklist'
						});
					} else if (res.data.code == 700) {
						this.$message({
							type: 'error',
							message: res.data.message
						});
					}
				})
			},
			dialogClick1() {
				this.instance.visitPatient({
					docId: window.localStorage.docId,
				}).then(res => {
					if (res != -1 && res.data.code == 666) {

						this.patientQueue = res.data.datas;
						//将患者信息存入缓存
						console.log(this.patientQueue);
						window.localStorage.setItem('patientId', this.patientform.patientId);
					} else if (res.data.code == 700) {
						this.$message({
							type: 'error',
							message: res.data.message
						});
					}
				});
				this.instance.docVisitNow({
					docId: window.localStorage.docId,
				}).then(res => {
					if (res != -1 && res.data.code == 666) {
						// alert("test");
						this.nowInfo = res.data.datas;
						console.log(this.nowInfo);
						window.localStorage.setItem('regId', this.nowInfo.regId);
						//将患者信息存入缓存
						this.visitNow = this.nowInfo.patientList;
						console.log(window.localStorage.regId);

					} else if (res.data.code == 700) {
						this.visitNow = [];
					}
				});
			},
			dialogClick2() {

				this.instance.docCall({
					docId: window.localStorage.docId,
				}).then(res => {
					if (res != -1 && res.data.code == 666) {

						// this.visitNow.push(this.patientQueue[0]);
						// console.log(this.visitNow[0].regId);
						// if(this.visitNow.length>1)
						// {
						// 	this.visitNow.shift();
						// }
						this.patientQueue = res.data.datas;
						//将患者信息存入缓存
						console.log(this.patientQueue);
						this.instance.docVisitNow({
							docId: window.localStorage.docId,
						}).then(res => {
							if (res != -1 && res.data.code == 666) {
								// alert("test");
								this.nowInfo = res.data.datas;
								console.log(this.nowInfo);
								window.localStorage.setItem('regId', this.nowInfo.regId);
								//将患者信息存入缓存
								this.visitNow = this.nowInfo.patientList;
								console.log(window.localStorage.regId);

							} else if (res.data.code == 700) {
								this.visitNow = [];
							}
						});

					} else if (res.data.code == 700) {
						this.$message({
							type: 'error',
							message: res.data.message
						});
					}
				});

			},
			dialogClick3() {
				this.instance.docSuspend({
					regId: window.localStorage.regId,
				}).then(res => {
					if (res != -1 && res.data.code == 666) {
						// console.log(this.visitNow[0].regId);
						// this.visitNow.shift();
						this.$message({
							type: 'success',
							message: '已挂起!',
							duration: 500,
							center: true
						});
						this.instance.docVisitNow({
							docId: window.localStorage.docId,
						}).then(res => {
							if (res != -1 && res.data.code == 666) {
								alert("test");
								this.nowInfo = res.data.datas;
								console.log(this.nowInfo);
								window.localStorage.setItem('regId', this.nowInfo.regId);
								//将患者信息存入缓存
								this.visitNow = this.nowInfo.patientList;
								console.log(window.localStorage.regId);
						
							} else if (res.data.code == 700) {
								this.visitNow = [];
						
							}
						});
					} else if (res.data.code == 700) {
						this.$message({
							type: 'error',
							message: res.data.message
						});
					}
				})
			},
			dialogClick4() {
				this.instance.docEnd({
					regId: window.localStorage.regId,
				}).then(res => {
					if (res != -1 && res.data.code == 666) {
						// console.log(this.visitNow);
						// this.visitNow.shift();
						this.$message({
							type: 'success',
							message: '已结束!',
							duration: 500,
							center: true
						});
						// this.$router.push({name:'doctor_patient'});
						this.instance.docVisitNow({
							docId: window.localStorage.docId,
						}).then(res => {
							if (res != -1 && res.data.code == 666) {
								alert("test");
								this.nowInfo = res.data.datas;
								console.log(this.nowInfo);
								window.localStorage.setItem('regId', this.nowInfo.regId);
								//将患者信息存入缓存
								this.visitNow = this.nowInfo.patientList;
								console.log(window.localStorage.regId);

							} else if (res.data.code == 700) {
								this.visitNow = [];

							}
						});
					} else if (res.data.code == 700) {
						this.$message({
							type: 'error',
							message: res.data.message
						});
					}
				})
			}

		}


	}
</script>
