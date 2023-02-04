<template>
	<div style="margin-top: 15px;">
		<el-table :data="tableData" style="width: 100%" >
		<el-table-column prop="checkitemId" label="检查项编号" width="150">
		</el-table-column>
		<el-table-column prop="checkitemName" label="检查项名称" width="300">
		</el-table-column>
		<el-table-column prop="checkPart" label="检查部位" width="300">
		</el-table-column>
		<el-table-column prop="checkitemPrice" label="单价/元" width="200">
		</el-table-column>
		<el-table-column prop="checkitemNote" label="备注" width="200">
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
			  	this.instance.allCheckitem().then(res=>{
					this.tableData=res.data.datas.checkitemList;
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