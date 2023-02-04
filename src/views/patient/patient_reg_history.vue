<template>
	<div class="events">
		<h2>历史预约信息</h2>
		<div>
			<el-table border :data='regHistoryList' style='width: 100%; padding: auto;' v-loading="loading" element-loading-text="拼命加载中"
				element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
				<el-table-column prop='appointmentTime' label='预约时间' width="170" align="center"></el-table-column>
				<el-table-column prop='prescriptionTime' label='就诊时间' width="170" align="center"></el-table-column>
				<el-table-column prop='officeName' label='就诊科室' width="170" align="center"></el-table-column>
				<el-table-column prop='docName' label='就诊医生' min-width="170" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="250px">
					<template slot-scope="scope">
						<el-button size="mini" type="warning" @click="showRegDetail(scope.row.idRelationId)">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 
			<!-- 历预约详情查看 -->
			<el-dialog title="历史预约详情" :visible.sync="isShowDetail" :center='true' width="800px">
				<div>
					<el-descriptions class="margin-top" :column="1">
						<el-descriptions-item label="预约时间">{{regDetail.appointmentTime}}</el-descriptions-item>
						<el-descriptions-item label="就诊时间">{{regDetail.prescriptionTime}}</el-descriptions-item>
						<el-descriptions-item label="就诊科室">{{regDetail.officeName}}</el-descriptions-item>
						<el-descriptions-item label="就诊医生">{{regDetail.docName}}</el-descriptions-item>
					</el-descriptions>
			
				</div>
				<span :center='true'>
					<el-button size="mini" type="warning" @click="showMedicine(regDetail.prescriptionId)">查看处方单</el-button>
					<el-button size="mini" type="warning" @click="showCheck(regDetail.checklistId)">查看检查单</el-button>
				</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="isShowDetail = false">返回</el-button>
				</span>
			</el-dialog> 
			
			<!-- 查看处方单 -->
			<el-dialog title="处方单" :visible.sync="isShowPre" :center='true' width="800px">
				<div>
					<el-descriptions class="margin-top" :column="1">
						<el-descriptions-item label="预约时间">{{prescription.appointmentTime}}</el-descriptions-item>
						<el-descriptions-item label="开处方时间">{{prescription.prescriptionTime}}</el-descriptions-item>
						<el-descriptions-item label="就诊科室">{{prescription.officeName}}</el-descriptions-item>
						<el-descriptions-item label="就诊医生">{{prescription.docName}}</el-descriptions-item>
						<el-descriptions-item label="就诊类型">{{prescription.recordType}}</el-descriptions-item>
						<el-descriptions-item label="就诊结果">{{prescription.recordResult}}</el-descriptions-item>
						<el-descriptions-item label="总价">{{medicineTotalPrice}}</el-descriptions-item>
					</el-descriptions>
				</div>
				<div>
					<el-table height="250" :data="medicineList" stripe style="width: 100%" >
						<el-table-column width="150px;" align="center" prop="medicineName" label="药品名称" ></el-table-column>
						<el-table-column min-width="40px;" align="center" prop="amount" label="药品数量" ></el-table-column>
							<el-table-column min-width="80px;" align="center" prop="specification" label="规格" ></el-table-column>
							<el-table-column min-width="80px;" align="center" prop="frequency" label="频率" ></el-table-column>
							<el-table-column min-width="80px;" align="center" prop="dosagePer" label="单次用量" ></el-table-column>
							<el-table-column min-width="30px;" align="center" prop="pricePer" label="单价" ></el-table-column>
							<el-table-column min-width="70px;" align="center" prop="state" label="药品状态">
								<template slot-scope="scope">
									<el-tag :type="color(scope.row.state)">{{sta_medicine(scope.row.state)}}</el-tag>
								</template>
							</el-table-column>
					</el-table>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="isShowPre = false">返回</el-button>
				</span>
			</el-dialog>
			
			
			<!-- 查看检查单 -->
			<el-dialog title="检查单" :visible.sync="isShowCheck" :center='true' width="800px">
				<div>
					<el-descriptions class="margin-top" :column="1">
						<el-descriptions-item label="预约时间">{{check.appointmentTime}}</el-descriptions-item>
						<el-descriptions-item label="开检查单时间">{{check.prescribeTime}}</el-descriptions-item>
						<el-descriptions-item label="就诊科室">{{check.officeName}}</el-descriptions-item>
						<el-descriptions-item label="就诊医生">{{check.docName}}</el-descriptions-item>
						<el-descriptions-item label="就诊类型">{{check.recordType}}</el-descriptions-item>
						<el-descriptions-item label="就诊结果">{{check.recordResult}}</el-descriptions-item>
						<el-descriptions-item label="总价">{{checkTotalPrice}}</el-descriptions-item>
					</el-descriptions>
				</div>
				<div>
					<el-table height="250" :data="checkList" stripe style="width: 100%" >
						<el-table-column width="150px;" align="center" prop="checkitemName" label="检查项目" ></el-table-column>
						<el-table-column min-width="80px;" align="center" prop="checkPart" label="检查部位" ></el-table-column>
						<el-table-column min-width="80px;" align="center" prop="officeName" label="检查科室" ></el-table-column>
						<el-table-column min-width="80px;" align="center" prop="checkitemPrice" label="检查价格" ></el-table-column>
						<el-table-column min-width="200px;" align="center" prop="checkitemNote" label="注意事项" ></el-table-column>
						<el-table-column min-width="90px;" align="center" prop="state" label="检查状态">
							<template slot-scope="scope">
								<el-tag :type="color(scope.row.state)">{{sta_checkitem(scope.row.state)}}</el-tag>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="isShowCheck = false">返回</el-button>
				</span>
			</el-dialog>
			
			
			
			
			
		</div>
	</div>
