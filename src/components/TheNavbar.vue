<template>
  <header class="navbar">

   <router-link to="/Tasks"><h1>to<span>Do</span>List</h1></router-link>
    <ul class="navbar-menu">
      <li><router-link :class="{active:pathCheck}" to="/Tasks">Задачи</router-link></li>
      <li><router-link to="/New">Создать</router-link> </li>
    </ul>
  </header>

</template>

<script>
import {useRoute} from "vue-router";
import {computed} from "vue";

export default {

  setup(){
    const route = useRoute()
    const pathCheck = computed(()=>route.path.includes('task'))

    return{
      pathCheck
    }
  }
}
</script>

<style scoped>
span{
  color: #2c3e50;
}
</style>