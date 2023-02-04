<template>
	<el-container>
		<el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 20px;">
		  <el-breadcrumb-item :to="{ name: 'doctor_patient' }">我的病人</el-breadcrumb-item>
		  <el-breadcrumb-item>添加检查单</el-breadcrumb-item>
		</el-breadcrumb>
		
	  <el-header 
	  style="
	  text-align: center; 
	  font-size: 48px;
	  color: white; 
	  background-color: #B3C0D1; ">检查单</el-header>
	  <el-container>
	      <el-main
	      style="
	      background-color: #E9EEF3;
	      <!-- line-height: 100px; -->
	      "
	      >
		  <el-descriptions title="病人信息" direction="vertical" :column="5" border>
		    <el-descriptions-item label="姓名">{{form.patient_name}}</el-descriptions-item>
		    <el-descriptions-item label="性别">{{form.patient_gender}}</el-descriptions-item>
		    <el-descriptions-item label="年龄">{{form.patient_age}}</el-descriptions-item>
		    <el-descriptions-item label="身份证号">{{form.patient_Identify}}</el-descriptions-item>
		    <el-descriptions-item label="手机号">{{form.patient_phone}}</el-descriptions-item>
		    <el-descriptions-item label="就诊医生">{{form.doc_name}}</el-descriptions-item>
		    <el-descriptions-item label="家庭地址">{{form.patient_addr}}</el-descriptions-item>
			<el-descriptions-item label="日期">
				<div class="block">
				     <el-date-picker
				       v-model="prescribeTime"
				       type="datetime"
					   value-format="yyyy-MM-dd HH:mm:ss"
				       placeholder="选择日期时间">
				     </el-date-picker>
				</div>
			</el-descriptions-item>
		  </el-descriptions>
		  <el-descriptions title=" " direction="vertical" :column="1" border>
		   </el-descriptions>
		 <el-descriptions title="选择检查项目" direction="vertical" :column="1" border>
		 </el-descriptions>
		 
		     <el-button  @click="Click1()">刷新</el-button>
		  <el-table
			ref="multipleTable"
		      :data="tableData.filter(data => !search || data.checkitemName.toLowerCase().includes(search.toLowerCase()))"
		      tooltip-effect="dark"
			  style="width: 100%"
			  @selection-change="handleSelectionChange">
			  <el-table-column
			    type="selection"
			    width="55">
			  </el-table-column>
		      <el-table-column
		        label="检查项目ID"
		        prop="checkitemId" >
		      </el-table-column>
		      <el-table-column
		        label="检查项目"
		        prop="checkitemName" >
		      </el-table-column>
			  <el-table-column
			    label="检查部门"
			    prop="checkPart" >
			  </el-table-column>
			  <el-table-column
			    label="价格"
			    prop="checkitemPrice">
			  </el-table-column>
			  
		      <el-table-column
		        align="right">
		        <template slot="header" slot-scope="scope">
		          <el-input
		            v-model="search"
		            size="mini"
		            placeholder="输入关键字搜索"/>
		        </template>
		        <template slot-scope="scope">
		          <!-- <el-button
		            size="mini"
		            type="danger"
		            @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
		        </template>
		      </el-table-column>
		    </el-table>
		  <el-descriptions title=" " direction="vertical" :column="1" border>
		   
		   </el-descriptions>
		   <el-button  icon="el-icon-document" @click="saveClick1()">保存</el-button>
	      </el-main>
		  
	    </el-container>
	  
	</el-container>
</template>

<script>
	import{getCheckitem} from '@/api/index.js';
	import{saveChecklist} from '@/api/index.js';
  export default {
	  name: "add_checklist",
    data() {
      return {
		  form: {
		  	patient_id: window.localStorage.patientId,
		  	patient_Identify: window.localStorage.patientIdentify,
		  	patient_name: window.localStorage.patientName,
		  	patient_pwd:window.localStorage.patientPassword,
		  	patient_gender: window.localStorage.patientGender,
		  	patient_age:window.localStorage.patientAge,
		  	patient_addr:window.localStorage.patientAddr,
		  	patient_phone:window.localStorage.patientPhone,
		  			doc_name: window.localStorage.docName,
		  },
		  tableData: [
			//   {
			// checkitemId:'6',
			// checkitemName:'前列腺b超',
			// checkPart:'前列腺',
			// checkitemPrice:'100.0'
		 //  }, {
			// checkitemId:'6',
			// checkitemName:'b超',
			// checkPart:'前列腺',
			// checkitemPrice:'100.0'
		 //  },
		  ],
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
		Reg_record:{
			record_type:'',
			ill_time:'',
			record_result:'',
			allergy:'',
			present_illness:'',
			reg_id:'',
		},
		recordtemplate:[],
		multipleSelection: [],
		checkitemList:[],
        prescribeTime: '',
        value2: '',
        value3: '',
		search: '',
		num: 1
	  }
	},
	methods: {
		toggleSelection(rows) {
		  if (rows) {
			rows.forEach(row => {
			  this.$refs.multipleTable.toggleRowSelection(row);
			});
		  } else {
			this.$refs.multipleTable.clearSelection();
		  }
		},
		handleSelectionChange(val) {
		  this.multipleSelection = val;
		},
		Click1()
		{
		this.instance.getCheckitem(
			).then(res => {
				if(res != -1 && res.data.code == 666){
					  this.tableData = res.data.datas.checkitemList;
					  console.log(this.tableData);
				}else if(res.data.code == 700){
						this.$message({
							type: 'error',
							message: res.data.message
						  });
					}
			})
		},
		saveClick1(){
			console.log(this.multipleSelection);
			this.instance.saveChecklist(
				// this.checkitemList,
				{
					checkitemList:this.multipleSelection,
					prescribeTime:this.prescribeTime,
					regId:window.localStorage.regId,
				}
			).then(res => {
				if(res != -1 && res.data.code == 666){
					  alert("保存成功");
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

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 12px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>