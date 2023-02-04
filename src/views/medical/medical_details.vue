<template>
<div>
	<el-table :data="tableData" style="width: 100%" >
		<el-table-column prop="patientIdentify" label="身份证号" width="200">
		</el-table-column>
		<el-table-column prop="patientName" label="姓名" width="100">
		</el-table-column>
		<el-table-column prop="prescriptionId" label="领药单编号" width="100">
		</el-table-column>
		<el-table-column prop="prescriptionTime" label="领药单时间" width="200">
		</el-table-column>
		<el-table-column prop="medicineId" label="药品编号" width="100">
		</el-table-column>
		<el-table-column prop="medicineName" label="药品名称" width="150">
		</el-table-column>
		<el-table-column prop="amount" label="药品数量" width="50">
		</el-table-column>
		<el-table-column prop="pricePer" label="药品单价" width="50">
		</el-table-column>
		<el-table-column prop="state" label="状态" width="150">
		</el-table-column>
	
		<el-table-column prop="prestate" label="领药状态" >
		</el-table-column>
	
	</el-table>
	<el-steps :active="statecode" align-center style="margin-top: 150px;">
	  <el-step title="未缴费" ></el-step>
	  <el-step title="等待配药" ></el-step>
	  <el-step title="正在配药" ></el-step>
	  <el-step title="正在发药" ></el-step>
	  <el-step title="已结束" ></el-step>
	</el-steps>
	<div style="margin-top: 50px;margin-left: 500px;">
		<el-select v-model="value"placeholder="修改领药单状态">
		    <el-option @click.native="updateState"
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value"
			  >
		    </el-option>
		  </el-select>
	</div>
	<div style="margin-top: 30px;margin-left: 530px;">
		<el-button :type="'danger'" @click="showData">确定</el-button>
		<el-button  @click="returnlast">返回</el-button>
	</div>
	
</div>
</template>

<script>
import medical_mng from "./medical_mng.vue";
export default {
	  data(){
	    return{
			value:'',
			prescriptionId:'',
			tableData:[],
			idTypeList: [
			          {idType:0,idTypeName:"未缴费"},
			          {idType:1,idTypeName:"等待配药"},
			          {idType:2,idTypeName:"正在配药"},
			          {idType:3,idTypeName:"正在发药"},
			          {idType:4,idTypeName:"已结束"}
			      ],
			meidTypeList:[
				{idType:0,idTypeName:"未取走"},
				{idType:1,idTypeName:"已取走"},
				{idType:3,idTypeName:"已退费"}
			],
			options: [{
			          value: 1,
			          label: '未缴费'
			        }, {
			          value: 2,
			          label: '等待配药'
			        }, {
			          value: 3,
			          label: '正在配药'
			        }, {
			          value: 4,
			          label: '正在发药'
			        }, {
			          value: 5,
			          label: '已结束'
			        }],
	    }
	  },
	  methods: {
		  showData(){
		  	this.instance.getMediDetails({prescriptionId:this.prescriptionId}).then(res=>{
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
		  },
		  updateState(){
			  this.statecode=this.value;
			  console.log(this.prescriptionId)
				this.instance.updatepreState({prescriptionId:this.prescriptionId,prestate:this.value-1}).then(
				res=>{})
		  },
		  returnlast(){
		  	this.$router.go(-1)
		  }
		  
	  },
	  created() {
	  	this.prescriptionId=this.$route.query.prescriptionId;
		console.log(this.prescriptionId);
		this.showData()
	  },
	  
	}
</script>
<style>
</style>
