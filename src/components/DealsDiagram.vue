<template>
  <div class="diagram">
    <ul v-if="sortedDeals.length">
      <Deal v-for="deal of sortedDeals" :key="deal._id" :deal="deal" :minDate="minDate" :maxDate="maxDate" :duration="duration"/>
    </ul>
  </div>
</template>

<script>
import { DateTime, Duration } from 'luxon'
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
      minDate: DateTime.local(),
      maxDate: DateTime.local(),
      duration: Duration.fromObject({ days: 1 }),
      sortedDeals: [],
    }
  },
  watch: {
    deals: function deals() {
      this.transformDealsDates()
      this.calculateEdgeDates()
      this.sortedDeals = this.sortDeals()
    },
  },
  mounted() {
    this.transformDealsDates()
    this.calculateEdgeDates()
    this.sortedDeals = this.sortDeals()
  },
  methods: {
    transformDealsDates() {
      for (const deal of this.deals) {
        deal.startDate = DateTime.fromISO(deal.startDate, { zone: 'utc' })
        deal.endDate = DateTime.fromISO(deal.endDate, { zone: 'utc' })

        if (deal.endDateActual) {
          deal.endDateActual = DateTime.fromISO(deal.endDateActual, { zone: 'utc' })
        }

        if (deal.closingDate) {
          deal.closingDate = DateTime.fromISO(deal.closingDate, { zone: 'utc' })
        }
      }
    },
    calculateEdgeDates() {
      const startDates = []
      const endDates = []

      if (!this.deals.length) return

      for (const deal of this.deals) {
        startDates.push(deal.startDate)
        endDates.push(deal.endDate)
      }

      this.minDate = DateTime.min(...startDates)
      this.maxDate = DateTime.max(...endDates)
      this.duration = this.maxDate.diff(this.minDate)
    },
    sortDeals() {
      return this.deals
      .slice()
      .sort(
        (deal1, deal2) => deal2.priority - deal1.priority ||
          deal1.startDate.diff(deal2.startDate).milliseconds,
      )
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
