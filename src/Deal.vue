<template>
<li class="deal">
  <div class="deal-data">
    <span class="deal-name">{{ deal.name }}</span>
    <div class="deal-status">
      {{ deal.status }}<br>
      {{ currentStatus }}
    </div>
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
    currentStatus: function currentStatus() {
      const today = DateTime.local().setZone('utc').set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      
      if (this.deal.closingDate) return 'Выполнено'
      if (this.deal.startDate > today) return 'Планируется'
      if (this.deal.endDate >= today) return 'В работе'
      if (this.deal.endDate < today && !this.deal.endDateActual) {
        return `Просрочено на ${this.calculateDelay(today, this.deal.endDate)} дней`
      }
      if (+this.deal.endDateActual === +today && !this.deal.closingDate) {
        return `Ожидается закрытие актов`
      }
      if (this.deal.endDateActual && !this.deal.closingDate) {
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
      const timeFromStartDate = endDate.diff(startDate).milliseconds
      const width = Math.round((timeFromStartDate / totalTime.milliseconds) * 100)
      return width < 1 ? 1 : width
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
  display: block;
  width: 100%;
  --marg: var(--margin, 5px 0);
  margin: var(--marg);
  padding: 0;
  padding-top: 10px;
  box-sizing: border-box;
  border: 1px solid #bdbdbd;
  border-radius: 3px;
  box-shadow: 0px 0px 7px #bdbdbd;
}

.progress-container {
  --timelineCol: var(--timelineColor, rgb(201, 201, 201));
  --progressCol: var(--progressColor, green);
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
  background-color: var(--timelineCol);
}

.deal-progress {
  position: absolute;
  bottom: 0;
  height: 10px;
  background-color: var(--progressCol);
  z-index: 3;
}

.deal-data {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 30px;
}

.deal-name {
  order: 1;
  flex-grow: 5;
}

.deal-status {
  order: 2;
  flex-grow: 1;
  text-align: right;
}
</style>