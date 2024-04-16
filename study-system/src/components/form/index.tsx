import { Button, notification, Tag } from 'antd'
import { useEffect, useRef, useState } from 'react'
import ReactUEditorComponent from 'react-ueditor-component'
import FormInput from './FormComponents/FormInput'
import FormImage from './FormComponents/FormImage'
import FormRangePicker from './FormComponents/FormRangePicker'
import './index.scss'
import FormSelect from './FormComponents/FormSelect'
import { DefaultOptionType } from 'antd/es/select'
import { useUrlChange } from '@/utils/editor'
import FormCascader from './FormComponents/FormCascader'
import FormDatePicker from './FormComponents/FormDatePicker'

interface Option {
  value: string
  label: string
  children?: Option[]
}
export type formLineType = {
  key: string
  type: 'Input' | 'Html' | 'Image' | 'RangePicker' | 'Select' | 'Cascader' | 'DatePicker'
  changeValue: any
  value: any
  necessary: boolean
  tip?: string
  btnText?: string
  options?: DefaultOptionType[] | Option[]
}
export default function Form({
  formLines,
  submitText = '提交',
  submitFunc,
}: {
  formLines: formLineType[]
  submitFunc: any
  submitText?: string
}) {
  const [url_change] = useUrlChange()
  const htmlContent = useRef('')
  const [firstHtml, setFirstHtml] = useState(true)
  useEffect(() => {
    if (firstHtml) {
      htmlContent.current = formLines.find((val) => val.type === 'Html')?.value || ''
      setFirstHtml(false)
    }
  }, [firstHtml, formLines])
  const lineValueDiv = (line: formLineType) => {
    switch (line.type) {
      case 'Input':
        return <FormInput value={line.value} setValue={line.changeValue} />
      case 'Image':
        return <FormImage value={line.value} setValue={line.changeValue} btnText={line.btnText} />
      case 'Html':
        return (
          <ReactUEditorComponent
            value={htmlContent.current}
            onChange={async (e: any) => {
              htmlContent.current = e
            }}
            ueditorOptions={{
              serverOptions: {
                filterStyle: false,
                allowCss: true,
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 500,
                // 初始容器宽度
                initialFrameWidth: 400,
                /* 上传图片配置项 */
                imageActionName: 'uploadimage' /* 执行上传图片的action名称 */,
                imageFieldName: 'file' /* 提交的图片表单名称 */,
                imageMaxSize: 2048000 /* 上传大小限制，单位B */,
                imageAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'] /* 上传图片格式显示 */,
                imageCompressEnable: true /* 是否压缩图片,默认是true */,
                imageCompressBorder: 1600 /* 图片压缩最长边限制 */,
                imageInsertAlign: 'none' /* 插入的图片浮动方式 */,
                imageUrlPrefix: '' /* 图片访问路径前缀 */,
                imageResponseKey: 'fileURL', //! 图片上传接口response中包含图片路径的键名
                catchRemoteImageEnable: true,
                whitList: {
                  section: ['class', 'style'],
                  img: [
                    'src',
                    'alt',
                    'title',
                    'width',
                    'height',
                    'id',
                    '_src',
                    'loadingclass',
                    'class',
                    'data-latex',
                    'style',
                  ],
                },
              },
            }}
          />
        )
      case 'RangePicker':
        return <FormRangePicker value={line.value} setValue={line.changeValue} />
      case 'Select':
        return <FormSelect value={line.value} setValue={line.changeValue} options={line.options} />
      case 'Cascader':
        return (
          <FormCascader
            value={line.value}
            setValue={line.changeValue}
            options={line.options as Option[]}
          />
        )
      case 'DatePicker':
        return <FormDatePicker value={line.value} setValue={line.changeValue} />
    }
  }
  const dataMake = () => {
    try {
      formLines.forEach((value) => {
        if (value.necessary)
          switch (value.type) {
            case 'Input':
              if (value.value.length === 0) {
                throw Error(value.key + '为空')
              }
              break
            case 'Image':
              if (value.value.length === 0) {
                throw Error(value.key + '为空')
              }
              break
            case 'Html':
              if (htmlContent.current.length === 0) {
                throw Error(value.key + '为空')
              }
              break
            case 'RangePicker':
              if (value.value[0].length === 0 || value.value[1].length === 0) {
                throw Error(value.key + '为空')
              }
              break
          }
      })
    } catch (error: any) {
      notification.error({
        message: error.message,
        duration: 2,
      })
      return false
    }
    return true
  }
  return (
    <div className='form'>
      {formLines.map((line) => (
        <div className='form-line' key={line.key}>
          <p className='form-line-key'>
            {line.necessary && <Tag color='#108ee9'>必要</Tag>}
            {line.key}
          </p>
          {lineValueDiv(line)}
          {line.tip && <p className='form-line-tip'>{line.tip}</p>}
        </div>
      ))}
      <Button
        size='large'
        type='primary'
        className='form-submitBtn'
        onClick={async () => {
          if (!dataMake()) return
          if (htmlContent.current !== '') {
            formLines
              .find((val) => val.type === 'Html')
              ?.changeValue(await url_change(htmlContent.current))
          }
          submitFunc()
        }}
      >
        {submitText}
      </Button>
    </div>
  )
}
