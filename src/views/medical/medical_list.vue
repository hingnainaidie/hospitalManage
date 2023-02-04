<template>
	<div style="margin-top: 15px;">
		<el-input placeholder="请输入患者身份证号" v-model="input" >
		<template slot="append">
			<el-button @click="getData" style="width: 100% margin-top: 20px;">查询患者领药单</el-button>	
		</template>
		</el-input>
		
		<el-table :data="tableData1" style="width: 100% margin-top: 20px;">
			<el-table-column prop="patientName" label="姓名" width="150">
			</el-table-column>
			<el-table-column prop="patientIdentify" label="身份证号" width="200">
			</el-table-column>
			<el-table-column prop="prescriptionId" label="领药单序号" width="150">
			</el-table-column>
			<el-table-column prop="prescriptionTime" label="领药单时间" width="200">
			</el-table-column>
		
			<el-table-column prop="prestate" label="领药状态" >
			</el-table-column>
			<el-table-column   >
			    <template slot-scope="scope">
			        <el-button :type="'primary'" @click="judgeURL(scope.$index,scope.row)" >查看详情</el-button>
			    </template>
			</el-table-column>
		
		</el-table>
		<el-tag style="width: 100% margin-top: 40px;">所有未完成领药单信息</el-tag> 
		
		<el-table :data="tableData" style="width: 100% margin-top: 20px;">
			<el-table-column prop="patientName" label="姓名" width="150">
			</el-table-column>
			<el-table-column prop="patientIdentify" label="身份证号" width="200">
			</el-table-column>
			<el-table-column prop="prescriptionId" label="领药单序号" width="150">
			</el-table-column>
			<el-table-column prop="prescriptionTime" label="领药单时间" width="200">
			</el-table-column>
		
			<el-table-column prop="prestate" label="领药状态" >
			</el-table-column>
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
				         // {idType:0,idTypeName:"未缴费"},
				          {idType:1,idTypeName:"等待配药"},
				          {idType:2,idTypeName:"正在配药"},
				          {idType:3,idTypeName:"正在发药"},
				         // {idType:4,idTypeName:"已结束"}
				      ],
			}
		},
		
		methods: {
			getData() {
				this.instance.searchPatipres({
					patientIdentify: this.input,
				}).then(res => {
					this.tableData1=[]
					for (var i = 0; i < res.data.datas.data.length; i++){
							console.log(res.data.datas.data.length);
					        var item = res.data.datas.data[i];
							console.log(item);
							for (var j = 0; j < this.idTypeList.length; j++){
								var item1 = this.idTypeList[j];
								console.log(item.prestate);
								console.log(item1.idType);
								if (item.prestate == item1.idType) {
									item.prestate = item1.idTypeName;
									this.tableData1.push(item);
									break;
								}
							}
					        
					}
				})
				
			},
			showData(){
				this.instance.getPatipresAll(
				).then(res=>{
					this.tableData=[]
					for (var i = 0; i < res.data.datas.data.length; i++){
							console.log(res.data.datas.data.length);
					        var item = res.data.datas.data[i];
							console.log(item);
							for (var j = 0; j < this.idTypeList.length; j++){
								var item1 = this.idTypeList[j];
								console.log(item.prestate);
								console.log(item1.idType);
								if (item.prestate == item1.idType) {
									item.prestate = item1.idTypeName;
									this.tableData.push(item);
									break;
								}
							}
					        
					}
				})
			},
			judgeURL (index,row) {
				console.log(index)
				console.log(row.prescriptionId)
			    //BBB 是在路由中定义的name
			    this.$router.push({path: 'medical_details',query:{prescriptionId:row.prescriptionId}})
			}

		},
		created() {
			this.showData()
		}
	}
</script>

<style scoped>
</style>
