<template>
  <div class="container with-nav" v-cloak>
    <the-navbar></the-navbar>
<!--    <transition name="page" >-->
<!--        <router-view/>-->
<!--    </transition>-->

    <router-view v-slot="{ Component }">
      <transition name="page">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<script>

import TheNavbar from './components/TheNavbar'
import {useStore} from "vuex";
import {onMounted} from "vue";
import fireBaseInitEmits from './utils/f.b.initEmits'

export default {
  components: {
    TheNavbar
  },
  setup() {
    const store = useStore()

    onMounted(async () => {
      fireBaseInitEmits(store)
    })
    return {}
  }
}
</script>

<style>

</style>
