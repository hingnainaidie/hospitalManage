<template>
	<div style="margin-top: 15px;">
		<el-input placeholder="请输入患者身份证号" v-model="input" >
		<template slot="append">
			<el-button @click="getData" style="width: 100% margin-top: 20px;">查询患者检查单</el-button>	
		</template>	
		</el-input>
		
		<el-table :data="tableData1" style="width: 100% margin-top: 20px;">
			<el-table-column prop="patientName" label="姓名" width="150">
			</el-table-column>
			<el-table-column prop="patientIdentify" label="身份证号" width="300">
			</el-table-column>
			<el-table-column prop="clistId" label="检查单编号" width="200">
			</el-table-column>
			<el-table-column prop="prescriptionTime" label="检查单时间" width="300">
			</el-table-column>
		
			<el-table-column prop="cliststate" label="检查状态" >
			</el-table-column>
			<el-table-column   >
			    <template slot-scope="scope">
			        <el-button :type="'primary'" @click="judgeURL(scope.$index,scope.row)" >查看详情</el-button>
			    </template>
			</el-table-column>
		
		</el-table>
		<el-tag style="width: 100% margin-top: 40px;">所有未完成检查单信息</el-tag> 
		
		<el-table :data="tableData"  style="width: 100% margin-top: 20px;">
			<el-table-column prop="patientName" label="姓名" width="150">
			</el-table-column>
			<el-table-column prop="patientIdentify" label="身份证号" width="250">
			</el-table-column>
			<el-table-column prop="clistId" label="检查单编号" width="100">
			</el-table-column>
			<el-table-column prop="prescriptionTime" label="检查单时间" width="250">
			</el-table-column>
			<el-table-column prop='cliststate' label='缴费状态' width="150" align="center">
				<template slot-scope="scope">
					<el-tag >{{turnFunc(scope.row.cliststate)}}</el-tag>
				</template>
			</el-table-column>	
			<!-- <el-table-column prop="cliststate" label="检查状态" > -->
			<!-- </el-table-column> -->
			<el-table-column   >
			    <template slot-scope="scope">
			        <el-button :type="'primary'" @click="judgeURL(scope.$index,scope.row)" >查看详情</el-button>
			    </template>
			</el-table-column>
		
		</el-table>
		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				input: '',
				tableData1:[],
				tableData: [],
				idTypeList: [
				          {idType:1,idTypeName:"已缴费"}
				      ],
			}
		},
		
		methods: {
			getData() {
				this.instance.searchPaticheck({
					patientIdentify: this.input,
				}).then(res => {
					this.tableData1=[]
					for (var i = 0; i < res.data.datas.data.length; i++){
							console.log(res.data.datas.data.length);
					        var item = res.data.datas.data[i];
							
							console.log(item);
							for (var j = 0; j < this.idTypeList.length; j++){
								var item1 = this.idTypeList[j];
								
								console.log(+item.prestate);
								console.log(item1.idType);
								if (item.cliststate == item1.idType) {
									item.cliststate = item1.idTypeName;
									this.tableData1.push(item);
									break;
								}
							}
					        
					}
				})
				
			},
			
			turnFunc(data){
				if(data == 1){
					return "已缴费";
				}
			},
			
			showData(){
				this.instance.getPaticheckAll(
				).then(res=>{
					this.tableData=res.data.datas.data;
					
					// for (var i = 0; i < res.data.datas.data.length; i++){
					// 		console.log(res.data.datas.data.length);
					//         var item = res.data.datas.data[i];
					// 		console.log("111咯咯咯咯");
					// 		console.log(item);
					// 		for (var j = 0; j < this.idTypeList.length; j++){
					// 			var item1 = this.idTypeList[j];
					// 			console.log("状态");
					// 			console.log(item.cliststate);
					// 			console.log(item1.idType);
					// 			if (item.cliststate == item1.idType) {
					// 				item.cliststate = item1.idTypeName;
					// 				this.tableData.push(item);
					// 				break;
					// 			}
					// 		}
					        
					// }
				})
			},
			judgeURL (index,row) {
				console.log(index)
				console.log(row.clistId)
			    //BBB 是在路由中定义的name
			    this.$router.push({path: 'check_details',query:{clistId:row.clistId}})
			}

		},
		created() {
			this.showData()
		}
	}
</script>

<style scoped>
</style>
