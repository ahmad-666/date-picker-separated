<template>
  <div
    :class="{
      'gregory-date-picker-separated': displayType === 'gregory',
      'jalali-date-picker-separated': displayType === 'jalali',
    }"
  >
    <div
      v-if="title"
      class="d-flex justify-space-between align-center flex-wrap mt-n7 mb-2"
    >
      <span class="text-caption textColor--text">
        {{ title }}
      </span>
      <!-- <v-btn v-if="clearable" text small @click="clearHandler">
        <v-icon size="20" color="textColor">mdi-close</v-icon>
      </v-btn> -->
    </div>
    <div class="d-flex flex-nowrap align-stretch">
      <v-autocomplete
        ref="day"
        v-model="day"
        auto-select-first
        hide-details
        :search-input.sync="daySearch"
        :items="days"
        :label="displayType === 'jalali' ? 'روز' : 'day'"
        outlined
        class="form-elm-direction-ltr date-picker-form-elm day rounded-r-lg rounded-l-0"
        :height="height"
        :style="{
          flex: '4 1 0 !important',
        }"
        :dense="dense"
        background-color="transparent"
        :no-data-text="noDataText"
        :menu-props="{
          contentClass: 'direction-ltr date-separated-menu',
          value: showDayMenu,
          closeOnClick: false,
          closeOnContentClick: true,
        }"
        :reverse="displayType !== 'jalali'"
        :rules="rules"
        @update:search-input="searchHandler('day')"
        @change="dayChange"
        @blur="blurHandler('day')"
        @focus="focusHandler('day')"
        @click:append="clickAppend('day')"
      ></v-autocomplete>
      <v-autocomplete
        ref="month"
        v-model="month"
        auto-select-first
        hide-details
        :style="{
          flex: '7 1 0 !important',
        }"
        :search-input.sync="monthSearch"
        :items="months"
        :label="displayType === 'jalali' ? 'ماه' : 'month'"
        background-color="transparent"
        outlined
        :height="height"
        :rules="rules"
        :dense="dense"
        :no-data-text="noDataText"
        class="date-picker-form-elm month rounded-0"
        :menu-props="{
          contentClass:
            displayType === 'jalali'
              ? 'direction-rtl date-separated-menu'
              : 'direction-ltr date-separated-menu',
          value: showMonthMenu,
          closeOnClick: false,
          closeOnContentClick: true,
        }"
        :reverse="displayType !== 'jalali'"
        :filter="monthFilter"
        @click:append="clickAppend('month')"
        @update:search-input="searchHandler('month')"
        @change="monthChange"
        @blur="blurHandler('month')"
        @focus="focusHandler('month')"
      ></v-autocomplete>
      <v-autocomplete
        ref="year"
        v-model="year"
        auto-select-first
        hide-details
        :style="{
          flex: '5 1 0 !important',
        }"
        :search-input.sync="yearSearch"
        :rules="rules"
        :items="years"
        :label="displayType === 'jalali' ? 'سال' : 'year'"
        background-color="transparent"
        outlined
        :height="height"
        :dense="dense"
        :reverse="displayType !== 'jalali'"
        :no-data-text="noDataText"
        class="form-elm-direction-ltr date-picker-form-elm year rounded-l-lg rounded-r-0"
        :menu-props="{
          contentClass: 'direction-ltr date-separated-menu',
          value: showYearMenu,
          closeOnClick: false,
          closeOnContentClick: true,
        }"
        @click:append="clickAppend('year')"
        @update:search-input="searchHandler('year')"
        @change="yearChange"
        @blur="blurHandler('year')"
        @focus="focusHandler('year')"
      >
      </v-autocomplete>
    </div>
    <div
      class="d-flex align-center flex-wrap mt-2 mb-4 error--text text-caption"
    >
      <template v-if="showAlert">
        <p class="mb-0">تاریخ انتخابی باید بین</p>
        <p class="mb-0">
          {{ minDate }}
        </p>
        <p class="mb-0">و</p>
        <p class="mb-0">
          {{ maxDate }}
        </p>
        <p class="mb-0">باشد.</p>
      </template>
      <template v-else-if="errorMsg">
        {{ errorMsg }}
      </template>
    </div>
  </div>
