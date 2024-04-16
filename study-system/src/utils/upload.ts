import { GET_OSS_HELPER } from '@/services/queryGQL'
import { useLazyQuery } from '@apollo/client'
import { notification, UploadFile } from 'antd'
import { RcFile } from 'antd/es/upload'

// export const uploadUrl = 'http://121.40.213.115:1338/upload'
export const uploadUrl = 'https://36c-api.ambitions.pro/upload'
export function UploadOneByOne(
  files: UploadFile[],
  successUp: number,
  length: number,
  urls: string[],
) {
  return new Promise((resolve, reject) => {
    function upload(files: UploadFile[], successUp: number, length: number, urls: string[]) {
      if (length === successUp) {
        resolve(urls)
        return
      }
      // data
      const formData = new FormData()
      formData.append('file', files[0].originFileObj as RcFile)
      formData.append('uploadType', 'CONTENT')
      const params = {
        body: formData,
        method: 'POST',
      }

      fetch(uploadUrl, params)
        .then((response: any) => response.json())
        .then((res) => {
          successUp = successUp + 1
          urls = [...urls, res.data[0].url]
          upload(files.splice(0, 1), successUp, length, urls)
        })
        .catch((error) => {
          reject(error)
        })
    }

    upload(files, successUp, length, urls)
  })
}

const checkFile = async (url: string) => {
  return fetch(url, { method: 'HEAD' })
}

export const useOssUpload = () => {
  const [getOssHelper] = useLazyQuery(GET_OSS_HELPER)
  const UploadOneByOne_OSS = (
    files: File[],
    successUp: number,
    length: number,
    urls: string[],
    dir: string,
  ) => {
    return new Promise((resolve: (value: string[]) => void, reject) => {
      function upload(files: File[], successUp: number, length: number, urls: string[]) {
        if (length === successUp) {
          resolve(urls)
          return
        }
        console.log(files[0].name, files)
        const lastName =
          dir === 'xiumi' ? files[successUp].name : new Date().getTime() + '_' + files[successUp].name
        const newUrl = 'https://36c.oss-cn-hangzhou.aliyuncs.com/' + dir + '/' + lastName
        console.log(lastName, '-----lastName')
        if (dir === 'xiumi') {
          checkFile(newUrl).then(() => {
            successUp = successUp + 1
            urls = [...urls, newUrl]
            upload(files, successUp, length, urls)
          })
        }
        getOssHelper()
          .then((ossData) => {
            const { OSSAccessKeyId, policy, signature } = ossData.data.getOssHelper
            const formData = new FormData()
            formData.append('key', dir + '/' + lastName)
            formData.append('policy', policy)
            formData.append('OSSAccessKeyId', OSSAccessKeyId)
            formData.append('signature', signature)
            formData.append('success_action_status', '200')
            formData.append('file', files[successUp])
            fetch('https://36c.oss-cn-hangzhou.aliyuncs.com', {
              method: 'POST',
              body: formData,
            })
              .then((res) => {
                if (res.status === 200) {
                  successUp = successUp + 1
                  urls = [...urls, newUrl]
                  upload(files, successUp, length, urls)
                } else throw Error('失败')
              })
              .catch((err) => {
                notification.error({
                  message: err,
                  duration: 2,
                })
                console.log(err, '======upload err')
                reject(err)
              })
          })
          .catch((err: any) => {
            console.log(err)
            reject(err)
          })
      }

      upload(files, successUp, length, urls)
    })
  }
  return [UploadOneByOne_OSS]
}
