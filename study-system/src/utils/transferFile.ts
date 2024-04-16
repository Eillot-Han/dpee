/**通过Url获取文件
 * @param url 文件地址
 * @param fileName 文件名
 */
export const getFileFromUrl = (url: string, fileName: string) => {
  return new Promise((resolve: (value: File) => void, reject) => {
    var blob = null
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.setRequestHeader('Accept', 'image/png')
    xhr.responseType = 'blob'
    // 加载时处理
    xhr.onload = () => {
      // 获取返回结果
      blob = xhr.response
      let file = new File([blob], fileName, { type: 'image/*' })
      // 返回结果
      resolve(file)
    }
    xhr.onerror = (e) => {
      reject(e)
    }
    // 发送
    xhr.send()
  })
}
