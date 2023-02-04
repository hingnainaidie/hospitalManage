<template>
	<div class="events">
		<el-row>
			<el-col :span="16">
				<div class="seq">
					<div class="seqState">
						排队状态：{{state}}
					</div>
					<div class="seqNum" v-show="showState">
						您有一个挂号正在排队：你的前方还有{{num-1}}人
					</div>
					<div class="button1" v-show="showState">
						<el-button @click="showUndoDetail(SeqDetail)">点击查看详情</el-button>
					</div>
				</div>
			</el-col>
			<el-col :span="8">
				<el-button icon="el-icon-circle-plus" style="margin-top: 40px;" @click="gotoNew()">添加新预约</el-button>
			</el-col>
		</el-row>
		<div>
			<el-table border :data='regUodoList' style='width: 100%; padding: auto;' v-loading="loading" element-loading-text="拼命加载中"
				element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
				<el-table-column prop='appointmentTime' label='预约时间' width="150" align="center"></el-table-column>
				<el-table-column prop='regTime' label='挂号时间' width="150" align="center"></el-table-column>
				<el-table-column prop='officeName' label='预约科室' width="150" align="center"></el-table-column>
				<el-table-column prop='docName' label='预约医生' min-width="150" align="center"></el-table-column>
				<el-table-column prop='state' label='缴费状态' width="150" align="center">
					<template slot-scope="scope">
						<el-tag :type="colorMonney(scope.row.state)">{{money_state(scope.row.state)}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop='state' label='就诊状态' width="150" align="center">
					<template slot-scope="scope">
						<el-tag :type="color(scope.row.state)">{{pre_state(scope.row.state)}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="120px">
					<template slot-scope="scope">
						<el-button size="mini" type="warning" @click="showUndoDetail(scope.row)">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			
			<!-- 未就诊预约详情查看 -->
			<el-dialog title="未就诊预约详情" :visible.sync="isShowDetail" :center='true' width="800px">
				<div>
					<el-descriptions class="margin-top" :column="1">
						<el-descriptions-item label="预约时间">{{regDetail.appointmentTime}}</el-descriptions-item>
						<el-descriptions-item label="预约科室">{{regDetail.officeName}}</el-descriptions-item>
						<el-descriptions-item label="预约医生">{{regDetail.docName}}</el-descriptions-item>
						<el-descriptions-item label="缴费状况" itemprop='state'>
								<el-tag :type="colorMonney(regDetail.state)">{{money_state(regDetail.state)}}</el-tag>
						</el-descriptions-item>
						<el-descriptions-item label="就诊状况" itemprop='state'>
								<el-tag :type="color(regDetail.state)">{{pre_state(regDetail.state)}}</el-tag>
						</el-descriptions-item>
					</el-descriptions>
					<textarea v-show="regDetail.state == 0 && isPayTimeOk == 0">只能在预约时间前20分钟进行缴费！！！</textarea>
				</div>
				<span :center='true'>
					
					<el-button size="mini" type="warning" v-show="regDetail.state == 0" :disabled="isPayTimeOk == 0" @click="payOrder(regDetail.regId)">缴挂号费</el-button>
					<el-button size="mini" type="warning" v-show="regDetail.state == 0" @click="cancelOrder(regDetail.regId)">取消挂号</el-button>
					<el-button size="mini" type="warning" v-show="regDetail.state == 4" @click="showMedicine(regDetail.prescriptionId)">查看处方单</el-button>
					<el-button size="mini" type="warning" v-show="regDetail.state == 4" @click="showCheck(regDetail.checklistId)">查看检查单</el-button>
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
						</el-table>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="payMedicine(prescription.prescriptionId)" type="warning" :disabled="prescription.prescriptionStatement != 0">支付处方单</el-button>
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
						</el-table>
						<span slot="footer" class="dialog-footer" >
							<el-button @click="payCheck(check.checklistId)" type="warning" :disabled="check.checklistStatus!=0">支付检查单</el-button>
							<el-button @click="isShowCheck = false">返回</el-button>
						</span>
					</div>
			</el-dialog> 
		</div>
	</div>
	
</template>

<script>
	export default{
		name:"patient_reg",
		data(){
			return{
				regUodoList:[],  //未完成预约列表
				loading:true,
				isShowDetail:false,
				isShowPre:false,
				isShowCheck:false,
				isPayTimeOk:false,  //是否已经到时间可以进行挂号单缴费【只能提前二十分钟缴费】
				curTime:{},  //当前时间
				prescription:{},//处方单
				check:{},  //检查单
				medicineList:[], //药品列表
				medicineTotalPrice:0,  //药品总价,
				checkList:[],   //检查项目列表
				checkTotalPrice:0, //检查项目总价
				regDetail:{}, //预约详情
				patientId:{}  ,//患者ID
				state:"没有正在挂号的排队",
				num:0,
				showState:false,
				SeqDetail:{
					state:2,
					regId:0
				}
			}
		},
		methods:{
			gotoNew(){
				this.$router.push("/app/patient_mng/new_reg")
			},
			getSeqNum(){
			  this.instance.checkQueInfo({
			    patientId:window.localStorage.getItem("patientId")
			  }).then(res => {
			    this.num=res.data.datas.queue_number;
				this.SeqDetail.regId=res.data.datas.reg_id;
				if(this.num==0){
					this.showState=false;
					this.state="没有正在挂号的排队"
				}
				else{
					this.showState=true;
					this.state="正在排队"
				}
			  })
			},
			//初始化预警消息列表
			initMessage(){
				this.loading=true;
				//获取当前患者ID
				this.patientId=window.localStorage.getItem("patientId");
				console.log("这是患者ID")
				console.log(this.patientId);
				//获取所有未完成【状态小于5】预约信息
				this.instance.showUndoList({
					patientId:this.patientId
				}).then((res) =>{
					this.regUodoList=res.data.datas;
					//设置遮罩时间
					setTimeout(() => {
						this.loading = false;
					}, 50)
				});
				this.getSeqNum();
			},
			//获取当前具体时间[精确到时分秒]
			getNowDate() {
			  const timeOne = new Date()
			  const year = timeOne.getFullYear()
			  let month = timeOne.getMonth() + 1
			  let day = timeOne.getDate()
			  month = month < 10 ? '0' + month : month
			  day = day < 10 ? '0' + day : day
			  let hh = new Date().getHours();
			  let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
			  let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
			  var nowTime = year+'-'+month+'-'+day+' '+hh+':'+mf+':'+ss;
			  console.log("当前具体时间："+nowTime);
			  return nowTime;
			},
			//计算时间差
			// 返回格式为xx天xx小时xx分钟
			calTime(faultDate, completeTime) {
			  var stime = Date.parse(new Date(faultDate));
			  var etime = Date.parse(new Date(completeTime));
			  // 两个时间戳相差的毫秒数
			  var usedTime = etime - stime;
			  // 计算相差的天数  
			  var days = Math.floor(usedTime / (24 * 3600 * 1000));
			  // 计算天数后剩余的毫秒数
			  var leave1 = usedTime % (24 * 3600 * 1000);  
			  // 计算出小时数  
			  var hours = Math.floor(leave1 / (3600 * 1000));
			  // 计算小时数后剩余的毫秒数
			  var leave2 = leave1 % (3600 * 1000);        
			  // 计算相差分钟数
			  var minutes = Math.floor(leave2 / (60 * 1000));
			  var time = days + "天" + hours + "时" + minutes + "分";
			  console.log("计算时间差："+time);
			  return time;
			 },
			showUndoDetail(item){
				//获取历史预约详情
				if(item.state < 4){  //就诊之前的详情
					this.instance.showUndoDetail({
						regId:item.regId
					}).then((res) =>{
						this.isShowDetail = true;
						console.log("点击了哪一个单号");
						this.regDetail=res.data.datas;
				//计算时间差，看是否能够缴费【只能提前20分钟缴费】
						this.curTime=this.getNowDate();
						console.log("获取到的当前时间："+this.curTime);
						//var timeCha=this.calTime(this.curTime,"2023-01-05 11:00:00");
						var timeCha=(this.calTime(this.curTime,res.data.datas.appointmentTime));
						console.log("这是时间差："+timeCha);
						var zww_min=timeCha.substring(timeCha.indexOf("时")+1,timeCha.indexOf("分"));
						var zww_hour=timeCha.substring(timeCha.indexOf("天")+1,timeCha.indexOf("时"));
						var zww_day=timeCha[0];
						console.log("所差分钟数为："+zww_min + "   所差小时为："+zww_hour);
						console.log("所差天数为："+zww_day);
						var number_min=parseInt(zww_min);
						var number_hour=parseInt(zww_hour);
						var number_day=parseInt(zww_day);
						console.log("整数分钟数为："+zww_min + "   整数小时为："+zww_hour);
						if(number_min < 20 && number_hour == 0 && number_day==0){
							this.isPayTimeOk=1;
						}
						console.log("这是预约详情");
						console.log(this.regDetail);
					})
				}else if(item.state == 4){  //就诊中的详情
					this.instance.showUnpaidDetail({
						regId:item.regId
					}).then((res)=>{
						this.isShowDetail = true;
						console.log("点击了哪一个单号");
						this.regDetail=res.data.datas;
						console.log("这是预约详情");
						console.log(this.regDetail);
					})
					console.log("这是已就诊的");
				}
				
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
				this.instance.showUnpaidPre({
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
			//支付处方单
			payMedicine(item){
				this.instance.payMedicine({
					prescriptionId:item
				}).then((res) =>{
					this.isShowPre=false;
					console.log("支付此处方单");
					this.$message({
					  message: "支付成功！",
					  type:'success',
					  duration:500,
					  center:true
					});
				})
			},
			//查看检查单
			showCheck(item){
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
				this.instance.showUnpaidCheck({
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
			//支付处方单
			payCheck(item){
				this.instance.payCheck({
					checklistId:item
				}).then((res) =>{
					this.isShowCheck=false;
					console.log("支付此检查单");
					this.$message({
					  message: "支付成功！",
					  type:'success',
					  duration:500,
					  center:true
					});
				})
			},
			
			payOrder(item){
				this.instance.payOrder({
					regId:item
				}).then((res) =>{
					console.log("支付此挂号");
					this.isShowDetail=false;
					this.$message({
					  message: "支付成功！",
					  type:'success',
					  duration:500,
					  center:true
					});
					this.initMessage();
				})
			},
			cancelOrder(item){
				this.instance.cancelOrder({
					regId:item
				}).then((res) =>{
					this.isShowDetail=false;
					console.log("取消此挂号单");
					this.$message({
					  message: "取消预约！",
					  type:'success',
					  duration:500,
					  center:true
					});
					this.initMessage();
				})
			},
			//挂号单缴费状态
			money_state(data) {
				if (data == 0) {
					return "未缴费"
				} else{
					return "已缴费"
				}
			},
			//挂号单缴费状态
			pre_state(data) {
				if ( data <= 1 ) {
					return "未就诊"
				} else if ( data == 2){
					return "排队中"
				}else if ( data == 3){
					return "被挂起"
				}else if ( data == 4){
					return "就诊中"
				}else if ( data == 5){
					return "就诊完成"
				}
			},
			//缴费状态
			colorMonney(data){
				if (data == 0) {
					return "danger"
				}else{
					return"success"
				}
			},
			//就诊状态
			color(data){
				if (data <= 1) {
					return "warning"
				} else if (data == 2) {
					return "info"
				}else if( data == 3 ){
					return "danger"
				}else if( data == 4 ){
					return "success"
				}
			}
		},
		mounted(){
			this.$nextTick(() =>{
				//页面初始化执行
				this.initMessage();
			});
		}
	}
</script>

<style scoped>
	.seq{
		color: white;
		height: 100px;
		background-color:#545c64;
		padding: 20px;
		margin-right: 30px;
		border-radius: 10px;
		margin-bottom: 30px;
	}
	.seqState{
		height: 30px;
		margin-left: 30px;
	}
	.seqNum{
		height: 30px;
		margin-left: 30px;
	}
	.button1{
		width: 130px;
		float: right;
	}
</style>