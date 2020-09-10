export function debounce(func,delay) { /**防抖函数,避免刷新频繁 */
  let timer = null
  return function(...args){//args代表可以传入多个参数，这里暂时没有参数，但不影响
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    },delay)
  }
}

// 正则表达式：字符串匹配 利器
export function formatDate(date, fmt) {
  //1.获取年份
  //y+：匹配一个或者多个y
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    //fmt = fmt.replace('yyyy', ('2019').substr(4 - 4)); substr是截取
  }
  //2.获取
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      //
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
  //return ('00' + 4).substr(str.length);  //传入：4 结果是：04  保证一定有两位
}