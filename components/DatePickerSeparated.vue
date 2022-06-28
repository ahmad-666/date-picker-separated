<template>
  <div>
    <div class="d-flex justify-space-between align-center flex-wrap">
      <p class="text-subtitle-1 textColor--text">
        {{ title }}
      </p>
      <v-btn v-if="clearable" text small @click="clearHandler">
        <v-icon size="20" color="textColor">mdi-close</v-icon>
      </v-btn>
    </div>
    <div
      class="mt-2 rounded-lg d-flex align-stretch"
      :style="{
        height,
        border: `1px solid ${textColor}`,
      }"
    >
      <v-autocomplete
        ref="day"
        v-model="day"
        :items="days"
        :label="type === 'jalali' ? 'روز' : 'day'"
        solo
        flat
        background-color="transparent"
        :rules="rules.isRequired"
        :no-data-text="noDataText"
        :menu-props="{
          contentClass: 'direction-ltr',
        }"
        :reverse="type !== 'jalali'"
        :style="{
          'flex-grow': 1,
        }"
        @change="dayChange"
      ></v-autocomplete>
      <v-divider vertical class="flex-shrink-0 mx-2"></v-divider>
      <v-autocomplete
        ref="month"
        v-model="month"
        :items="months"
        :label="type === 'jalali' ? 'ماه' : 'month'"
        background-color="transparent"
        solo
        flat
        :rules="rules.isRequired"
        :no-data-text="noDataText"
        :menu-props="{
          contentClass: type === 'jalali' ? 'direction-rtl' : 'direction-ltr',
        }"
        :reverse="type !== 'jalali'"
        :style="{
          'flex-grow': 2,
        }"
        @change="monthChange"
      ></v-autocomplete>
      <v-divider vertical class="flex-shrink-0 mx-2"></v-divider>
      <v-autocomplete
        ref="year"
        v-model="year"
        :items="years"
        :label="type === 'jalali' ? 'سال' : 'year'"
        background-color="transparent"
        solo
        flat
        :reverse="type !== 'jalali'"
        :rules="rules.isRequired"
        :no-data-text="noDataText"
        :menu-props="{
          contentClass: 'direction-ltr',
        }"
        :style="{
          'flex-grow': 1,
        }"
        @change="yearChange"
      ></v-autocomplete>
    </div>
    <v-alert
      v-model="showAlert"
      class="mt-5"
      width="550"
      max-width="100%"
      dismissible
      type="error"
      dense
      dark
    >
      <p class="text-body-2">
        {{ alertText }}
      </p>
    </v-alert>
  </div>
