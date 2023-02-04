<template>
	<div>
		<div class="search">
			<el-row>
				<el-col :span='8'>
					<el-select v-model="office" placeholder='选择科室'>
						<el-option v-for='item in offices' :key='item' :label='item' :value='item'></el-option>
					</el-select>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="officeSearch()">搜索</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="tabledata">
			<el-table :data="tableData" stripe border style="width: 100%">
				<el-table-column prop="doc_name" label="主治医生" width="180"></el-table-column>
				<el-table-column prop="office_name" label="所属科室" width="180"></el-table-column>
				<el-table-column prop="doc_gender" label="性别" width="120"></el-table-column>
				<el-table-column prop="doc_age" label="年龄" width="120"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="showDocDetail(scope.row.doc_id)">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="预约详细信息" width="60%" :visible.sync="docDetailDialog">
		  <div class="descriptions">
			  <div class="description">医生名称：{{docDetail.doc_name}}</div>
			  <div class="description">医生年龄：{{docDetail.doc_age}}岁</div>
			  <div class="description">联系方式：{{docDetail.doc_phone}}</div>
			  <div class="description">医生等级：{{docDetail.doc_level}}</div>
			  <div class="description">挂号价格：{{docDetail.doc_price}}元</div>
			  <el-date-picker
			    v-model="newForm.appointmentTime"
				placement="bottom-start"
				:picker-options="pickerOptions"
			    type="datetime"
			    value-format="yyyy-MM-dd HH:mm:ss"
			    placeholder="选择日期">
			  </el-date-picker>
		  </div>
		  <span slot="footer" class="dialog-footer">
		      <el-button @click="docDetailDialog = false">取 消</el-button>
		      <el-button type="primary" @click="newReg()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'new_reg',
		data() {
			return {
				docDetailDialog:false,
				office: "",
				offices: ["全部", "口腔科", "神经科", "体检科", "普内科", "普外科", "眼科",
					"皮肤科", "放射科", "呼吸内科", "免疫科", "心血管科", "肝胆外科",
					"骨外科", "产科", "小儿外科", "肿瘤外科", "肿瘤内科", "麻醉科", "超声科",
					"核医学科", "急症科", "感染内科", "胸外科"
				],
				tableData: [],
				newForm:{
					patientId:0,
					doctorId:0,
					appointmentTime:"",
				},
				docDetail:{},
				pickerOptions: { // 限制收货时间不让选择今天以前的
				　　disabledDate(time) {
						const day = 24 * 3600 * 1000;
						const day1 = 3 * 24 * 3600 * 1000;
						let maxTime=Date.now()+day1;
						let minTime=Date.now()-day;
				　　　　return time.getTime() < minTime || time.getTime()>maxTime;
				　　},
					selectableRange:'00:00:00 - 23:59:59'
				}
			};
		},
		methods: {
			officeSearch() {
				if (this.office == "") {
					this.office = "全部"
				}
				this.instance.searchDocList({
				 officeName: this.office
				}).then(res => {
					this.tableData = res.data.datas
				})
			},
			showDocDetail(doc_id) {
				this.newForm.doctorId=doc_id;
				this.instance.docDetail({
				 docId:doc_id
				}).then(res => {
					this.docDetail = res.data.datas
				})
				this.docDetailDialog=true;
			},
			newReg(){
				if(this.newForm.appointmentTime==""){
					alert("请选择预约时间")
				}
				else{
					this.newForm.patientId=window.localStorage.getItem("patientId");
					this.instance.doOrder(this.newForm).then(res => {
						if(res.data.code==666){
							alert("预约成功")
						}else if(res.data.code==701){
							alert("该医生人数已满")
						}
						else{
							alert("预约失败")
						}
					})
				}
				this.docDetailDialog=false;
			}
		},
		mounted() {
			this.officeSearch()
		}
	}
</script>

<style scoped>
	.search {
		margin-bottom: 30px;
	}
	.descriptions{
		padding: 20px;
	}
	.description{
		height: 40px;
	}
</style>
