import {createRouter, createWebHistory} from 'vue-router'
import App from "../App";
import taskReq from "../request/taskRequests";
import objToArr from "../utils/objToArr";

const routes = [
  {
    path: '/',
    name: 'home',
    component: App,
    beforeEnter(to, from){
      return{
        name:'tasks'
      }
    }

  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../views/Tasks'),
    alias: '/'

  },
  {
    path: '/task',
    name: 'taskSingle',
    component: () => import('../views/Tasks'),
    beforeEnter(to, from){
      return{
        name:'tasks'
      }
    }

  },
  {
    path: '/new',
    name: 'new',
    component: () => import('../views/New')
  },
  {
    path: '/task/:taskId',
    name: 'task',
    component: () => import('../views/Task'),
    async beforeEnter(to, from) {
      const res = await taskReq.getTasks()
      if (objToArr(res).findIndex(item=> item.id === to.params.taskId)=== -1) {
        return {
          name: 'NotFound',
          params: to.params,
          query:{task: to.params.taskId},
          hash: to.hash,
        }
      }
    }
  },
  {path: '/:notFound(.*)*', name: 'NotFound', component: () => import('../components/NotFound')},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

export default router
