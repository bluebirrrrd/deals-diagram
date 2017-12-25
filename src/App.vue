<template>
  <div id="app">
    <DealsDiagram/>
  </div>
</template>

<script>
import DealsDiagram from './components/DealsDiagram'

export default {
  name: 'app',
  components: {
    DealsDiagram,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
