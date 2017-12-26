<template>
<li class="deal">
  <div class="deal-data">
    <span>{{ deal.name }}</span>
    <span class="right">
      {{ deal.status }} <br/>
      {{ currentStatus }}
    </span>
  <span class="clear"></span>
  </div>
  <div class="progress-container">
    <div class="timeline"></div>
    <div class="deal-progress" :style="progressStyles"></div>
  </div>
</li>
</template>

<script>
export default {
  name: 'Deal',
  props: ['deal', 'minDate', 'maxDate'],
  computed: {
    // compute the status depending on finish dates
    currentStatus: function currentStatus() {
      return 'Просрочено на 20 дней'
    },
    lineDuration: function lineDuration() {
      return this.maxDate.diff(this.minDate)
    },
    emptyBeforeWidth: function emptyBeforeWidth() {
      return this.calculateWidthPercentageFromDates(this.minDate,
      this.deal.startDate, this.lineDuration)
    },
    progressWidth: function progressWidth() {
      return this.calculateWidthPercentageFromDates(this.deal.startDate,
        this.deal.endDate, this.lineDuration)
    },
    progressStyles: function progressStyles() {
      return {
        left: `${this.emptyBeforeWidth}%`,
        width: `${this.progressWidth}%`,
      }
    },
  },
  methods: {
    calculateWidthPercentageFromDates(startDate, endDate, totalTime) {
      const timeFromStartDate = endDate.diff(startDate).toObject().milliseconds
      return Math.round((timeFromStartDate / totalTime.toObject().milliseconds) * 100)
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
  margin-bottom: 20px;
}

</style>