<template>
	<div class='top'>
		<el-row style="text-align: center;" >
		  <el-col :span="10" >
			<el-input v-model="patientIdentify" clearable placeholder="身份证号"></el-input>
		  </el-col>
		  <el-col :span="2" >
			<el-button icon="el-icon-search" 
			style="text-align: right;" circle
			@click="Click1()"></el-button>
		  </el-col>
		</el-row>
		<el-table
		    :data="tableData"
		    style="width: 100%">
		    <el-table-column
		      label="挂号时间"
		      prop="regTime">
		    </el-table-column>
			<el-table-column
			  label="挂号ID"
			  prop="regId">
			</el-table-column>
			<el-table-column
			  label="预约时间"
			  prop="appointmentTime">
			</el-table-column>
		    <el-table-column
		      label="预约医生"
		      prop="docName">
		    </el-table-column>
		    <el-table-column
		      align="right">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          type="danger"
		          @click="Click2(scope.$index, scope.row)">解挂</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
	</div>
</template>


<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
	import{searchRegister} from '@/api/index.js';
	import{unhook} from '@/api/index.js';
  export default {
    data() {
      return {
        tableData: [
			// {
			// 	patientName:'胡图图',
			// 	department:'眼科',
			// 	date:'2021.1.1',
			// 	docName:'牛爷爷',
			// }
		],
        patientIdentify: ''
      }
    },
    methods: {
      handleDelete(index, row) {
        console.log(index, row);
      },
	  Click1()
	  {
		  this.instance.searchRegister({
		  patientIdentify:this.patientIdentify,
		  	}).then(res => {
		  		if(res != -1 && res.data.code == 666){
		  			  this.tableData = res.data.datas.docRegList;
		  			  //console.log(this.tableData);
		  		}else if(res.data.code == 700){
		  				this.$message({
		  					type: 'error',
		  					message: res.data.message
		  				  });
		  			}
		  	})
	  },
	  Click2(index, row)
	  {
		  console.log(index);
		  console.log(this.tableData[index].regId);
		  this.instance.unhook({
		  regId:this.tableData[index].regId,
		  	}).then(res => {
		  		if(res != -1 && res.data.code == 666){
		  			  this.$message({
		  			  	type: 'success',
		  			  	message: '解挂成功!',
		  			  	duration:500,
		  			  	center:true
		  			    });
						 this.$router.push({name:'reception_unhook'});
		  		}else if(res.data.code == 700){
		  				this.$message({
		  					type: 'error',
		  					message: res.data.message
		  				  });
		  			}
		  	})
	  }
    },
  }
</script>

