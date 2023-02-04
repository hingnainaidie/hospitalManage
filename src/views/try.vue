<template>
    <div>
		<el-button @click="getData">点击获取数据</el-button>
		<div>{{detail}}</div>
    </div>
</template>

<script>
  export default {
    name:'try',
    data(){
      return{
		id:1,
		detail:''
      }
    },
    methods: {
		getData(){
		  this.instance.getDoctorById({
		    docId:this.id
		  }).then(res => {
		    this.detail=res.data.datas.docName
		  })
		}
	}
  }
</script>

<style scoped>
</style>