</template>
<script>
// we work with 'YYYY/MM/DD' format in this component
import { isRequired } from '~/utils/formValidation'
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '55px',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: null,
      validator: (val) => {
        if (val === null || typeof val === 'string') return true
        return false
      },
    },
    type: {
      type: String, // 'jalali','gregorian'
      default: 'jalali',
    },
    min: {
      type: String,
      default: null,
      validator: (val) => {
        if (val === null || typeof val === 'string') return true
        return false
      },
    },
    max: {
      type: String,
      default: null,
      validator: (val) => {
        if (val === null || typeof val === 'string') return true
        return false
      },
    },
  },
  emits: ['input'],
  data() {
    return {
      showAlert: null,
      alertText: null,
      year: null,
      month: null,
      day: null,
      rules: {
        isRequired: [],
      },
    }
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark === true ? 'dark' : 'light'
    },
    textColor() {
      return this.$vuetify.theme.themes[this.theme].textColor
    },
    noDataText() {
      if (this.type === 'jalali') return 'نتیجه ای پیدا نشد'
      else return 'no data available'
    },
    minDate() {
      if (this.min) return this.min
      else
        return this.$moment().clone().subtract(100, 'year').format(this.format)
    },
    maxDate() {
      if (this.max) return this.max
      else return this.$moment().clone().add(100, 'year').format(this.format)
    },
    format() {
      if (this.type === 'jalali') return 'jYYYY/jMM/jDD'
      else return 'YYYY/MM/DD'
    },
    yearFormat() {
      if (this.type === 'jalali') return 'jYYYY'
      else return 'YYYY'
    },
    monthFormat() {
      if (this.type === 'jalali') return 'jMM'
      else return 'MM'
    },
    monthNameFormat() {
      if (this.type === 'jalali') return 'jMMMM'
      else return 'MMMM'
    },
    dayFormat() {
      if (this.type === 'jalali') return 'jDD'
      else return 'DD'
    },
    minYear() {
      return +this.$moment(this.minDate, this.format).format(this.yearFormat)
    },
    maxYear() {
      return +this.$moment(this.maxDate, this.format).format(this.yearFormat)
    },
    minMonth() {
      return +this.$moment(this.minDate, this.format).format(this.monthFormat)
    },
    maxMonth() {
      return +this.$moment(this.maxDate, this.format).format(this.monthFormat)
    },
    minDay() {
      return +this.$moment(this.minDate, this.format).format(this.dayFormat)
    },
    maxDay() {
      return +this.$moment(this.maxDate, this.format).format(this.dayFormat)
    },
    years() {
      const years = []
      for (let i = this.maxYear; i >= this.minYear; i--)
        years.push({ value: i.toString(), text: i.toString() })
      return years
    },
    months() {
      let allMonths = []
      if (this.type === 'jalali') {
        allMonths = [
          {
            value: '01',
            text: 'فروردین',
          },
          {
            value: '02',
            text: 'اردیبهشت',
          },
          {
            value: '03',
            text: 'خرداد',
          },
          {
            value: '04',
            text: 'تیر',
          },
          {
            value: '05',
            text: 'مرداد',
          },
          {
            value: '06',
            text: 'شهریور',
          },
          {
            value: '07',
            text: 'مهر',
          },
          {
            value: '08',
            text: 'آبان',
          },
          {
            value: '09',
            text: 'آذر',
          },
          {
            value: '10',
            text: 'دی',
          },
          {
            value: '11',
            text: 'بهمن',
          },
          {
            value: '12',
            text: 'اسفند',
          },
        ]
      } else {
        allMonths = [
          {
            value: '01',
            text: 'January',
          },
          {
            value: '02',
            text: 'February',
          },
          {
            value: '03',
            text: 'March',
          },
          {
            value: '04',
            text: 'April',
          },
          {
            value: '05',
            text: 'May',
          },
          {
            value: '06',
            text: 'June',
          },
          {
            value: '07',
            text: 'July',
          },
          {
            value: '08',
            text: 'August',
          },
          {
            value: '09',
            text: 'September',
          },
          {
            value: '10',
            text: 'October',
          },
          {
            value: '11',
            text: 'November',
          },
          {
            value: '12',
            text: 'December',
          },
        ]
      }
      if (+this.year === this.minYear)
        return allMonths.map((m) => {
          return {
            ...m,
            disabled: +m.value < this.minMonth,
          }
        })
      else if (+this.year === this.maxYear)
        return allMonths.map((m) => {
          return {
            ...m,
            disabled: +m.value > this.maxMonth,
          }
        })
      else return allMonths
    },
    days() {
      const days = []
      if (!this.year || !this.month) {
        for (let i = 1; i <= 31; i++) {
          days.push({
            value: i < 10 ? `0${i}` : i,
            text: i,
          })
        }
        return days
      } else {
        const daysInMonth =
          this.type === 'jalali'
            ? this.$moment.jDaysInMonth(+this.year, +this.month - 1)
            : this.$moment(
                `${this.year}/${this.month}`,
                `${this.yearFormat}/${this.monthFormat}`
              ).daysInMonth()
        for (let i = 1; i <= daysInMonth; i++) {
          days.push({
            value: i < 10 ? `0${i}` : i.toString(),
            text: i.toString(),
          })
        }
        if (+this.year === this.minYear && +this.month === this.minMonth) {
          return days.map((d) => {
            return {
              ...d,
              disabled: +d.value < this.minDay,
            }
          })
        } else if (
          +this.year === this.maxYear &&
          +this.month === this.maxMonth
        ) {
          return days.map((d) => {
            return {
              ...d,
              disabled: +d.value > this.maxDay,
            }
          })
        } else return days
      }
    },
    localValue() {
      return {
        year: this.year?.toString(),
        month: this.month?.toString(),
        day: this.day?.toString(),
      }
    },
  },
  watch: {
    isRequired: {
      immediate: true,
      handler(val) {
        if (val) this.rules.isRequired = [isRequired]
        else this.rules.isRequired = []
      },
    },
    value: {
      immediate: true,
      handler(val) {
        if (!val) {
          this.year = null
          this.month = null
          this.day = null
        } else {
          const m = this.$moment(val, this.format)
          this.year = m.format(this.yearFormat).toString()
          this.month = m.format(this.monthFormat).toString()
          this.day = m.format(this.dayFormat).toString()
        }
      },
    },
    localValue: {
      immediate: true,
      deep: true,
      async handler(newVal) {
        const newYear = newVal?.year
        const newMonth = newVal?.month
        const newDay = newVal?.day
        if (newYear && newMonth && newDay) {
          const newDate = `${newYear}/${newMonth}/${newDay}`
          const m = this.$moment(newDate, this.format)
          if (!m.isValid()) {
            this.day = null
          } else {
            const beforeM = this.$moment(this.minDate, this.format)
            const afterM = this.$moment(this.maxDate, this.format)
            const isBefore = m.isBefore(beforeM)
            const isAfter = m.isAfter(afterM)
            if (isBefore || isAfter) {
              this.showAlert = true
              this.alertText = `تاریخ انتخابی باید بین ${this.$moment(
                beforeM
              ).format(this.format)} و ${this.$moment(afterM).format(
                this.format
              )} باشند`
              await this.$nextTick()
              this.day = null
            } else {
              this.showAlert = false
              this.alertText = null
              this.$emit('input', newDate)
            }
          }
        }
      },
    },
  },
  methods: {
    async clearHandler() {
      this.year = null
      this.month = null
      this.day = null
      await this.$nextTick()
      this.$emit('input', null)
    },
    dayChange() {
      if (this.type === 'jalali') this.$refs.month.focus()
      else return null
    },
    monthChange() {
      if (this.type === 'jalali') this.$refs.year.focus()
      else return this.$refs.day.focus()
    },
    yearChange() {
      if (this.type === 'jalali') return null
      else this.$refs.month.focus()
    },
  },
}
</script>
<style lang="scss">
.direction-ltr {
  direction: ltr !important;
}
.direction-rtl {
  direction: rtl !important;
}
</style>
