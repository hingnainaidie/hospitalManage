<template>
	<div style="margin-top: 15px;">
		
			<el-input placeholder="请输入领药单编号" v-model="input" >
			<template slot="append">
			<el-button type="primary" @click="showData()" id="submit" ref="import">查询领药单</el-button>
			</template>
			</el-input>
		
			
		<el-table :data="tableData" style="width: 100%" >
			<el-table-column prop="patientName" label="姓名" width="150">
			</el-table-column>
			<el-table-column prop="patientIdentify" label="身份证号" width="200">
			</el-table-column>
			<el-table-column prop="prescriptionId" label="领药单编号" width="150">
			</el-table-column>
			<el-table-column prop="medicineId" label="药品编号" width="150">
			</el-table-column>
			<el-table-column prop="medicineName" label="药品名称" width="150">
			</el-table-column>
			<el-table-column prop="amount" label="数量" width="50">
			</el-table-column>
			<el-table-column prop="pricePer" label="单价" width="50">
			</el-table-column>
			<el-table-column prop="state" label="药品状态" width="150">
			</el-table-column>
			<el-table-column   >
				<template slot-scope="scope">
					<el-button :type="'danger'" @click="returnMedicinee(scope.$index,scope.row);moneycnt(scope.$index,scope.row);refreshbtn" >退药退费
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-tag style="width: 100% margin-top: 100px;">待处理退费请求</el-tag> >
		</el-button>
		<el-table :data="tableData1" style="width: 100%" >
			<el-table-column prop="patientName" label="姓名" width="150">
			</el-table-column>
			<el-table-column prop="patientIdentify" label="身份证号" width="200">
			</el-table-column>
			<el-table-column prop="prescriptionId" label="领药单编号" width="150">
			</el-table-column>
			<el-table-column prop="medicineId" label="药品编号" width="150">
			</el-table-column>
			<el-table-column prop="medicineName" label="名称" width="150">
			</el-table-column>
			<el-table-column prop="amount" label="数量" width="50">
			</el-table-column>
			<el-table-column prop="pricePer" label="单价" width="50">
			</el-table-column>
			<el-table-column prop="state" label="药品状态" width="150">
			</el-table-column>
			<el-table-column   >
				<template slot-scope="scope">
					<el-button :type="'danger'" @click="returnMedicine(scope.$index,scope.row);" >同意退费
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
				tableData1:[],
				idTypeList: [
				          {idType:0,idTypeName:"未缴费"},
				          {idType:1,idTypeName:"等待配药"},
				          {idType:2,idTypeName:"正在配药"},
				          {idType:3,idTypeName:"正在发药"},
				          {idType:4,idTypeName:"已取走"}
				      ],
					  meidTypeList:[
					  	{idType:0,idTypeName:"未取走"},
					  	{idType:1,idTypeName:"已取走"},
					  	{idType:2,idTypeName:"申请退款处理中"},
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
				this.instance.getMediDetails({prescriptionId:this.input}).then(res=>{
							this.tableData=[]
							this.statecode = res.data.datas.data[0].prestate+1;
							for (var i = 0; i < res.data.datas.data.length; i++){
							        var item = res.data.datas.data[i];
									for (var j = 0; j < this.idTypeList.length; j++){
										var item1 = this.idTypeList[j];
										//console.log(item.prestate);
										//console.log(item1.idType);
										if (item.prestate == item1.idType) {
											item.prestate = item1.idTypeName;
											for(var k=0;k < this.meidTypeList.length; k++){
												var item2 = this.meidTypeList[k];
												//console.log(item.state);
												//console.log(item2.idType);
												if (item.state == item2.idType){
													item.state=item2.idTypeName;
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
			returnMedicinee(index,row){
				console.log(index)
				console.log(row.connectId)
				//console.log(row.value)
				//console.log(row.amount)
				this.instance.returnMedicine({connectId:row.connectId,prescriptionId:row.prescriptionId}).then(res=>{
				this.tableData[index].state="已退费";
					
				});
				
				//this.$refs.import.$el.click()
				//document.getElementById('submit').click();
			},
			returnMedicine(index,row){
				console.log(index)
				console.log(row.connectId)
				//console.log(row.value)
				//console.log(row.amount)
				this.instance.returnMedicine({connectId:row.connectId,prescriptionId:row.prescriptionId}).then(res=>{})
				this.$router.go()
			},
			showreturn(){
				
				this.instance.showreturnSys().then(res=>{
							this.tableData1=[]
							this.statecode = res.data.datas.data[0].prestate+1;
							for (var i = 0; i < res.data.datas.data.length; i++){
							        var item = res.data.datas.data[i];
									for (var j = 0; j < this.idTypeList.length; j++){
										var item1 = this.idTypeList[j];
										//console.log(item.prestate);
										//console.log(item1.idType);
										if (item.prestate == item1.idType) {
											item.prestate = item1.idTypeName;
											for(var k=0;k < this.meidTypeList.length; k++){
												var item2 = this.meidTypeList[k];
												console.log(item.state);
												console.log(item2.idType);
												if (item.state == item2.idType){
													item.state=item2.idTypeName;
													this.tableData1.push(item);
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
			moneycnt(index,row){
				//console.log(index)
				//console.log(row.pricePer)
			},
			refreshbtn() {
			      this.$router.go()
			    }
	
		},
		created() {
			this.showreturn()
		}
	}
</script>

<style>
</style>