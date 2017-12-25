<template>
<li class="deal">
  {{ deal.name }}
  <span class="right">
    {{ deal.status }} <br/>
    {{ currentStatus }}
  </span>
  <span class="clear"></span>
</li>
</template>

<script>
export default {
  name: 'Deal',
  props: ['deal'],
  computed: {
    // compute the status depending on finish dates
    currentStatus: function currentStatus() {
      return 'Просрочено на 20 дней'
    },
  },
}
</script>

<style scoped>
.deal {
  margin: 5px 0;
  padding: 10px;
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

/* add animation on hover */
</style>