<template>
  <div v-if="route.params.taskId" class="card center">
    <h3  >
      Задачи с id = <strong>{{route.params.taskId}}</strong> нет.
    </h3>
    <router-link to="/tasks">К задачам</router-link>
  </div>

  <div class="card center" v-else>
    <h1>
      Такой страницы нету!
    </h1>
    <router-link to="/tasks">К задачам</router-link>
  </div>

</template>

<script>
import {useRoute} from "vue-router";

export default {
  name: "NotFound",
  setup(){
    const route = useRoute()
    return{
      route,
    }
  }
}
</script>

<style scoped>

</style>