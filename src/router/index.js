import VueRouter from 'vue-router'
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

const router =  new VueRouter({
  routes:[
    {
      path:'/about',
      component:About,
      meta:{isAuth:true, title:'關於'},
    },
    {
      path:'/home',
      component:Home,
      meta:{title:'主頁'},
      children:[
        {
          path:'news',
          component:News,
          meta:{isAuth:true,title:'新聞'},
          // 獨享路由守衛(beforeEnter)：只存在於單一路由，可與全局後置路由守衛搭配使用
          // beforeEnter:(to, from, next) =>{
          //   if(to.meta.isAuth){
          //     if(localStorage.getItem('account') === 'terry0327'){
          //       next()
          //     }
          //     else{
          //       alert('帳號名不對！無權限查看！')
          //     }
          //   }
          //   else{
          //     next()
          //   }
          // }
        },
        {
          path:'message',
          component:Message,
          meta:{isAuth:true,title:'訊息'},
          children:[
            {
              path:'detail',
              component:Detail,
              meta:{isAuth:true,title:'詳情'},
            }
          ]
        }
      ]
    },
  ]
})

// 路由守衛：對陸游的權限進行控制
// 全局前置路由守衛：初始化時被調用、每次路由切換前被調用
router.beforeEach((to,from,next)=>{
  if(to.meta.isAuth){
    if(localStorage.getItem('account') === 'terry0327'){
      next()
    }
    else{
      alert('帳號名不對！無權限查看！')
    }
  }
  else{
    next()
  }
})

// 全局後置路由守衛：初始化時被調用、每次路由切換後被調用
router.afterEach((to,from)=>{
  document.title = to.meta.title || '路由小專案'
})

export default router