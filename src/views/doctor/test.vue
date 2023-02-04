<template>
	<div class="top">
		<el-container>
			<el-aside width="200px">
		    <el-menu 
			:default-active="this.$router.path" 
			@select="handleSelect" 
			mode="vertical"
			background-color="#545c64"
		    text-color="#fff" 
			active-text-color="#ffd04b"
			style="height: 90vh;">
		      <el-menu-item index="/app/doctor_mng/doctor_patient">
		        <i class="el-icon-s-flag"></i>
		        <span slot="title">我的病人</span>
		      </el-menu-item>
			  <el-menu-item index="/app/doctor_mng/doctor_own">
			    <i class="el-icon-s-data"></i>
			    <span slot="title">我的基本信息</span>
			  </el-menu-item>
		    </el-menu>	
		  </el-aside>
		  <el-main class="main">
			  <router-view/>
		  </el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
	  name: 'doctor_mng',
	  data(){
	    return{
	    }
	  },
	  methods: {
	    handleSelect(key) {
	      this.$router.push({
	        path: key
	      })
	    }
	  }
	}
</script>

<style>
</style>



