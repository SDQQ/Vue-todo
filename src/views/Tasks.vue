<template>
  <h1 v-if="!store.state.taskList.length" class="text-white center">Задач пока нет</h1>
  <div class="group">
    <h3 class="text-white">Всего активных задач: {{ store.getters.getActiveItemsCount }} </h3>
    <span class="text-white">Пользоваталей онлайн: {{online}}</span>
  </div>


  <div class="card" v-cloak v-if="store.getters.getTaskList" v-for="item in store.getters.getTaskList">
    <h2 class="card-title">
      {{ item.title }}
      <app-status :status="item.status"></app-status>
    </h2>
    <p>
      <strong>
          {{ item.date }}
      </strong>
      <strong>
        <small>
          {{ item.time }}
        </small>
      </strong>
    </p>
    <button class="btn primary" @click="detailed(item.id)">Посмотреть</button>
    <button class="btn danger" @click="deleteTaskItem(item.id)">Удалить</button>
  </div>
  <div class="loader" v-else>

  </div>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import taskReq from "../request/taskRequests";
import {computed} from "vue";

export default {
  components: {AppStatus},
  setup() {

    const store = useStore()
    const router = useRouter()

    function detailed(id) {
      router.push(`/task/${id}`)
    }
    const online = computed(()=>store.state?.onlineCount)

    async function deleteTaskItem(id) {
      const res = await taskReq.deleteTasks(id)
      if (res){
        // store.commit('deleteTaskItem', id)
      }
    }

    return {
      store,
      detailed,
      deleteTaskItem,
      online
    }
  }
}
</script>
<style scoped>
small{
  margin-left: 15px;
}
span{
  font-size: 14px;
  margin-left: 25px;
}
.group{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