</template>

<script>
	export default{
		name:"patient_reg_history",
		data(){
			return{
				regHistoryList:[],
				loading:true,
				isShowDetail:false,
				isShowPre:false,
				isShowCheck:false,
				regDetail:{}, //历史预约详情
				prescription:{},//处方单
				check:{},  //检查单
				medicineList:[], //药品列表
				medicineTotalPrice:0,  //药品总价,
				checkList:[],   //检查项目列表
				checkTotalPrice:0, //检查项目总价
				patientId:{}  //患者ID
			}
		},
		methods:{
			//初始化历史预约列表
			initMessage(){
				this.loading=true;
				//获取当前患者ID
				this.patientId=window.localStorage.getItem("patientId");
				console.log("这是患者ID")
				console.log(this.patientId);
				//获取所有历史预约信息
				this.instance.showHistory({
					patientId:this.patientId
				}).then((res) =>{
					this.regHistoryList=res.data.datas;
					//设置遮罩时间
					setTimeout(() => {
						this.loading = false;
					}, 50)
				})
			},
			showRegDetail(item){
				this.isShowDetail = true;
				//获取历史预约详情
				this.instance.historyDetail({
					idRelationId:item
				}).then((res) =>{
					console.log("点击了哪一个单号");
					this.regDetail=res.data.datas;
					console.log("这是预约详情");
					console.log(this.regDetail);
				})
			},
			//查看处方单
			showMedicine(item){
				this.instance.showMedicine({
					prescriptionId:item
				}).then((res) =>{
					if(res.data.datas!=null){
						this.isShowPre = true;
						this.prescription=res.data.datas;
						console.log("处方单号");
					}else{
						this.$message({
						  message: "无处方单！",
						  type:'success',
						  duration:500,
						  center:true
						});
					}
				});
				//历史处方单药品列表
				this.instance.showHistoryMedicine({
					prescriptionId:item
				}).then((res) =>{
					console.log("这是历史药品列表");
					console.log(res.data.datas);
					this.medicineList=res.data.datas;
					if(this.medicineList != null){
						this.medicineTotalPrice=this.medicineList[0].totalPrice;
					}
					
				})
			},
			//查看检查单
			showCheck(item){
				this.isShowCheck=true;
				this.instance.showCheck({
					checklistId:item
				}).then((res) =>{
					if(res.data.datas!=null){
						this.isShowCheck=true;
						console.log("检查单号");
						console.log(res.data.datas);
						this.check=res.data.datas;
					}else{
						this.$message({
						  message: "无检查单！",
						  type:'success',
						  duration:500,
						  center:true
						});
					}
				});
				//历史检查单检查项目
				this.instance.showHistoryCheck({
					checklistId:item
				}).then((res) =>{
					console.log("这是历史检查项目列表");
					console.log(res.data.datas);
					this.checkList=res.data.datas;
					if(this.checkList != null ){
						this.checkTotalPrice=this.checkList[0].totalPrice;
					}
					
				})
			},
			//处方单每行药的状态
			sta_medicine(data) {
				if (data == 0) {
					return "未使用"
				} else if (data == 1) {
					return "已使用"
				}  else if (data == 2) {
					return "申请退款处理中"
				} else if (data == 3) {
					return "已退费"
				}
			},
			//检查单每行检查项目的状态
			sta_checkitem(data) {
				if (data == 0) {
					return "未检查"
				} else if (data == 1) {
					return "申请退款处理中"
				} else if (data == 2) {
					return "已检查"
				} else if (data == 3) {
					return "已退费"
				}
			},
			//根据不同状态以不同颜色显示出来
			color(data){
				if (data == 0) {
					return "primary"
				} else if (data == 1) {
					return "warning"
				} else if (data == 2) {
					return "info"
				}else{
					return "danger"
				}
			}
		},
		mounted(){
			this.$nextTick(() =>{
				//页面初始化执行
				this.initMessage();
			})
		}
	}
</script>

<style>
	.events {
		text-align: center;
		margin: auto;
		height: 100%;
	}

	h2 {
		color: gray;
	}
</style>