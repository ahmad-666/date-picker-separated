<template>
  <div>
    <div
      v-if="clearable && title"
      class="d-flex justify-space-between align-center flex-wrap mb-2"
    >
      <p class="text-subtitle-1 textColor--text">
        {{ title }}
      </p>
      <v-btn v-if="clearable" text small @click="clearHandler">
        <v-icon size="20" color="textColor">mdi-close</v-icon>
      </v-btn>
    </div>
    <div class="d-flex flex-nowrap align-stretch">
      <v-autocomplete
        ref="day"
        v-model="day"
        :items="days"
        :label="displayType === 'jalali' ? 'روز' : 'day'"
        outlined
        class="form-elm-direction-ltr date-picker-form-elm rounded-r-lg rounded-l-0"
        :class="{
          [`${fontCssClass}`]: true,
        }"
        :style="{
          width: '25%',
        }"
        :height="height"
        hide-details
        :dense="dense"
        background-color="transparent"
        :no-data-text="noDataText"
        :menu-props="{
          contentClass: 'direction-ltr date-separated-menu',
          value: showDayMenu,
        }"
        :reverse="displayType !== 'jalali'"
        @change="dayChange"
        @blur="dayBlur"
        @focus="dayFocus"
      ></v-autocomplete>
      <v-autocomplete
        ref="month"
        v-model="month"
        :items="months"
        :label="displayType === 'jalali' ? 'ماه' : 'month'"
        background-color="transparent"
        outlined
        :height="height"
        :dense="dense"
        :no-data-text="noDataText"
        class="date-picker-form-elm rounded-0"
        hide-details
        :class="{
          [`${fontCssClass}`]: true,
        }"
        :menu-props="{
          contentClass:
            displayType === 'jalali'
              ? 'direction-rtl date-separated-menu'
              : 'direction-ltr date-separated-menu',
          value: showMonthMenu,
        }"
        :reverse="displayType !== 'jalali'"
        :style="{
          width: '45%',
        }"
        @change="monthChange"
        @blur="monthBlur"
        @focus="monthFocus"
      ></v-autocomplete>
      <v-autocomplete
        ref="year"
        v-model="year"
        :items="years"
        :label="displayType === 'jalali' ? 'سال' : 'year'"
        background-color="transparent"
        outlined
        :height="height"
        :dense="dense"
        hide-details
        :reverse="displayType !== 'jalali'"
        :no-data-text="noDataText"
        class="form-elm-direction-ltr date-picker-form-elm rounded-l-lg rounded-r-0"
        :class="{
          [`${fontCssClass}`]: true,
        }"
        :menu-props="{
          contentClass: 'direction-ltr date-separated-menu',
          value: showYearMenu,
        }"
        :style="{
          width: '30%',
        }"
        @change="yearChange"
        @blur="yearBlur"
        @focus="yearFocus"
      ></v-autocomplete>
    </div>
    <p v-if="errorMsg" class="mt-2 error--text text-caption">
      {{ errorMsg }}
    </p>
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
// import { isRequired } from '~/utils/formValidation'
export default {
  props: {
    title: {
      type: String,
      default: null,
      validator: (val) => {
        if (val === null || typeof val === 'string') return true
        return false
      },
    },
    isRequired: {
      type: Boolean,
      default: false,
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
      type: String, // 'jalali','gregory'
      default: 'gregory',
    },
    displayType: {
      type: String, // 'jalali','gregory'
      default: 'gregory',
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
    dense: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '55px',
    },
    fontCssClass: {
      type: String,
      default: 'text-body-2',
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
      showYearMenu: false,
      showMonthMenu: false,
      showDayMenu: false,
      rules: {
        isRequired: [],
      },
    }
  },
  computed: {
    errorMsg() {
      if (!this.isRequired || (this.day && this.month && this.year)) return null
      else return 'باید تمام مقادیر وارد کنید'
    },
    theme() {
      return this.$vuetify.theme.dark === true ? 'dark' : 'light'
    },
    textColor() {
      return this.$vuetify.theme.themes[this.theme].textColor
    },
    noDataText() {
      if (this.displayType === 'jalali') return 'نتیجه ای پیدا نشد'
      else return 'no data available'
    },
    minDate() {
      if (this.min) {
        return this.$moment(this.min, this.modelFormat).format(this.format)
      } else
        return this.$moment().clone().subtract(100, 'year').format(this.format)
    },
    maxDate() {
      if (this.max)
        return this.$moment(this.max, this.modelFormat).format(this.format)
      else return this.$moment().clone().add(100, 'year').format(this.format)
    },
    format() {
      if (this.displayType === 'jalali') return 'jYYYY/jMM/jDD'
      else return 'YYYY/MM/DD'
    },
    modelFormat() {
      if (this.type === 'jalali') return 'jYYYY/jMM/jDD'
      else return 'YYYY/MM/DD'
    },
    yearFormat() {
      if (this.displayType === 'jalali') return 'jYYYY'
      else return 'YYYY'
    },
    monthFormat() {
      if (this.displayType === 'jalali') return 'jMM'
      else return 'MM'
    },
    monthNameFormat() {
      if (this.displayType === 'jalali') return 'jMMMM'
      else return 'MMMM'
    },
    dayFormat() {
      if (this.displayType === 'jalali') return 'jDD'
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
      if (this.displayType === 'jalali') {
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
          this.displayType === 'jalali'
            ? this.$moment.jDaysInMonth(+this.year, +this.month - 1)
            : this.$moment(
                `${this.year}/${this.month}`,
                `${this.yearFormat}/${this.monthFormat}`
              ).daysInMonth()

        for (let i = 1; i <= daysInMonth; i++) {
          const value = i < 10 ? `0${i}` : i.toString()
          const isLessThanMin =
            (+this.year <= this.minYear && +this.month < this.minMonth) ||
            (+this.year <= this.minYear &&
              +this.month === this.minMonth &&
              +value < this.minDay)
          const isMoreThanMax =
            (+this.year >= this.maxYear && +this.month > this.maxMonth) ||
            (+this.year >= this.maxYear &&
              +this.month === this.maxMonth &&
              +value > this.maxDay)
          days.push({
            value,
            text: i.toString(),
            disabled: isLessThanMin || isMoreThanMax,
          })
        }
        return days
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
    // isRequired: {
    //   immediate: true,
    //   handler(val) {
    //     if (val) this.rules.isRequired = [isRequired]
    //     else this.rules.isRequired = []
    //   },
    // },
    value: {
      immediate: true,
      handler(val) {
        if (!val) {
          this.year = null
          this.month = null
          this.day = null
        } else {
          const m = this.$moment(val, this.modelFormat)
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
              this.$emit('input', m.format(this.modelFormat))
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
    yearFocus() {
      this.$refs.year.focus()
      this.$refs.year.isMenuActive = true
      this.showYearMenu = true
    },
    yearBlur() {
      this.$refs.year.blur()
      this.$refs.year.isMenuActive = false
      this.showYearMenu = false
    },
    monthFocus() {
      this.$refs.month.focus()
      this.$refs.month.isMenuActive = true
      this.showMonthMenu = true
    },
    monthBlur() {
      this.$refs.month.blur()
      this.$refs.month.isMenuActive = false
      this.showMonthMenu = false
    },
    dayFocus() {
      this.$refs.day.focus()
      this.$refs.day.isMenuActive = true
      this.showDayMenu = true
    },
    dayBlur() {
      this.$refs.day.blur()
      this.$refs.day.isMenuActive = false
      this.showDayMenu = false
    },
    yearChange() {
      if (this.year) {
        this.yearBlur()
      } else {
        this.yearFocus()
      }
      if (!this.month) {
        this.monthFocus()
      } else if (!this.day) {
        this.dayFocus()
      }
    },
    monthChange() {
      if (this.month) {
        this.monthBlur()
      } else {
        this.monthFocus()
      }
      if (!this.day) {
        this.dayFocus()
      } else if (!this.year) {
        this.yearFocus()
      }
    },
    dayChange() {
      if (this.day) {
        this.dayBlur()
      } else {
        this.dayFocus()
      }
      if (!this.year) {
        this.yearFocus()
      } else if (!this.month) {
        this.monthFocus()
      }
    },
  },
}
</script>
<style lang="scss">
.direction-ltr,
.form-elm-direction-ltr input {
  direction: ltr !important;
}
.direction-rtl,
.form-elm-direction-rtl input {
  direction: rtl !important;
}
.date-picker-form-elm {
  .v-input__slot {
    padding: 0px 5px !important;
  }
  input {
    min-width: initial !important;
  }
}
.date-separated-menu {
  .v-list-item {
    padding: 0px 5px !important;
  }
}
</style>
