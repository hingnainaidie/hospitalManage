import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//解决路由重复点击的错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
	  path: '/try',
	  name: 'try',
	  component: () => import('../views/try.vue'),
  },
  {
  	  path: '/login',
  	  name: 'login',
  	  component: () => import('../views/login.vue'),
	  // beforeEnter: (to, from, next) => {
		 //  var token = window.localStorage.getItem('user_identity')
		 //  if (!token) {
			// next()
		 //  } else if (token == 0) {
			// next("/app/doctor_mng/doctor_patient")
		 //  } else if ((token == 1)) {
			// next("/app/medical_mng/medical_list")
		 //  } else if (token == 2) {
			// next("/app/reception_mng/reception_register")
		 //  } else if (token == 3) {
			// next("/app/check_mng/check_list")
		 //  } else if (token == 3) {
			// next("/app/patient_mng/patient_reg")
		 //  }
	  // }
  },
  {
  	  path: '/register',
  	  name: 'register',
  	  component: () => import('../views/register.vue'),
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../views/App.vue'),
	children: [{
	    path: 'patient_mng',
	    name: 'patient_mng',
	    component: () => import('../views/patient/patient_mng.vue'),
		// beforeEnter: (to, from, next) => {
		//   var token = window.localStorage.getItem('user_identity')
		//   if (!token) {
		// 	next("/login")
		//   } else if (token == 0) {
		// 	next("/app/doctor_mng/doctor_patient")
		//   } else if ((token == 1)) {
		// 	next("/app/medical_mng/medical_list")
		//   } else if (token == 2) {
		// 	next("/app/reception_mng/reception_register")
		//   } else if (token == 3) {
		// 	next("/app/check_mng/check_list")
		//   } else if (token == 4) {
		// 	next()
		//   }
		// },
		children:[{
			path: 'patient_own',
			name: 'patient_own',
			component: () => import('../views/patient/patient_own.vue'),
		  },
		  {
		  	path: 'new_reg',
		  	name: 'new_reg',
		  	component: () => import('../views/patient/new_reg.vue'),
		  },
		  {
		  	path: 'patient_reg',
		  	name: 'patient_reg',
		  	component: () => import('../views/patient/patient_reg.vue'),
		  },
		  {
		  	path: 'patient_reg_history',
		  	name: 'patient_reg_history',
		  	component: () => import('../views/patient/patient_reg_history.vue'),
		  },
		  {
		  	path: 'patient_refund',
		  	name: 'patient_refund',
		  	component: () => import('../views/patient/patient_refund.vue'),
		  }
		]
		},
		{
		path: 'doctor_mng',
		name: 'doctor_mng',
		component: () => import('../views/doctor/doctor_mng.vue'),
		// beforeEnter: (to, from, next) => {
		//   var token = window.localStorage.getItem('user_identity')
		//   if (!token) {
		// 	next("/login")
		//   } else if (token == 0) {
		// 	next()
		//   } else if ((token == 1)) {
		// 	next("/app/medical_mng/medical_list")
		//   } else if (token == 2) {
		// 	next("/app/reception_mng/reception_register")
		//   } else if (token == 3) {
		// 	next("/app/check_mng/check_list")
		//   } else if (token == 4) {
		// 	next("/app/patient_mng/patient_reg")
		//   }
		// },
		children:[{
			path: 'doctor_patient',//我的病人
			name: 'doctor_patient',
			component: () => import('../views/doctor/doctor_patient.vue'),
			},
			{
				path: 'doctor_own',//医生个人信息
				name: 'doctor_own',
				component: () => import('../views/doctor/doctor_own.vue'),
			}
		]
		},//医生部分结束
		//医生所用三个功能
		{
			path: 'add_record',//添加病历
			name: 'add_record',
			component: () => import('../views/doctor/doc_function/add_record.vue'),
		},
		{
			path: 'add_prescription',//添加处方
			name: 'add_prescription',
			component: () => import('../views/doctor/doc_function/add_prescription.vue'),
		},
		{
		    path: 'add_checklist',//添加检查单
		    name: 'add_checklist',
		    component: () => import('../views/doctor/doc_function/add_checklist.vue'),
		},
		//前台部分
		{
		path: 'reception_mng',
		name: 'reception_mng',
		component: () => import('../views/reception/reception_mng.vue'),
		// beforeEnter: (to, from, next) => {
		//   var token = window.localStorage.getItem('user_identity')
		//   if (!token) {
		// 	next("/login")
		//   } else if (token == 0) {
		// 	next("/app/doctor_mng/doctor_patient")
		//   } else if ((token == 1)) {
		// 	next("/app/medical_mng/medical_list")
		//   } else if (token == 2) {
		// 	next()
		//   } else if (token == 3) {
		// 	next("/app/check_mng/check_list")
		//   } else if (token == 4) {
		// 	next("/app/patient_mng/patient_reg")
		//   }
		// },
		children:[{
			path: 'reception_register',//前台病人挂号
			name: 'reception_register',
			component: () => import('../views/reception/reception_register.vue'),
		  },
		  {
		  	path: 'reception_unhook',//前台病人解挂
		  	name: 'reception_unhook',
		  	component: () => import('../views/reception/reception_unhook.vue'),
		  },
		  {
		  	path: 'reception_own',//前台个人信息
		  	name: 'reception_own',
		  	component: () => import('../views/reception/reception_own.vue'),
		  }
		]
		},
		{
		path: 'medical_mng',
		name: 'medical_mng',
		component: () => import('../views/medical/medical_mng.vue'),
		// beforeEnter: (to, from, next) => {
		//   var token = window.localStorage.getItem('user_identity')
		//   if (!token) {
		// 	next("/login")
		//   } else if (token == 0) {
		// 	next("/app/doctor_mng/doctor_patient")
		//   } else if ((token == 1)) {
		// 	next()
		//   } else if (token == 2) {
		// 	next("/app/reception_mng/reception_register")
		//   } else if (token == 3) {
		// 	next("/app/check_mng/check_list")
		//   } else if (token == 4) {
		// 	next("/app/patient_mng/patient_reg")
		//   }
		// },
		children:[{
			path: 'medical_list',
			name: 'medical_list',
			component: () => import('../views/medical/medical_list.vue'),
		  },
		  {
			path: 'medical_refund',
			name: 'medical_refund',
			component: () => import('../views/medical/medical_refund.vue'),
		  },
		  {
		  	path: 'medical_own',
		  	name: 'medical_own',
		  	component: () => import('../views/medical/medical_own.vue'),
		  },
		  {
			  path:'medical_details',
			  name:'medical_details',
			  component:()=>import('../views/medical/medical_details.vue'),
		  },
		  {
		  			  path:'medical_all',
		  			  name:'medical_all',
		  			  component:()=>import('../views/medical/medical_all.vue'),
		  }
		]
		},
		{
		path: 'check_mng',
		name: 'check_mng',
		component: () => import('../views/check/check_mng.vue'),
		// beforeEnter: (to, from, next) => {
		//   var token = window.localStorage.getItem('user_identity')
		//   if (!token) {
		// 	next("/login")
		//   } else if (token == 0) {
		// 	next("/app/doctor_mng/doctor_patient")
		//   } else if ((token == 1)) {
		// 	next("/app/medical_mng/medical_list")
		//   } else if (token == 2) {
		// 	next("/app/reception_mng/reception_register")
		//   } else if (token == 3) {
		// 	next()
		//   } else if (token == 4) {
		// 	next("/app/patient_mng/patient_reg")
		//   }
		// },
		children:[{
			path: 'check_list',
			name: 'check_list',
			component: () => import('../views/check/check_list.vue'),
		  },
		  {
			path: 'check_refund',
			name: 'check_refund',
			component: () => import('../views/check/check_refund.vue'),
		  },
		  {
		  	path: 'check_own',
		  	name: 'check_own',
		  	component: () => import('../views/check/check_own.vue'),
		  },
		  {
			  path:'check_details',
			  name:'check_details',
			  component:()=>import('../views/check/check_details.vue'),
		  },
		  {
			  path:'checkitem_update',
			  name:'checkitem_update',
			  component:()=>import('../views/check/checkitem_update.vue'),
		  },
		  {
		  			  path:'check_all',
		  			  name:'check_all',
		  			  component:()=>import('../views/check/check_all.vue'),
		  }
		]
		}
	]
  }
]

//设置路由模式为history
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
