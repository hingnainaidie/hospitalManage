<template>
	<div>
		<el-tag style="width: 100% ;margin-top: 10px;">检查项状态</el-tag>
		<el-steps :active="statecode" align-center style="margin-top: 80px;">
		  <el-step title="未检查" ></el-step>
		  <el-step title="已检查" ></el-step>
		  <el-step title="已退费" ></el-step>
		</el-steps>
		<div style="margin-top: 60px;margin-left: 500px;">
			<el-select v-model="value"placeholder="修改检查单状态">
			    <el-option @click.native="updatecitemState"
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value"
				  >
			    </el-option>
			  </el-select>
		</div>
		<div style="margin-left: 530px;margin-top: 30px;">
			<el-button :type="'danger'" @click="showData1">确定</el-button>
			<el-button  @click="returnlast">返回</el-button>
		</div>
	</div>
</template>

<script>
	import check_mng from "./check_mng.vue";
	export default {
		data(){
		  return{
			        statecode:this.$route.query.citemstate*1+1,
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
					          label: '未检查'
					        }, {
					          value: 3,
					          label: '已检查'
					        }, {
					          value: 4,
					          label: '已退费'
					        }],
		  }
		},
		methods: {
			showData(){
				var temp=this.citemstate*1+1;
				console.log(temp);
				this.statecode=temp;
			},
			showData1(){
				this.statecode=this.value
				console.log(this.statecode)
			},
			updatecitemState(){
	
				console.log(this.prescriptionId)
				this.instance.updatecitemState({itemListId:this.itemListId,citemstate:this.value-1,clistId:this.clistId}).then(
				res=>{})
			},
			returnlast(){
				this.$router.go(-1)
			}
		},
		created() {
			this.itemListId=this.$route.query.itemListId;
			this.citemstate=this.$route.query.citemstate;
			this.clistId=this.$route.query.clistId
			console.log(this.citemstate);
			console.log(this.statecode)
			//this.showData()
		},
	}
</script>

<style>

</style>