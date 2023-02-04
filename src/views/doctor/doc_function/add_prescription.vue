<template>
	<el-container>
		<el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 20px;">
		  <el-breadcrumb-item :to="{ name: 'doctor_patient' }">我的病人</el-breadcrumb-item>
		  <el-breadcrumb-item>添加处方</el-breadcrumb-item>
		</el-breadcrumb>
		
	  <el-header 
	  style="
	  text-align: center; 
	  font-size: 48px;
	  color: white; 
	  background-color: #B3C0D1; ">门诊处方</el-header>
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
				       v-model="prescriptionTime"
				       type="datetime"
					   value-format="yyyy-MM-dd HH:mm:ss"
				       placeholder="选择日期时间">
				     </el-date-picker>
				</div>
			</el-descriptions-item>
		  </el-descriptions>
		  <el-descriptions title=" " direction="vertical" :column="1" border>
		   </el-descriptions>
		 <el-descriptions title="选择药品" direction="vertical" :column="1" border>
			 
		 </el-descriptions>
		 <el-button  @click="Click1()">刷新</el-button>
		  <el-table
			ref="multipleTable"
		      :data="medicineList.filter(data => !search || data.medicineName.toLowerCase().includes(search.toLowerCase()))"
		      tooltip-effect="dark"
			  style="width: 100%"
			  @selection-change="handleSelectionChange">
			  
			  <el-table-column
			    type="selection"
			    width="55">
			  </el-table-column>
		      <el-table-column
		        label="药品ID"
		        prop="medicineId" width="80">
		      </el-table-column>
		      <el-table-column
		        label="药品名"
		        prop="medicineName" width="120">
		      </el-table-column>
			  <el-table-column
			    label="规格"
			    prop="specification" width="100">
			  </el-table-column>
			  <el-table-column
			    label="频率"
			    prop="frequency" width="100">
			  </el-table-column>
			  <el-table-column
			    label="单次剂量"
			    prop="dosagePer" width="160">
			  </el-table-column>
			  <el-table-column
			    label="单价"
			    prop="pricePer" width="100">
			  </el-table-column>
			  <!-- <el-table-column
			    label="数量"
			   >
				<el-input-number  v-model="num" @change="handleChange" :min="1" :max="10"></el-input-number>
			  </el-table-column> -->
			  <el-table-column prop="num" label="数量" >
					<template slot-scope="scope" >
						<el-input-number v-model="scope.row.num" @change="inputChange(scope.row)" 
						 :min="0" :max="50" label="描述文字">
						</el-input-number>
					</template>
				</el-table-column>
		      <el-table-column
		        align="right">
		        <template slot="header" slot-scope="scope">
		          <el-input
		            v-model="search"
		            size="mini"
		            placeholder="输入关键字搜索"/>
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
	import{getMedicineList} from '@/api/index.js';
	import{savePrescription} from '@/api/index.js';
  export default {
	  name: "add_prescription",
    data() {
      return {
		  medicineList: [
			  // {
				 //  medicineId:'1',
				 //  specification:"test1",
				 //  dosagePer:'ll',
				 //  pricePer:'12',
				 //  medicineName:'测试1',
				 //  frequency:'lal'
			  // }
		  ],
		  amountList:[],
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
		multipleSelection: [],
        prescriptionTime: '',
        value2: '',
        value3: '',
		search: '',
		num:1
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
	   handleChange(value) {
		  console.log(value);
		},
		Click1()
		{
		this.instance.getMedicineList(
			).then(res => {
				if(res != -1 && res.data.code == 666){
					  this.medicineList = res.data.datas.medicineList;
					  console.log(this.medicineList);
				}else if(res.data.code == 700){
						this.$message({
							type: 'error',
							message: res.data.message
						  });
					}
			})
		},
		saveClick1(){
			// console.log(this.multipleSelection);
			this.medicineList=this.multipleSelection;
			this.instance.savePrescription(
				{
					medicineList:this.multipleSelection,
					prescriptionTime:this.prescriptionTime,
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