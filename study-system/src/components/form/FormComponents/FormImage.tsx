import { GET_OSS_HELPER } from '@/services/queryGQL'
import { PlusOutlined } from '@ant-design/icons'
import { useLazyQuery } from '@apollo/client'
import { Modal, notification, Upload } from 'antd'
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import { useState } from 'react'

export default function FormImage({
  value,
  setValue,
  btnText = '上传',
  maxNum = 1,
}: {
  value: string
  setValue: any
  btnText?: string
  maxNum?: number
}) {
  const [getOssHelper] = useLazyQuery(GET_OSS_HELPER)
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>(
    value
      ? [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: value,
          },
        ]
      : [],
  )
  const handleUpload = async (option: any) => {
    const file = option.file as File
    try {
      getOssHelper()
        .then((ossData) => {
          const { OSSAccessKeyId, policy, signature } = ossData.data.getOssHelper
          const lastName = new Date().getTime() + '_' + file.name
          const formData = new FormData()
          formData.append('key', 'content/' + lastName)
          formData.append('policy', policy)
          formData.append('OSSAccessKeyId', OSSAccessKeyId)
          formData.append('signature', signature)
          formData.append('success_action_status', '200')
          formData.append('file', file)
          fetch('https://36c.oss-cn-hangzhou.aliyuncs.com', {
            method: 'POST',
            body: formData,
          })
            .then((res) => {
              if (res.status === 200) {
                option.onSuccess('https://36c.oss-cn-hangzhou.aliyuncs.com/content/' + lastName)
                setValue('https://36c.oss-cn-hangzhou.aliyuncs.com/content/' + lastName)
              } else throw Error('失败')
            })
            .catch((err) => {
              notification.error({
                message: err,
                duration: 2,
              })
              option.onError(err)
              console.log(err, '======upload err')
            })
        })
        .catch((err) => {
          console.log(err)
        })
      // onSuccess的回调参数可以在 UploadFile.response 中获取
    } catch (error) {
      option.onError(error)
    }
  }

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (newFileList.length === 0) setValue('')
    setFileList(newFileList)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{btnText}</div>
    </div>
  )
  return (
    <>
      <Upload
        beforeUpload={() => Promise.resolve()}
        listType='picture-card'
        className='form-line-uploader'
        fileList={fileList}
        customRequest={handleUpload}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= maxNum ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}
