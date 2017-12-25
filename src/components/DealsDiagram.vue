<template>
  <div class="diagram">
    <ul>
      <Deal v-for="deal of deals" :key="deal._id" :deal="deal"/>
    </ul>
  </div>
</template>

<script>
import Deal from './Deal'

export default {
  name: 'DealsDiagram',
  props: ['deals'],
  components: {
    Deal
  },
  data() {
    return {
      minDate: '',
      maxDate: ''
    }
  },
  watch: {
    // on deals list update, recalculates minDate and maxDate of the range
    deals: function(oldDeals, newDeals) {
      this.minDate = ''
      this.maxDate = ''
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
