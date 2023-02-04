//输出通用axios实例
import axios from 'axios';
const instance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': "application/json;charset=utf-8"
  }
});
//文件类型
// const instupload = axios.create({
//   timeout: 10000,
//   headers: {
//     'Content-Type': "multipart/form-data"
//   }
// });

export default{
	getDoctorById ( data ) {
		  return instance.post('/api/doctor/getDoctorById',data);
		},
		//患者登录 【已做】
		loginPatient(data){
			return instance.post('/api/patient/loginPatient',data);
		},
		//查看患者个人信息 【已做】
		patientInfo(data){
			return instance.post('/api/patient/patientInfo',data);
		},
		//修改个人信息  【已做】
		editInfo(data){
			return instance.post('/api/patient/editInfo',data);
		},
		//修改密码   【已做】
		editPwd(data){
			return instance.post('/api/patient/editPwd',data);
		}, 
		//患者注册   【已做】
		register(data){
			return instance.post('/api/patient/register',data);
		},
		//按照科室或者医生名称查找【已做】
		searchDocList(data){
			return instance.post('/api/doctor/searchDocList',data);
		},
		//点击预约【已做】
		doOrder(data){
			return instance.post('/api/registration/doOrder',data);
		},
		//新建预约---查看所有医生列表【已做】
		docList(){
			return instance.post('/api/doctor/docList');
		},
		//查看医生详情【已做】
		docDetail(data){
			return instance.post('/api/doctor/docDetail',data);
		},
		//显示未完成预约挂号列表【已做】
		showUndoList(data){
			return instance.post('/api/registration/showUndoList',data);
		},
		//查看单条待就诊预约详情，状态小于4【已做】
		showUndoDetail(data){
			return instance.post('/api/registration/showUndoDetail',data);
		},
		//4状态的详情，需要查看处方单和检查单进行缴费【已做】
		showUnpaidDetail(data){
			return instance.post('/api/registration/showUnpaidDetail',data);
		},
		//交挂号单费【已做】
		payOrder(data){
			return instance.post('/api/cache/payOrder',data);
		},
		//取消预约【已做】
		cancelOrder(data){
			return instance.post('/api/registration/cancelOrder',data);
		},
		//查看排队信息【已做】
		checkQueInfo(data){
			return instance.post('/api/cache/checkQueInfo',data);
		},
		//查看当前挂号详情【待定】
		queDetail(data){
			return instance.post('/api/registration/queDetail',data);
		},
		//显示历史预约信息列表【已做】
		showHistory(data){
			return instance.post('/api/registration/showHistory',data);
		},
		//查看历史预约详情【已做】
		historyDetail(data){
			return instance.post('/api/registration/historyDetail',data);
		},
		//查看历史处方【已做】
		showMedicine(data){
			return instance.post('/api/prescription/showMedicine',data);
		},
		//查看历史处方单药品列表【已做】
		showHistoryMedicine(data){
			return instance.post('/api/prescription/showHistoryMedicine',data);
		},
		//查看未缴费处方单药品列表【已做】
		showUnpaidPre(data){
			return instance.post('/api/prescription/showUnpaidPre',data);
		},
		//处方单缴费【已做】
		payMedicine(data){
			return instance.post('/api/prescription/payMedicine',data);
		},
		//查看历史检查单【已做】
		showCheck(data){
			return instance.post('/api/checklist/showCheck',data);
		},
		//查看历史检查单检查列表【已做】
		showHistoryCheck(data){
			return instance.post('/api/checklist/showHistoryCheck',data);
		},
		//查看未缴费检查单检查列表【已做】
		showUnpaidCheck(data){
			return instance.post('/api/checklist/showUnpaidCheck',data);
		},
		//检查单缴费 【已做】
		payCheck(data){
			return instance.post('/api/checklist/payCheck',data);
		},
		//显示已缴费处方单列表【已做】
		showPaidMedicine(data){
			return instance.post('/api/prescription/showPaidMedicine',data);
		},
		//显示已缴费检查单列表【已做】
		showPaidCheck(data){
			return instance.post('/api/checklist/showPaidCheck',data);
		},
		//对单药品退药退费【已做】
		cancelMedicine(data){
			return instance.post('/api/medicine/cancelMedicine',data);
		},
		//对单检查项目退费【已做】
		cancelCheck(data){
			return instance.post('/api/checkitem/cancelCheck',data);
		},
		//医生登录
		loginDoctor(data){
			return instance.post('/api/doctor/loginDoctor',data);
		},
		//修改医生基本信息
		editDocInfo(data) {
			return instance.post('/api/doctor/editDocInfo',data);
		},
		//修改医生密码
		editDocPwd(data) {
			return instance.post('/api/doctor/editDocPwd',data);
		},
		//医生查看我的病人
		visitPatient(data) {
			return instance.post('/api/cache/startVisit',data);
		},
		//医生叫号
		docCall(data) {
			return instance.post('/api/cache/poll',data);
		},
		//医生查看就诊中患者
		docVisitNow(data) {
			return instance.post('/api/registration/visiting',data);
		},
		//就诊结束
		docEnd(data) {
			return instance.post('/api/registration/endVisit',data);
		},
		//医生挂起
		docSuspend(data) {
			return instance.post('/api/registration/suspendVisit',data);
		},
		//获取患者信息
		getpatientInfo(data) {
			return instance.post('/api/patient/doctor_visit',data);
		},
		//获取模板
		getTemplate(data) {
			return instance.post('/api/recordtemplate/searchTemplate',data);
		},
		//保存模板
		saveTemplate(data) {
			return instance.post('/api/recordtemplate/saveTemplate',data);
		},
		//保存病历
		saveRecord(data) {
			return instance.post('/api/medicalrecord/saveRecord',data);
		},
		//查看药品
		getMedicineList(data) {
			return instance.post('/api/medicine/allMedicine',data);
		},
		//选择药品
		chooseMedicine(data) {
			return instance.post('/api/medicine/chooseMedicine',data);
		},
		//保存处方
		savePrescription(data) {
			return instance.post('/api/prescription/savePrescription',data);
		},
		//查看检查单
		getCheckitem(data) {
			return instance.post('/api/checkitem/allCheckitem',data);
		},
		//保存检查单
		saveChecklist(data) {
			return instance.post('/api/checklist/saveChecklist',data);
		},
		//查询病人注册
		searchPatient(data) {
			return instance.post('/api/patient/searchPatient',data);
		},
		//前台--患者注册
		registerbyReception(data) {
			return instance.post('/api/patient/regByReception',data);
		},
		//查询科室
		getOffice(data) {
			return instance.post('/api/office/allOffice',data);
		},
		//查询可预约医生
		searchDoctor(data) {
			return instance.post('/api/doctor/searchAvailable',data);
		},
		//前台--挂号
		registerOrder(data) {
			return instance.post('/api/registration/doOrder',data);
		},
		//前台--缴费
		registerPay(data) {
			return instance.post('/api/cache/push',data);
		},
		//查询挂号
		searchRegister(data) {
			return instance.post('/api/registration/searchReg',data);
		},
		//解挂
		unhook(data) {
			return instance.post('/api/cache/unhang',data);
		},
		//查询领药单
		searchPatipres( data ){
		  return instance.post('/api/patiPres/searchPatipres',data);
		},
		//查看所有领药单
		getPatipresAll(  ){
		  return instance.post('/api/patiPres/getPatipresAll');
		},
		//查看领药单详情
		getMediDetails(data){
			return instance.post('/api/patiPres/getMediDetails',data);
		},
		//更新领药单状态
		updatepreState(data){
			return instance.post('/api/patiPres/updatepreState',data);
		},
		//退药
		returnMedicine(data){
			return instance.post('/api/patiPres/returnMedicine',data);
		},
		//查询检查单
		searchPaticheck( data ){
		  return instance.post('/api/patiCheck/searchPatipres',data);
		},
		//查看所有检查单
		getPaticheckAll(  ){
		  return instance.post('/api/patiCheck/getPatiCheckAll');
		},
		//查看检查单详情
		getCheckDetails(data){
			return instance.post('/api/patiCheck/getCheckDetails',data);
		},
		//更新检查单状态
		updateclistState(data){
			return instance.post('/api/patiCheck/updatelistState',data);
		},
		//退检查项
		returnCheck(data){
			return instance.post('/api/patiCheck/returnCheck',data);
		},
		//更新检查项状态
		updatecitemState(data){
			return instance.post('/api/patiCheck/updatecitemState',data);
		},
		showreturnSys(){
			return instance.post('/api/patiPres/showreturnSys');
		},
		allMedicine(){
			return instance.post('/api/medicine/allMedicine');
		},
		allCheckitem(){
			return instance.post('/api/checkitem/allCheckitem');
		}
}