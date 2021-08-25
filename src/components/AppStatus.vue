<template>
  <span class="badge" :class="checkStatus?.color">{{checkStatus?.status}}</span>
</template>

<script>
export default {
  props:['status'],
  computed:{
    checkStatus(){
      switch (this.status){
        case 'active':
          return {color:'warning',status:'Активен'}
        case  'done':
          return {color:'primary',status:'Выполнен'}
        case  'cancelled':
          return {color:'danger',status:'Отменен'}
      }
    }
  }
}

</script>