</template>
<script>
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
    format: {
      type: String,
      default: 'YYYY-MM-DD',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    order: {
      type: String, // 'asc' | 'dsc'
      default: 'dsc',
    },
  },
  emits: ['input'],
  data() {
    return {
      showAlert: null,
      year: null,
      month: null,
      day: null,
      showYearMenu: false,
      showMonthMenu: false,
      showDayMenu: false,
      mounted: false,
      daySearch: null,
      monthSearch: null,
      yearSearch: null,
    }
  },
  computed: {
    isJalali() {
      return this.type === 'jalali'
    },
    isJalaliLocal() {
      return this.displayType === 'jalali'
    },
    calendar() {
      return this.type
    },
    calendarLocal() {
      return this.displayType
    },
    locale() {
      return this.type === 'jalali' ? 'fa' : 'en'
    },
    localeLocal() {
      return this.displayType === 'jalali' ? 'fa' : 'en'
    },
    yearFormat() {
      return this.format.match(/Y/g).join('')
    },
    monthFormat() {
      return this.format.match(/M/g).join('')
    },
    dayFormat() {
      return this.format.match(/D/g).join('')
    },
    yearHasError() {
      if (this.mounted)
        return this.$refs.year.shouldValidate && this.$refs.year.hasError
      return null
    },
    monthHasError() {
      if (this.mounted)
        return this.$refs.month.shouldValidate && this.$refs.month.hasError
      return null
    },
    dayHasError() {
      if (this.mounted)
        return this.$refs.day.shouldValidate && this.$refs.day.hasError
      return null
    },
    errorMsg() {
      if (this.yearHasError) return 'سال را وارد کنید'
      if (this.monthHasError) return 'ماه را وارد کنید'
      else if (this.dayHasError) return 'روز را وارد کنید'
      else return null
    },
    theme() {
      return this.$vuetify.theme.dark === true ? 'dark' : 'light'
    },
    textColor() {
      return this.$vuetify.theme.themes[this.theme].textColor
    },
    noDataText() {
      return 'نتیجه ای پیدا نشد'
      // if (this.displayType === 'jalali') return 'نتیجه ای پیدا نشد'
      // else return 'no data available'
    },
    minDate() {
      if (this.min) {
        return this.$dayjs(this.min, { jalali: this.isJalali })
          .calendar(this.calendarLocal)
          .locale(this.localeLocal)
          .format(this.format)
      } else
        return this.$dayjs()
          .subtract(100, 'year')
          .calendar(this.calendarLocal)
          .locale(this.localeLocal)
          .format(this.format)
    },
    maxDate() {
      if (this.max)
        return this.$dayjs(this.max, { jalali: this.isJalali })
          .calendar(this.calendarLocal)
          .locale(this.localeLocal)
          .format(this.format)
      else
        return this.$dayjs()
          .add(100, 'year')
          .calendar(this.calendarLocal)
          .locale(this.localeLocal)
          .format(this.format)
    },
    minYear() {
      return +this.$dayjs(this.minDate, { jalali: this.isJalaliLocal })
        .calendar(this.calendarLocal)
        .locale(this.localeLocal)
        .format(this.yearFormat)
    },
    maxYear() {
      return +this.$dayjs(this.maxDate, { jalali: this.isJalaliLocal })
        .calendar(this.calendarLocal)
        .locale(this.localeLocal)
        .format(this.yearFormat)
    },
    minMonth() {
      return +this.$dayjs(this.minDate, { jalali: this.isJalaliLocal })
        .calendar(this.calendarLocal)
        .locale(this.localeLocal)
        .format(this.monthFormat)
    },
    maxMonth() {
      return +this.$dayjs(this.maxDate, { jalali: this.isJalaliLocal })
        .calendar(this.calendarLocal)
        .locale(this.localeLocal)
        .format(this.monthFormat)
    },
    minDay() {
      return +this.$dayjs(this.minDate, { jalali: this.isJalaliLocal })
        .calendar(this.calendarLocal)
        .locale(this.localeLocal)
        .format(this.dayFormat)
    },
    maxDay() {
      return +this.$dayjs(this.maxDate, { jalali: this.isJalaliLocal })
        .calendar(this.calendarLocal)
        .locale(this.localeLocal)
        .format(this.dayFormat)
    },
    years() {
      const years = []
      for (let i = this.maxYear; i >= this.minYear; i--)
        years.push({ value: i.toString(), text: i.toString() })
      return this.order === 'dsc' ? years : years.reverse()
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
        const daysInMonth = this.$dayjs(`${this.year}/${this.month}`, {
          jalali: this.isJalaliLocal,
        }).daysInMonth()
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
    value: {
      immediate: true,
      handler(val) {
        if (!val) {
          this.year = null
          this.month = null
          this.day = null
        } else {
          const d = this.$dayjs(val, { jalali: this.isJalali })
            .calendar(this.calendarLocal)
            .locale(this.localeLocal)
          this.year = d.format(this.yearFormat).toString()
          this.month = d.format(this.monthFormat).toString()
          this.day = d.format(this.dayFormat).toString()
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
          const d = this.$dayjs(newDate, { jalali: this.isJalaliLocal })
          if (!d.isValid()) {
            this.day = null
          } else {
            const beforeD = this.$dayjs(this.minDate, {
              jalali: this.isJalaliLocal,
            })
            const afterD = this.$dayjs(this.maxDate, {
              jalali: this.isJalaliLocal,
            })
            const isBefore = d.isBefore(beforeD)
            const isAfter = d.isAfter(afterD)
            if (isBefore || isAfter) {
              this.showAlert = true
              await this.$nextTick()
              if (this.years.find((y) => y.value === this.year)) {
                this.day = null
              } else this.year = null
            } else {
              this.showAlert = false
              this.$emit('input', d.format(this.format))
            }
          }
        }
      },
    },
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    monthFilter(item, queryText, itemText) {
      return (
        itemText.toLowerCase().includes(queryText.toLowerCase()) ||
        +item.value.includes(+queryText.toLowerCase())
      )
    },
    async clearHandler() {
      this.year = null
      this.month = null
      this.day = null
      await this.$nextTick()
      this.$emit('input', null)
    },
    clickAppend(type) {
      this.focusHandler(type)
    },
    searchHandler(type) {
      let value = null
      if (type === 'year') value = 'yearSearch'
      else if (type === 'month') value = 'monthSearch'
      else if (type === 'day') value = 'daySearch'
      if (this[value]) {
        this[value] = `${this[value]}`.replace(/[۰-۹]/g, (d) =>
          '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)
        )
      } else this[value] = null
    },
    async focusHandler(type) {
      let ref = null
      let menu = null
      if (type === 'year') {
        ref = 'year'
        menu = 'showYearMenu'
      } else if (type === 'month') {
        ref = 'month'
        menu = 'showMonthMenu'
      } else if (type === 'day') {
        ref = 'day'
        menu = 'showDayMenu'
      }
      await this.$nextTick()
      this.$refs[ref].focus()
      this.$refs[ref].isMenuActive = true // this is for activating menu
      this[menu] = true // this is for showing menu
    },
    async blurHandler(type) {
      let ref = null
      let menu = null
      if (type === 'year') {
        ref = 'year'
        menu = 'showYearMenu'
      } else if (type === 'month') {
        ref = 'month'
        menu = 'showMonthMenu'
      } else if (type === 'day') {
        ref = 'day'
        menu = 'showDayMenu'
      }
      await this.$nextTick()
      this.$refs[ref].blur()
      this.$refs[ref].isMenuActive = false
      this[menu] = false
    },
    yearChange() {
      if (this.year) {
        this.blurHandler('year')
      } else {
        this.focusHandler('year')
      }
      if (!this.month) {
        this.focusHandler('month')
      } else if (!this.day) {
        this.focusHandler('day')
      }
    },
    monthChange() {
      if (this.month) {
        this.blurHandler('month')
      } else {
        this.focusHandler('month')
      }
      if (!this.day) {
        this.focusHandler('day')
      } else if (!this.year) {
        this.focusHandler('year')
      }
    },
    dayChange() {
      if (this.day) {
        this.blurHandler('day')
      } else {
        this.focusHandler('day')
      }
      if (!this.year) {
        this.focusHandler('year')
      } else if (!this.month) {
        this.focusHandler('month')
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
  // .v-input__slot {
  //   padding: 0px 2px !important;
  // }
  input {
    min-width: initial !important;
  }
}
// .date-picker-form-elm.day {
//   input {
//     width: 25px !important;
//     // min-width: 25px !important;
//   }
// }

.jalali-date-picker-separated {
  .date-picker-form-elm {
    .v-input__append-inner {
      position: absolute;
      left: -16px;
    }
  }
  .date-picker-form-elm.form-elm-direction-ltr {
    input {
      left: 5px;
    }
  }
}
.gregory-date-picker-separated {
  .date-picker-form-elm {
    .v-input__append-inner {
      position: absolute;
      right: -16px;
    }
  }
  // .date-picker-form-elm.form-elm-direction-ltr {
  //   input {
  //     left: 5px;
  //   }
  // }
}
.date-separated-menu {
  .v-list-item {
    padding: 0px 2px !important;
  }
  .v-list-item__content {
    padding: 12px !important;
  }
}
</style>
