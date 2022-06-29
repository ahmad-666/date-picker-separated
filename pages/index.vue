<template>
  <div>
    <v-sheet
      color="transparent"
      class="my-4 mx-auto pa-4"
      width="600"
      max-width="95vw"
    >
      <date-picker-separated
        v-model="date"
        title="date"
        type="jalali"
        is-required
        clearable
        min="1395/10/10"
        max="1405/01/01"
      ></date-picker-separated>
    </v-sheet>
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
