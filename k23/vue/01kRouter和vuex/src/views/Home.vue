<template>
  <div class="home">
    {{$store.state.counter}}

    <div>doubled: {{$store.getters.doubleCounter}}</div>

    <button @click="$store.dispatch('addCounter')">counter自增</button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    
  }
}
</script>
