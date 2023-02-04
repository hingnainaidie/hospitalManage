<template>
	<div style="margin-top: 15px;">
		<el-input placeholder="请输入检查单编号" v-model="input" >
		<template slot="append">
			<el-button @click="showData">查询患者检查单</el-button>	
		</template>	
		</el-input>
		
		<el-table :data="tableData" style="width: 100%" >
			<el-table-column prop="patientName" label="姓名" width="100">
			</el-table-column>
			<el-table-column prop="patientIdentify" label="身份证号" width="200">
			</el-table-column>
			<el-table-column prop="clistId" label="检查单编号" width="150">
			</el-table-column>
			<el-table-column prop="prescriptionTime" label="时间" width="200">
			</el-table-column>
			<el-table-column prop="citemId" label="检查项编号" width="100">
			</el-table-column>
			<el-table-column prop="citemName" label="名称" width="100">
			</el-table-column>
			<el-table-column prop="citemPart" label="部位" width="50">
			</el-table-column>
			<el-table-column prop="pricePer" label="单价" width="50">
			</el-table-column>
			<el-table-column prop="citemstate" label="检查项状态" width="150">
			</el-table-column>
			<el-table-column   >
				<template slot-scope="scope">
					<el-button :type="'danger'" @click="returnCheck(scope.$index,scope.row);moneycnt(scope.$index,scope.row)" >退检查项退费
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				medis: '',
				input:'',
				tableData: [],
				idTypeList: [
				          {idType:0,idTypeName:"未缴费"},
				          {idType:1,idTypeName:"已缴费"},
				          {idType:2,idTypeName:"检查完成"}
				      ],
					  meidTypeList:[
					  	{idType:0,idTypeName:"未检查"},
					  	//{idType:1,idTypeName:"已检查"},
					  	{idType:3,idTypeName:"已退费"}
					  ],
					  options: [{
					            value: 1,
					            label: '是'
					          }, {
					            value: 2,
					            label: '否'
					          }],
			}
		},
		
		methods: {
			showData(){
				this.instance.getCheckDetails({clistId:this.input}).then(res=>{
					this.tableData=[]
					this.statecode = res.data.datas.data[0].cliststate+1;
					for (var i = 0; i < res.data.datas.data.length; i++){
					        var item = res.data.datas.data[i];
							for (var j = 0; j < this.idTypeList.length; j++){
								var item1 = this.idTypeList[j];
								//console.log(item.prestate);
								//console.log(item1.idType);
								if (item.cliststate == item1.idType) {
									item.cliststate = item1.idTypeName;
									for(var k=0;k < this.meidTypeList.length; k++){
										var item2 = this.meidTypeList[k];
										//console.log(item.state);
										//console.log(item2.idType);
										if (item.citemstate == item2.idType){
											item.citemstate=item2.idTypeName;
											this.tableData.push(item);
											break;
										}
									}
									break;
								}
							}
					      }
				})
				console.log(this.tableData);
			},
			returnCheck(index,row){
				console.log(index)
				console.log(row.itemListId)
				
				this.instance.returnCheck({itemListId:row.itemListId,clistId:this.input}).then(res=>{})
				this.tableData[index].citemstate="已退费";
			},
			moneycnt(index,row){
				console.log(index)
				console.log(row.pricePer)
			}
	
		}
	}
</script>

<style>
</style>