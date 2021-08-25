import { createStore } from 'vuex'
import taskReq from "../request/taskRequests";


export default createStore({
  state() {
    return{
      taskList:[],
      onlineCount :0,
    }
  },
  mutations: {
    setTaskItem(state, payload){
      state.taskList.push(payload)
    },
    setTaskStatus(state,{id,status}){
     const index= state.taskList.findIndex(item => item.id === id)
      state.taskList[index].status = status

    },
    deleteTaskItem(state, payload){
      state.taskList = state.taskList.filter(item=>item.id !== payload)
    },
    setTaskArr(state,payload){
      state.taskList = payload
    },
    setOnlinePeople(state,payload){
      state.onlineCount = payload
    }
  },
  getters:{
    getTaskList(state,getters){
      return state.taskList
    },
    getActiveItemsCount(state,getters){
      let count = 0
      state.taskList.forEach(item=>item.status ==='active'? count++: null)
      return count
    },
    getOnlinePeople(state,getters){
      return state.onlineCount
    }
  },
  actions: {
    // async setTaskArr(context,payload){
    //   const responce = await taskReq.setTask(payload)
    //
    // },
    // async getTaskArr(context, payload){
    //   const res = taskReq.getTasks()
    //
    // },

  },
  modules: {
  }
})
