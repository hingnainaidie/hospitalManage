<template>
  <div class="events">
      <h2>今日处方单和检查单</h2>
	  <h3>{{this.nowTime}}</h3>
	  <div class="process" v-show="isShowProcess">
		  <el-steps :space="220" finish-status="success" align-center :active="medicineProcess">
		    <el-step title="未缴费"></el-step>
		    <el-step title="待配药"></el-step>
		    <el-step title="配药中"></el-step>
			<el-step title="配药完成"></el-step>
			<el-step title="已取走"></el-step>
		  </el-steps>
	  </div>
    <el-col>
      <el-row >
		  <el-table height="250" v-loading="loading" element-loading-text="拼命加载中" border
		  	element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
		  	:data="medicineList" stripe style="width: 100%" >
			<el-table-column width="50px;" align="center" prop="prescriptionId" label="处方单号" ></el-table-column>
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
		  	<el-table-column label="操作" align="center" width="100px">
		  		<template slot-scope="scope">
		  			<el-button size="mini" type="warning" :disabled="(scope.row.state >= 2)" @click="medicineDelete(scope.row)">退药退费</el-button>
		  		</template>
		  	</el-table-column>
		  </el-table>
	  </el-row>
      <el-row  >
		  <el-table height="250" v-loading="loading" element-loading-text="拼命加载中" border
		  	element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
		  	:data="checkList" stripe style="width: 100%" >
			<el-table-column width="50px;" align="center" prop="checklistId" label="检查单号" ></el-table-column>
		  	<el-table-column width="150px;" align="center" prop="checkitemName" label="检查项目" ></el-table-column>
		  	<el-table-column min-width="80px;" align="center" prop="checkPart" label="检查部位" ></el-table-column>
		  	<el-table-column min-width="80px;" align="center" prop="officeName" label="检查科室" ></el-table-column>
		  	<el-table-column min-width="80px;" align="center" prop="checkitemPrice" label="检查价格" ></el-table-column>
		  	<el-table-column min-width="150px;" align="center" prop="checkitemNote" label="注意事项" ></el-table-column>
		  	<el-table-column min-width="90px;" align="center" prop="state" label="检查状态">
				<template slot-scope="scope">
					<el-tag :type="color(scope.row.state)">{{sta_checkitem(scope.row.state)}}</el-tag>
				</template>
			</el-table-column>
		  	<el-table-column label="操作" align="center" width="100px">
		  		<template slot-scope="scope">
		  			<el-button size="mini" type="warning" :disabled="(scope.row.state >=1)" @click="checkitemDelete(scope.row)">取消检查</el-button>
		  		</template>
		  	</el-table-column>
		  </el-table>
	  </el-row>
    </el-col>
    <el-divider></el-divider>
  </div>
</template>

<script>
	export default{
		name:"patient_refund",
		data(){
			return{
				medicineList:[], //药品列表
				checkList:[],   //检查项目列表
				patientId:{}  ,//患者ID
				medicineProcess:0, //配药步骤
				loading:true,
				nowTime:{}, //当前日期：年月日
				isShowProcess:false //是否显示配药进度条
				
				
			}
		},
		methods:{
			//初始化列表
			initMessage(){
				this.loading=true;
				this.getNowDate(); //获取当前日期
				console.log("当前日期："+this.nowTime);
				//获取当前患者ID
				this.patientId=window.localStorage.getItem("patientId");
				//获取一个处方所有药品    //时间限制后面再加
				this.instance.showPaidMedicine({patientId:this.patientId}).then((res) =>{
					this.medicineList=res.data.datas;
					if(this.medicineList.length>0){
						this.isShowProcess=true;
						this.medicineProcess=this.medicineList[0].prescriptionStatement+1;
						this.regId=this.medicineList[0].regId;
						console.log("配药状态");
						console.log(this.medicineProcess);
					}
					
					//设置遮罩时间
					setTimeout(() => {
						this.loading = false;
					}, 50)
				})
				//获取一个处方所有检查项目
				this.instance.showPaidCheck({patientId:this.patientId}).then((res) =>{
					this.checkList=res.data.datas;
					//设置遮罩时间
					setTimeout(() => {
						this.loading = false;
					}, 50)
				})	
			},
			//查询当前日期：年月日
			getNowDate() {
			  const timeOne = new Date()
			  const year = timeOne.getFullYear()
			  let month = timeOne.getMonth() + 1
			  let day = timeOne.getDate()
			  month = month < 10 ? '0' + month : month
			  day = day < 10 ? '0' + day : day
			  this.nowTime = `${year}-${month}-${day}`
			},
			medicineDelete(item){
				console.log("取消取消药品！！！");
				console.log(item);
				this.instance.cancelMedicine({
					medicineId:item.medicineId,
					prescriptionId:item.prescriptionId,
					prescriptionStatement:item.prescriptionStatement
				}).then((res) =>{
					console.log("药品状态："+item.state);
					this.$message({
					  message: "成功提交取消申请！",
					  type:'success',
					  duration:500,
					  center:true
					});
					//刷新页面
					this.initMessage();
				})
			},
			checkitemDelete(item){
				console.log("取消检查项目");
				this.instance.cancelCheck({
					checkitemId:item.checkitemId,
					checklistId:item.checklistId
				}).then((res) =>{
					this.$message({
					  message: "已退费！",
					  type:'success',
					  duration:500,
					  center:true
					});
					this.initMessage();
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

<style scoped>
	.events {
		text-align: center;
		margin: auto;
		height: 100%;
		width: 100%;
		min-width: 700px;
	}
	.process{
		margin-top: 50;
		height: 300;
		text-align: center;
	}
    .lightgreen-box {
      background-color:white;
      height: 100px;
	  margin: 0 auto;
    }
    .orange-box {
      background-color: orange;
      height: 150px;
    }
</style>

