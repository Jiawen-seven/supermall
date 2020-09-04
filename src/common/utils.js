export function debounce(func,delay) { /**防抖函数,避免刷新频繁 */
  let timer = null
  return function(...args){//args代表可以传入多个参数，这里暂时没有参数，但不影响
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    },delay)
  }
}