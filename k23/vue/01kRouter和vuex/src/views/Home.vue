<template>
  <div class="home">
    <!-- {{$store.state.counter}}

    <div>doubled: {{$store.getters.doubleCounter}}</div> -->

  {{counter}}
    <button @click="add">counter自增</button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    add() {
      this.counter++
    }
  },
  computed: {
    double: {
      mode: 'active',
      get() {
        console.log('自执行了吗')
        return this.counter * 2
      }
    }
  },
  components: {
    
  }
}
</script>
