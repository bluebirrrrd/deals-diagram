<template>
  <div id="app">
    <DealsDiagram :deals="deals"/>
  </div>
</template>

<script>
import DealsDiagram from './components/DealsDiagram'
import deals from './data/deals'

export default {
  name: 'app',
  components: {
    DealsDiagram,
  },
  data() {
    return {
      deals,
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
