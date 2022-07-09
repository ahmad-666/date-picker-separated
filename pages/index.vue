<template>
  <div>
    <v-form ref="myForm" v-model="validity" @submit.prevent="submitHandler">
      <v-row class="mt-15 mr-15">
        <v-col cols="12" md="3" lg="3">
          <date-picker-separated
            v-model="date"
            type="gregory"
            display-type="jalali"
            :min="min"
            :max="max"
            jalali-format="jYYYY-jMM-jDD"
            gregory-format="YYYY-MM-DD"
            :rules="rules"
          ></date-picker-separated>
        </v-col>
      </v-row>
      <v-btn type="submit"> submit</v-btn>
    </v-form>
  </div>
</template>
<script>
import { isRequired } from '~/utils/formValidation'
export default {
  name: 'IndexPage',
  data() {
    return {
      validity: true,
      // date: '1400-10-10',
      // min: '1395-10-10',
      // max: '1401-04-18',
      date: null,
      min: '2019-10-10',
      max: '2023-10-10',
    }
  },
  computed: {
    rules() {
      return [isRequired]
    },
  },
  methods: {
    submitHandler() {
      this.$refs.myForm.validate()
      if (this.validity) {
        console.log('valid')
      } else console.log('not valid')
    },
  },
}
</script>
