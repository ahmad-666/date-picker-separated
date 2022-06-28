<template>
  <div>
    <date-picker-separated
      v-model="date"
      title="date"
      is-required
      clearable
      min="1395/10/10"
      max="1405/01/01"
    ></date-picker-separated>
  </div>
</template>
<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      date: '1400/10/10',
    }
  },
}
</script>
