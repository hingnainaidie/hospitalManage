<template>
  <div class='app'>
    <el-container style="padding: 0px; margin: 0px;">
		<el-header style="height: 60px; padding: 0px; margin: 0px;">
			<div class='appicon'>
			  <div class='appname'>名门望组医院门诊管理系统</div>
			  <div class="user">
			    {{username}}
			  </div>
			</div>
		</el-header>
		<el-main style="padding: 0px; margin: 0px;">
			<router-view />
		</el-main>
	</el-container>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
		  username:"登录"
      }
    },
	methods: {
	  
	},
	mounted() {
		var token = window.localStorage.getItem('user_identity');
		if(!token){
			this.username="登录"
		} else if(token==4){
			this.username=window.localStorage.getItem('patientName');
		}else{
			this.username=window.localStorage.getItem('docName');
		}
	}
  }
</script>


<style scoped>
  .app {
    width: 100%;
	min-width: 800px;
	height: 60px;
  }
  .appicon {
    height: 60px;
    width: 100%;
    background-color: #545c64;
  }
  .appname {
    line-height: 60px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    float: left;
	margin-left: 20px;
	margin-right: 20px;
  }
  .topMenu{
	  float:left;
	  min-width: 600px;
	  height: 70px;
  }
  .user {
    line-height: 60px;
    float: right;
    margin-right: 20px;
	font-size: 20px;
	cursor: pointer;
	color: white;
  }

</style>
