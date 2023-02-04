<template>
<div>
	<el-table :data="tableData" style="width: 100%" >
		<el-table-column prop="patientName" label="姓名" width="150">
		</el-table-column>
		<el-table-column prop="patientIdentify" label="身份证号" width="180">
		</el-table-column>
		<el-table-column prop="prescriptionTime" label="时间" width="180">
		</el-table-column>
		<el-table-column prop="citemId" label="检查项编号" width="100">
		</el-table-column>
		<el-table-column prop="citemName" label="名称" width="100">
		</el-table-column>
		<el-table-column prop="citemPart" label="部位" width="100">
		</el-table-column>
		<el-table-column prop="pricePer" label="单价" width="50">
		</el-table-column>
		<el-table-column prop="citemstate" label="检查项状态" width="150">
		</el-table-column>
	
		<el-table-column   >
		    <template slot-scope="scope">
		        <el-button :type="'primary'" @click="judgeURL(scope.$index,scope.row)" >修改状态</el-button>
		    </template>
		</el-table-column>
	
	</el-table>
	<el-tag style="width: 100% ;margin-top: 50px;">检查单状态</el-tag> 
	<el-steps :active="statecode" align-center style="margin-top: 50px;">
	  <el-step title="未缴费" ></el-step>
	  <el-step title="已缴费" ></el-step>
	  <el-step title="完成" ></el-step>
	</el-steps>
	<div style="margin-top: 50px;margin-left: 500px;">
		<el-select v-model="value"placeholder="修改检查单状态">
		    <el-option @click.native="updateState"
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value"
			  >
		    </el-option>
		  </el-select>
	</div>
	<div style="margin-left: 530px;margin-top: 20px;">
		<el-button :type="'danger'" @click="showData">确定</el-button>
		<el-button  @click="returnlast">返回</el-button>
	</div>
	
</div>
</template>

<script>
import check_mng from "./check_mng.vue";
export default {
	  data(){
	    return{
			value:'',
			prescriptionId:'',
			tableData:[],
			idTypeList: [
			          {idType:0,idTypeName:"未缴费"},
			          {idType:1,idTypeName:"已缴费"},
			          {idType:2,idTypeName:"完成"}
			      ],
			meidTypeList:[
				{idType:0,idTypeName:"未检查"},
				{idType:2,idTypeName:"已检查"},
				{idType:3,idTypeName:"已退费"}
			],
			options: [{
			          value: 1,
			          label: '未缴费'
			        }, {
			          value: 2,
			          label: '已缴费'
			        }, {
			          value: 3,
			          label: '完成'
			        }],
	    }
	  },
	  methods: {
		  showData(){
			console.log(this.clistId)
		  	this.instance.getCheckDetails({clistId:this.clistId}).then(res=>{
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
		  },
		  updateState(){
			  this.statecode=this.value;
			  console.log(this.prescriptionId)
				this.instance.updateclistState({clistId:this.clistId,cliststate:this.value-1,prescriptionId:this.prescriptionId}).then(
				res=>{})
		  },
		  judgeURL (index,row) {
				console.log(index)
				console.log(row.itemListId)
				var temp;
				for(var k=0;k < this.meidTypeList.length; k++){
					var item2 = this.meidTypeList[k];
					//console.log(item.state);
					//console.log(item2.idType);
					if (row.citemstate == item2.idTypeName){
						temp=item2.idType;
						break;
					}
				}
			    //BBB 是在路由中定义的name
			    this.$router.push({path: 'checkitem_update',query:{itemListId:row.itemListId,citemstate:temp,clistId:row.clistId}})
			},
			returnlast(){
				this.$router.go(-1)
			}
		  
	  },
	  created() {
	  	this.clistId=this.$route.query.clistId;
		console.log(this.clistId);
		this.showData()
	  },
	  
	}
</script>
<style>
</style>
