<template>
<li class="deal">
  <div class="deal-data">
    <span class="deal-name">{{ deal.name }}</span>
    <div class="right deal-status">
      {{ deal.status }}<br>
      {{ currentStatus }}
    </div>
  <span class="clear"></span>
  </div>
  <div class="progress-container" :title="dateString">
    <div class="timeline"></div>
    <div class="deal-progress" :style="progressStyles"></div>
  </div>
</li>
</template>

<script>
import { DateTime, Duration } from 'luxon'

export default {
  name: 'Deal',
  props: {
    deal: {
      default: {},
    },
    minDate: {
      default: DateTime.local(),
    },
    maxDate: {
      default: DateTime.local(),
    },
    duration: {
      default: Duration.fromObject({ days: 1 }),
    },
  },
  computed: {
    // compute the status depending on finish dates
    currentStatus: function currentStatus() {
      const today = DateTime.local().setZone('utc').set({ hour: 0, minute: 0, second: 0, millisecond: 0 })

      if (this.deal.closingDate) return 'Выполнено'
      if (this.deal.startDate > today) return 'Планируется'
      if (this.deal.endDate >= today) return 'В работе'
      if (!this.deal.endDateActual && this.deal.endDate < today) {
        return `Просрочено на ${this.calculateDelay(today, this.deal.endDate)} дней`
      }
      if (!this.deal.closingDate && this.deal.endDateActual < today) {
        return `Акты просрочены на ${this.calculateDelay(today, this.deal.endDateActual)} дней`
      }
      return ''
    },
    emptyBeforeWidth: function emptyBeforeWidth() {
      return this.calculateWidthPercentageFromDates(this.minDate,
      this.deal.startDate, this.duration)
    },
    progressWidth: function progressWidth() {
      return this.calculateWidthPercentageFromDates(this.deal.startDate,
        this.deal.endDate, this.duration)
    },
    progressStyles: function progressStyles() {
      return {
        left: `${this.emptyBeforeWidth}%`,
        width: `${this.progressWidth}%`,
      }
    },
    dateString: function dateString() {
      return `${this.deal.startDate.setLocale('en-gb').toLocaleString()}–${this.deal.endDate.setLocale('en-gb').toLocaleString()}`
    },
  },
  methods: {
    calculateWidthPercentageFromDates(startDate, endDate, totalTime) {
      const timeFromStartDate = endDate.diff(startDate).toObject().milliseconds
      return Math.round((timeFromStartDate / totalTime.toObject().milliseconds) * 100)
    },
    calculateDelay(today, expectedEndDay) {
      const result = today.diff(expectedEndDay, 'days')
      return result.toObject().days
    },
  },
}
</script>

<style scoped>
.deal {
  margin: 5px 0;
  padding: 0;
  padding-top: 10px;
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: 1px solid #bdbdbd;
  border-radius: 3px;
  box-shadow: 0px 0px 7px #bdbdbd;
}

.right {
  float: right;
}

.clear {
  clear: both;
}

.progress-container {
  width: 100%;
  padding: 0;
  margin: 0;
  position: relative;
  bottom: 0;
  left: 0;
}

.timeline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: rgb(201, 201, 201);
}

.deal-progress {
  position: absolute;
  bottom: 0;
  height: 10px;
  background-color: green;
  z-index: 3;
}

.deal-data {
  padding: 10px;
  margin-bottom: 30px;
}
</style>