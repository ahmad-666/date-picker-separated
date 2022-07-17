<template>
  <div>
    <v-form
      ref="myForm"
      v-model="validity"
      class="d-block"
      @submit.prevent="submitHandler"
    >
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="3">
            <date-picker-separated
              v-model="date1"
              type="jalali"
              display-type="jalali"
              :min="min"
              :max="max"
              jalali-format="jYYYY-jMM-jDD"
              gregory-format="YYYY-MM-DD"
              :rules="rules"
              order="asc"
            ></date-picker-separated>
          </v-col>
        </v-row>
      </v-container>

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
      date: '1400-10-10',
      min: '1395-10-10',
      max: '1401-04-18',
      // date1: '2020-03-05',
      // min: '2019-10-10',
      // max: '2023-10-10',
    }
  },
  computed: {
    rules() {
      return [isRequired]
    },
    containerWidth() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return '96%'
      } else {
        return '1200px'
      }
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
