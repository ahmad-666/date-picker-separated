<template>
  <div>
    <v-row class="mt-15 mr-15">
      <v-col cols="12" md="3" lg="3">
        <date-picker-separated
          v-model="date"
          type="gregory"
          display-type="jalali"
          :is-required="true"
          :min="min"
          :max="max"
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
      // date: '1400/10/10',
      // min: '1395/10/10',
      // max: '1405/10/10',
      date: null,
      min: '2019/10/10',
      max: '2023/10/10',
    }
  },
}
</script>
