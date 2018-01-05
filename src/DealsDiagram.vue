<template>
  <div class="diagram">
    <ul v-if="sortedDeals.length">
      <Deal v-for="deal of sortedDeals" :key="deal._id" :deal="deal" :minDate="minDate" :maxDate="maxDate" :duration="duration"/>
    </ul>
  </div>
</template>

<script>
import { DateTime, Duration } from 'luxon'
import Deal from './Deal.vue'

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
  computed: {
    sortedDeals: function sortedDeals() {
      return this.deals
      .map(deal => this.transformDealDates(deal))
      .sort(
        (deal1, deal2) => deal2.priority - deal1.priority ||
          deal1.startDate.diff(deal2.startDate).milliseconds,
      )
    },
    minDate: function minDate() {
      if (this.sortedDeals.length) {
        return DateTime.min(...this.sortedDeals.map(deal => deal.startDate))
      }
      return DateTime.local().setZone('utc')
    },
    maxDate: function maxDate() {
      if (this.sortedDeals.length) {
        return DateTime.max(...this.sortedDeals.map(deal => deal.endDate))
      }
      return DateTime.local().setZone('utc')
    },
    duration: function duration() {
      if (this.sortedDeals.length) {
        return this.maxDate.diff(this.minDate)
      }
      return Duration.fromObject({ days: 1 })
    },
  },
  methods: {
    transformDealDates(deal) {
      const newDeal = Object.assign({}, deal)

      newDeal.startDate = DateTime.fromISO(newDeal.startDate, { zone: 'utc' })
      newDeal.endDate = DateTime.fromISO(newDeal.endDate, { zone: 'utc' })

      if (newDeal.endDateActual) {
        newDeal.endDateActual = DateTime.fromISO(newDeal.endDateActual, { zone: 'utc' })
      }

      if (newDeal.closingDate) {
        newDeal.closingDate = DateTime.fromISO(newDeal.closingDate, { zone: 'utc' })
      }

      return newDeal
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.diagram ul {
  list-style-type: none;
  padding: 0;
}
</style>
