// 判断是否为obj对象
function isObj(object: any) {
  return (
    object &&
    typeof object === 'object' &&
    Object.prototype.toString.call(object).toLowerCase() === '[object object]'
  )
}
// 判断是否为数组对象
function isArray(object: any) {
  return object && typeof object === 'object' && object.constructor === Array
}
//获取obj对象的长度
function getLength(object: any) {
  var count = 0
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (var _i in object) count++
  return count
}

export function Compare(objA: any, objB: any) {
  if (!isObj(objA) || !isObj(objB)) return false //判断类型是否正确
  if(getLength(objA) !== getLength(objB)) return false; //判断长度是否一致
  return CompareObj(objA, objB, true) //默认为true
}

function CompareObj(objA: any, objB: any, flag: boolean) {
  for (var key in objA) {
    if (!flag)
      //跳出整个循环
      break
    if (!objB.hasOwnProperty(key)) {
      flag = false
      break
    }
    if (isArray(objA[key])) {
      //子级是数组时,
      if (!isArray(objB[key])) {
        flag = false
        break
      }
      var oA = objA[key],
        oB = objB[key]
      if (oA.length !== oB.length) {
        flag = false
        break
      }
      for (var k in oA) {
        if (!flag)
          //这里跳出循环是为了不让递归继续
          break
        flag = CompareObj(oA[k], oB[k], flag)
      }
    } else if (isObj(objA[key])) {
      //子级是obj时,
      if (!isObj(objB[key])) {
        flag = false
        break
      }
      if (getLength(objA[key]) !== getLength(objB[key])) flag = false //判断长度是否一致
      if (!flag)
        //这里跳出循环是为了不让递归继续
        break
      flag = CompareObj(objA[key], objB[key], true) //默认为true
    } else {
      //子级既不是array,也不是obj,即子级时字符串或者数字
      if (objB[key] !== objA[key]) {
        flag = false
        break
      }
    }
  }
  return flag
}
export function deepCopy(obj: any) {
  if (typeof obj !== 'object' || obj === null) return obj
  let newObj = Array.isArray(obj) ? [...obj] : { ...obj }
  for (let key in newObj) {
    newObj[key] = deepCopy(newObj[key])
  }
  return newObj
}
