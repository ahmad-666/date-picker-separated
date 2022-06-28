export const isRequiredObj = val => {
  const msgError = 'فیلد اجباری است';
  if (val === '' || val === null || typeof val === 'undefined' || !val.value)
    return msgError;
  // 0 is true
  else if (typeof val === 'number') {
    const str = `${val}`;
    if (!str.trim().length) return msgError;
  } else if (typeof val === 'string') {
    if (!val.trim().length) return msgError;
  }
  return true;
};
export const isRequiredArr = val => {
  const msgError = 'فیلد اجباری است';
  if (
    val === '' ||
    val === null ||
    typeof val === 'undefined' ||
    (Array.isArray(val) && !val.length)
  )
    return msgError;
  // 0 is true
  return true;
};
export const justNumber = val => {
  const regEx = /^\d+$/;
  if (!regEx.test(val)) return 'لطفا عدد وارد کنید';
  return true;
};
export const isRequired = val => {
  const msgError = 'فیلد اجباری است';
  if (val === '' || val === null || typeof val === 'undefined' || val === false)
    return msgError;
  // 0 is true
  else if (typeof val === 'number') {
    const str = `${val}`;
    if (!str.trim().length) return msgError;
  } else if (typeof val === 'string') {
    if (!val.trim().length) return msgError;
  }
  return true;
};
export const isSSN = val => {
  const msgError = 'کد ملی معتبر نیست';
  if (!val) return msgError;
  const str = `${val}`;
  if (str.trim().length && str.trim().length === 10) return true;
  return msgError;
};
export const isCreditCard = val => {
  // creditCard is in XXXX-XXXX-XXXX-XXXX format
  // we use v-mask to help us create above format + use type="text" + creditCard must be 16 numbers + 3 '-'
  const msgError = 'شماره کارت معتبر نیست';
  if (!val) return msgError;
  const str = `${val}`;
  if (str.trim().length && str.trim().length === 19) return true;
  return msgError;
};
export const isShaba = val => {
  // shaba with IR is 26chars and without it is 24chars
  // we consider we always use suffix="IR"
  const msgError = 'شماره شبا معتبر نیست';
  if (!val) return msgError;
  const str = `${val}`;
  if (str.trim().length && str.trim().length === 24) return true;
  return msgError;
};
export const isBankAccount = val => {
  const msgError = 'شماره حساب باید بین ۸ الی ۱۴ رقم باشد';
  if (!val) return msgError;
  const str = `${val}`;
  if (str.trim().length >= 8 && str.trim().length <= 14) return true;
  return msgError;
};
export const isBankAccountOrCreditCard = val => {
  const msgError = 'شماره کارت یا شماره حساب معتبر نیست';
  if (!val) return msgError;
  const str = `${val}`;
  if (str.trim().length && str.trim().length <= 19 && str.trim().length >= 8) return true;
  return msgError;
};
export const isEnterSSN = val => {
  const msgError = 'کد ملی معتبر نیست';
  if (!val) return true;
  const str = `${val}`;
  if (str.trim().length && str.trim().length === 10) return true;
  return msgError;
};
export const isMobile = val => {
  // only iran mobile
  const msgError = 'موبایل معتبر نیست';
  if (!val) return msgError;
  else if (typeof val === 'number') {
    const str = `${val}`;
    if ((str.trim().length && str.startsWith('09')) || str.trim().length === 11)
      return true;
  } else if (typeof val === 'string') {
    if (val.trim().length && val.startsWith('09') && val.trim().length === 11)
      return true;
  }
  return msgError;
};
export const isMobileGlobal = val => {
  // global mobile
  const msgError = 'موبایل معتبر نیست';
  const regex = /^(\+|\d)[0-9]{7,16}$/;
  const str = `${val}`;
  const matches = str.match(regex);
  if (!val || !matches) return msgError;
  return true;
};
export const isEnterMobile = val => {
  const msgError = 'موبایل معتبر نیست';
  if (!val) return true;
  else if (typeof val === 'number') {
    const str = `${val}`;
    if ((str.trim().length && str.startsWith('09')) || str.trim().length === 11)
      return true;
  } else if (typeof val === 'string') {
    if (val.trim().length && val.startsWith('09') && val.trim().length === 11)
      return true;
  }
  return msgError;
};
export const isEmail = val => {
  const msgError = 'ایمیل معتبر نیست';
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!val || !val.trim().length || !regEx.test(val)) return msgError;
  return true;
};
export const justEnglishChar = val => {
  if (/[^\w\s-]+$/.test(val)) return 'حروف باید لاتین باشد'  
  return true;
};
export const isEnterEmail = val => {
  const msgError = 'ایمیل معتبر نیست';
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!val) return true;
  if (!regEx.test(val)) return msgError;
  return true;
};
export const isPassword = val => {
  const msgError = 'رمز عبور باید حداقل ۸رقم باشد';
  if (!val) return msgError;
  const str = `${val}`;
  if (str.trim().length < 8) return msgError;
  return true;
};
export const isUsername = val => {
  const msgError = 'نام کاربری باید حداقل 3رقم باشد';
  if (!val) return msgError;
  const str = `${val}`;
  if (str.trim().length < 3) return msgError;
  return true;
};
export const minLength = (val, minLength) => {
  const msgError1 = 'حداقل کاراکتر وارد شده باید';
  const msgError2 = minLength;
  const msgError3 = 'باشد';
  const msgError = msgError1 + msgError2 + msgError3;
  if (!val) return msgError;
  else if (typeof val === 'number') {
    const str = `${val}`;
    if (!str.trim().length || str.trim().length < minLength) return msgError;
  } else if (typeof val === 'string') {
    if (!val.trim().length || val.trim().length < minLength) return msgError;
  }
  return true;
};
export const isLength = (val, length) => {
  const msgError1 = 'تعداد کاراکتر وارد شده باید';
  const msgError2 = length;
  const msgError3 = 'باشد';
  const msgError = msgError1 + msgError2 + msgError3;
  if (!val) return msgError;
  else if (typeof val === 'number') {
    const str = `${val}`;
    if (!str.trim().length || str.trim().length !== length) return msgError;
  } else if (typeof val === 'string') {
    if (!val.trim().length || val.trim().length !== length) return msgError;
  }
  return true;
};
export const isEqual = (val1, val2) => {
  const msgError = 'رمز عبور و تکرار رمز عبور باید یکی باشند';
  if (!val1 || !val2 || val1.trim() !== val2.trim()) return msgError;
  return true;
};
export const isPercent = val => {
  const num = parseFloat(val);
  const msgError = 'باید مقدار بین ۰ تا ۱۰۰ وارد کنید';
  if (num >= 0 && num <= 100) return true;
  return msgError;
};
export const isSSNPassport = val => {
  const msgError = 'مقدار وارد شده کدملی یا شماره پاسپورت نیست'
  const passportRegEx =  /[a-zA-Z]{1}[0-9]{8}/i ;
  if((val && val.trim().length===9 && passportRegEx.test(val)) || (val && val.trim().length === 10)) return true ;
  return msgError 
};
export const isSSNPassportEnter = val => {
  if(!val || (typeof val ==='string' && !val.trim().length)) {
    return true 
  }
  const msgError = 'مقدار وارد شده کدملی یا شماره پاسپورت نیست'
  const passportRegEx =  /[a-zA-Z]{1}[0-9]{8}/i ;
  if((val && val.trim().length===9 && passportRegEx.test(val)) || (val && val.trim().length === 10)) return true ;
  return msgError 
};
