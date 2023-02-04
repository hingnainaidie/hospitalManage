<template>
	<div class='top'>
		<el-row style="text-align: center;">
			<el-col :span="10">
				<el-input v-model="patientIdentify" clearable placeholder="身份证号"></el-input>
			</el-col>
			<el-col :span="2">
				<el-button icon="el-icon-search" style="text-align: right;" circle @click="Click1()"></el-button>
			</el-col>
		</el-row>
		<el-row style="text-align: right;">
			<el-button type="primary" @click="dialogFormVisible = true" round>注册</el-button>
			<el-dialog title="用户信息" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="姓名" :label-width="formLabelWidth">
						<el-input v-model="form.patientName" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别" :label-width="formLabelWidth">
						<el-input v-model="form.patientGender"></el-input>
					</el-form-item>
					<el-form-item label="年龄" :label-width="formLabelWidth">
				  <el-input v-model="form.patientAge"></el-input>
					</el-form-item>
					<el-form-item label="身份证号" :label-width="formLabelWidth">
						<el-input v-model="form.patientIdentify"></el-input>
					</el-form-item>
					<el-form-item label="电话" :label-width="formLabelWidth">
						<el-input v-model="form.patientPhone"></el-input>
					</el-form-item>
					<el-form-item label="家庭住址" :label-width="formLabelWidth">
				  <el-input v-model="form.patientAddr"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogFormVisible = false;Click2()">确认注册</el-button>
				</div>
			</el-dialog>
			<!-- <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> -->
			<!-- <el-button round>预约</el-button> -->
				<el-descriptions class="margin-top" title="患者信息" :column="3" :size="size" border>
					<el-descriptions-item>
						<template slot="label">
							<i class="el-icon-user"></i>
							姓名
						</template>
						{{patientform.patientName}}
					</el-descriptions-item>
					<el-descriptions-item>
						<template slot="label">
							性别
						</template>
						{{patientform.patientGender}}
					</el-descriptions-item>
					<el-descriptions-item>
						<template slot="label">
							<!-- <i class="el-icon-tickets"></i> -->
							身份证号
				  </template>
						{{patientform.patientIdentify}}
					</el-descriptions-item>
					<el-descriptions-item>
						<template slot="label">
							<i class="el-icon-mobile-phone"></i>
							手机号
						</template>
						{{patientform.patientPhone}}
					</el-descriptions-item>
					<el-descriptions-item>
						<template slot="label">
							<i class="el-icon-location-outline"></i>
							家庭地址
						</template>
						{{patientform.patientAddr}}
			 	</el-descriptions-item>
				</el-descriptions>
				<el-descriptions class="margin-top" title=" " :size="size" border>
				</el-descriptions>
				<el-descriptions class="margin-top" title="医生选择" :column="3" :size="size" border>
					<el-descriptions-item>
						<template slot="label">
							科室
						</template>
						<el-select v-model="getvalue" @click="departmentClick()" placeholder="请选择">
							<el-option v-for="item in officeList" :key="item.officeId" :label="item.officeName"
								:value="item.officeId">
							</el-option>
						</el-select>
					</el-descriptions-item>
					<el-descriptions-item>
						<div class="block">
							<el-date-picker v-model="appointTime" placement="bottom-start"
								:picker-options="pickerOptions" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
								placeholder="选择日期">
							</el-date-picker>
						</div>
						
					</el-descriptions-item>
					<el-descriptions-item>
						<el-button icon="el-icon-search" style="text-align: right;" circle @click="doctorClick()">
						</el-button>
					</el-descriptions-item>
				</el-descriptions>
				  <el-table
				  ref="singleTable"
				  highlight-current-row
				      @current-change="handleCurrentChange"
				    :data="tableData"
				    style="width: 100%">
				    <el-table-column label="医生姓名" prop="docName" width="120">
				    </el-table-column>
				    <el-table-column label="性别" prop="docGender" width="120">
				    </el-table-column>
				    <el-table-column prop="docLevel" label="级别" width="120">
				    </el-table-column>
				    <el-table-column prop="docAge" label="年龄" show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column prop="docPrice" label="挂号费" show-overflow-tooltip>
				    </el-table-column>
					<el-table-column label="功能">
					    <template slot-scope="scope">
					    <el-button
					      size="mini"
					      @click="handleReg(scope.$index, scope.row)" >预约</el-button>
						</template>
					</el-table-column>
					<el-table-column label="操作">
					     <template slot-scope="scope">
					     <el-button
					       size="mini"
					       @click="payClick(scope.$index, scope.row)" >缴费</el-button>
					     </template>
					</el-table-column>
				    
						
				  </el-table>
		</el-row>
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
		searchPatient
	} from '@/api/index.js';
	import {
		registerbyReception
	} from '@/api/index.js';
	import {
		getOffice
	} from '@/api/index.js';
	import {
		searchDoctor
	} from '@/api/index.js';
	import {
		registerOrder
	} from '@/api/index.js';
	import {
		registerPay
	} from '@/api/index.js';
	export default {
		data() {
			return {
				officeList: [],
				getvalue: '',
				dialogTableVisible: false,
				dialogFormVisible: false,
				dialogTableVisible1: false,
				dialogFormVisible1: false,
				visible: false,
				// isdisabled:false,
				// isDisabled:false,
				patientIdentify: '',
				form: {
					patientName: '',
					patientGender: '',
					patientIdentify: '',
					patientPhone: '',
					patientAge: '',
					patientAddr: ''
				},
				patientform: {},
				pickerOptions: {
					disabledDate(time) {
						const day1 = 10 * 3600 * 1000;
						let maxTime = Date.now()+day1;
						let minTime = Date.now();
						return time.getTime() < Date.now() || time.getTime() > maxTime;
					}
				},
				regInfo: {},
				appointTime: '',
				value2: '',
				value3: '',
				formLabelWidth: '120px',
				tableData: [
				],
				doc_id:'',
				currentRow: null
			};
		},
		created() {
			this.departmentClick()
		},
		methods: {
			setCurrent(row) {
			this.$refs.singleTable.setCurrentRow(row);
		  },
		  handleCurrentChange(val) {
			this.currentRow = val;
		  },
			handleReg(index, row) {
			    console.log(index, row);
				console.log(row.docId);
				this.doc_id=row.docId;
				console.log(this.doc_id);
				this.instance.registerOrder({
					doctorId:this.doc_id,
					patientId: this.patientform.patientId,
					appointmentTime: this.appointTime,
				}).then(res => {
					alert("预约成功");
					this.regInfo = res.data.datas;
					console.log(this.regInfo);
					window.localStorage.setItem('regId', this.regInfo.regId);
					console.log(window.localStorage.regId);
					// this.isDisabled=true;
				})
			},
			payClick(index, row){
				this.instance.registerPay({
					regId:window.localStorage.regId,
				}).then(res => {
					if (res != -1 && res.data.code == 666) {
						this.$message({
							type: 'success',
							message: '已缴费',
							duration: 500,
							center: true
						});
						// this.isdisabled=true;
					} else if (res.data.code == 700) {
						alert("请先注册");
						// this.$message({
						// 	type: 'error',
						// 	message: res.data.message
						//   });
					}
				})
			},
			Click1() {
				this.instance.searchPatient({
					patientIdentify: this.patientIdentify,
				}).then(res => {
					if (res != -1 && res.data.code == 666) {
						this.$message({
							type: 'success',
							message: '已有账号',
							duration: 500,
							center: true
						});
						this.patientform = res.data.datas;
						console.log(this.patientform);
						window.localStorage.setItem('patientIdentify', this.patientform.patientIdentify);
						window.localStorage.setItem('patientName', this.patientform.patientName);
						window.localStorage.setItem('patientPassword', this.patientform.patientPassword);
						window.localStorage.setItem('patientId', this.patientform.patientId);
						window.localStorage.setItem('patientGender', this.patientform.patientGender);
						window.localStorage.setItem('patientAge', this.patientform.patientAge);
						window.localStorage.setItem('patientAddr', this.patientform.patientAddr);
						window.localStorage.setItem('patientPhone', this.patientform.patientPhone);
					} else if (res.data.code == 700) {
						alert("请先注册");
						// this.$message({
						// 	type: 'error',
						// 	message: res.data.message
						//   });
					}
				})
			},
			Click2() {
				// alert("test");
				console.log(this.form);
				this.instance.registerbyReception(
					this.form,
				).then(res => {
					if (res != -1 && res.data.code == 666) {
						this.$message({
							type: 'success',
							message: '注册成功',
							duration: 500,
							center: true
						});

					} else if (res.data.code == 700) {
						alert("请先注册");
						// this.$message({
						// 	type: 'error',
						// 	message: res.data.message
						//   });
					}
				})
			},
			departmentClick() {
				// alert("test");
				this.instance.getOffice().then(res => {
					if (res != -1 && res.data.code == 666) {
						this.officeList = res.data.datas.officeList;
						// console.log(this.officeList);
						// console.log(this.officeList[0]);
					} else if (res.data.code == 700) {
						// alert("请先注册");
						this.$message({
							type: 'error',
							message: res.data.message
						});
					}
				})
			},
			doctorClick() {

				this.instance.searchDoctor({
					officeId: this.getvalue,
					appointTime: this.appointTime,
				}).then(res => {
					if (res != -1 && res.data.code == 666) {
						this.tableData = res.data.datas.doctorList;
						console.log(this.tableData);
						console.log(this.tableData[0]);
					} else if (res.data.code == 700) {
						// alert("请先注册");
						this.$message({
							type: 'error',
							message: res.data.message
						});
					}
				})
			},
			regClick() {
				this.instance.registerOrder({
					doctorId: this.getvalue,
					patientId: this.patientform.patientId,
					appointmentTime: this.appointTime,
				}).then(res => {
						if (res != -1) {
							this.regInfo = res;
							console.log(this.regInfo);
							window.localStorage.setItem('regId', this.regInfo.regId);
							console.log(window.localStorage.regId);
							this.instance.registerPay({
								regId: window.localStorage.regId,
							}).then(res => {
								if (res != -1 && res.data.code == 666) {
									alert("test");
								} else if (res.data.code == 700) {
									// alert("请先注册");
									this.$message({
										type: 'error',
										message: res.data.message
									})
								}
							});
							// this.$alert('缴费确认', '缴费', {
							// 	confirmButtonText: '已缴费',
							// 	callback: action => {
							// 		//  this.$message({
							// 		// type: 'info',
							// 		// message: `action: ${ action }`
							// 		//  });
									
							// 	}
							// })
						}
					})
				}
			},
		}

</script>
