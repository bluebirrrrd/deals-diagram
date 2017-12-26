<template>
  <div class="diagram">
    <ul>
      <Deal v-for="deal of deals" :key="deal._id" :deal="deal" :minDate="minDate" :maxDate="maxDate"/>
    </ul>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import Deal from './Deal'

export default {
  name: 'DealsDiagram',
  props: {
    deals: {
      default: [],
      type: Array,
    },
  },
  components: {
    Deal,
  },
  data() {
    return {
      minDate: '',
      maxDate: '',
    }
  },
  watch: {
    deals: function deals() {
      this.calculateEdgeDates()
    },
  },
  mounted() {
    this.calculateEdgeDates()
  },
  methods: {
    calculateEdgeDates() {
      this.minDate = ''
      this.maxDate = ''
      const startDates = []
      const endDates = []

      if (!this.deals.length) return

      for (const deal of this.deals) {
        deal.startDate = DateTime.fromISO(deal.startDate)
        deal.endDate = DateTime.fromISO(deal.endDate)

        if (deal.endDateActual) {
          deal.endDateActual = DateTime.fromISO(deal.endDateActual)
        }
        if (deal.closingDate) {
          deal.closingDate = DateTime.fromISO(deal.closingDate)
        }

        startDates.push(deal.startDate)
        endDates.push(deal.endDate)
      }

      this.minDate = DateTime.min(...startDates)
      this.maxDate = DateTime.max(...endDates)
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
