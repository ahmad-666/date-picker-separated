import jalaliday from 'jalaliday'
export default ({ $dayjs }) => {
    $dayjs.extend(jalaliday).calendar('gregory') // default parse as gregory ,, default locale inside nuxt.config
    // $dayjs.extend(jalaliday).calendar('jalali') // default parse as jalali
}