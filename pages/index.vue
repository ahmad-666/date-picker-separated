<template>
  <div>
    <date-picker-separated
      v-model="date"
      type="gregorian"
      title="date"
      is-required
      clearable
      min="2008/10/10"
      max="2025/01/01"
    ></date-picker-separated>
  </div>
</template>
<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      date: '2020/10/10',
    }
  },
}
</script>
