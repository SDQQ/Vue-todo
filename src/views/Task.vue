<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>:
      <AppStatus :status="task.status"/>
    </p>
    <p><strong>Дедлайн</strong>: {{ task.deadline }}</p>
    <p><strong>Описание</strong>: {{ task.text }}</p>
    <div class="btn-group">
      <button class="btn" @click="setStatus('active')">Взять в работу</button>
      <button class="btn primary" @click="setStatus('done')">Завершить</button>
      <button class="btn danger" @click="setStatus('cancelled')">Отменить</button>
    </div>
  </div>

</template>

<script>
import AppStatus from '../components/AppStatus'
import {useRoute,} from "vue-router";
import {useStore} from "vuex";
import taskRequests from "../request/taskRequests";
import {computed} from "vue";

export default {
  components: {AppStatus},
  setup(props, context) {
    const store = useStore()
    const route = useRoute()

    let task = computed(() => {
      return store.state.taskList.find(item => item.id === route.params.taskId)
    })

    async function setStatus(status) {
      const res = await taskRequests.updateTask({id: task.value.id, status: status})
      if (res) {
        store.commit('setTaskStatus', {id: task.value.id, status: status})
      }
    }


    return {
      task,
      store,
      setStatus,
    }
  }
}
</script>

<style scoped>

</style>