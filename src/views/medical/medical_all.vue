<template>
	<div style="margin-top: 15px;">
		<el-table :data="tableData" style="width: 100%" >
		<el-table-column prop="medicineId" label="药品编号" width="200">
		</el-table-column>
		<el-table-column prop="medicineName" label="药品名称" width="400">
		</el-table-column>
		<el-table-column prop="specification" label="规格" width="400">
		</el-table-column>
		<el-table-column prop="pricePer" label="单价/元" width="200">
		</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		  data(){
		    return{
				tableData:[],
		    }
		  },
		  methods: {
			  showData(){
			  	this.instance.allMedicine().then(res=>{
					this.tableData=res.data.datas.medicineList;
			  	})
			  },
		  },
		  created() {
			this.showData()
		  },
	}
		  
</script>

<style>
</style>