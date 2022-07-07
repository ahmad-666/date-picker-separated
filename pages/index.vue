<template>
  <div>
    <v-row class="mt-15 mr-15">
      <v-col cols="3">
        <date-picker-separated
          v-model="date"
          type="jalali"
          is-required
          height="55px"
          min="1395/10/10"
          max="1405/01/01"
        ></date-picker-separated>
      </v-col>
    </v-row>
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
