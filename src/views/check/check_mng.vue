<template>
	<div>
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
		      <el-menu-item index="/app/check_mng/check_list">
		        <i class="el-icon-s-flag"></i>
		        <span slot="title">查看检查单</span>
		      </el-menu-item>
			  <el-menu-item index="/app/check_mng/check_refund">
			    <i class="el-icon-s-home"></i>
			    <span slot="title">退检查项</span>
			  </el-menu-item>
			  <el-menu-item index="/app/check_mng/check_all">
			    <i class="el-icon-s-data"></i>
			    <span slot="title">查看所有检查项</span>
			  </el-menu-item>
			  <el-menu-item index="/app/check_mng/check_own">
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
	  name: 'check_mng',
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