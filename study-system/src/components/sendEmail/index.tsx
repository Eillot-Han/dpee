import { useRef, useState } from 'react'
import './index.scss'
import EmailEditor from 'react-email-editor'
import { Button, Input, message, Upload, UploadProps } from 'antd'
import { saveAs } from 'file-saver'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { SEND_EMAIL } from '@/services/mutationGQL'

export default function SendEmail({ email }: { email: string }) {
  const emailEditorRef = useRef<any>(null)
  const [preview, setPreview] = useState(false)
  const [choose, setChoose] = useState(false)
  const [orginJson, setOrginJson] = useState<any>()
  const [subject, setSubject] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [sendEmail] = useMutation(SEND_EMAIL)

  const sendEmailFunc = () => {
    emailEditorRef.current &&
      emailEditorRef.current.editor.exportHtml((data: any) => {
        const { html } = data
        sendEmail({
          variables: {
            data: {
              email,
              subject,
              html,
            },
          },
        })
          .then(() => {
            message.success('发送成功')
          })
          .catch((err) => {
            console.log(err)
            message.error('发送失败')
          })
      })
  }

  const onReady = () => {
    // editor is ready
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
    setLoading(false)
    if (orginJson) {
      emailEditorRef.current?.editor?.loadDesign(orginJson)
    }
  }

  const togglePreview = () => {
    if (preview) {
      emailEditorRef.current?.editor?.hidePreview()
      setPreview(false)
    } else {
      emailEditorRef.current?.editor?.showPreview('desktop')
      setPreview(true)
    }
  }

  const saveAsJson = () => {
    emailEditorRef.current?.editor?.saveDesign((design: JSON) => {
      console.log('saveDesign', design)
      const data = design
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
      saveAs(blob, 'file.json')
    })
  }

  const props: UploadProps = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: () => false,
    onChange(info) {
      try {
        // 获取文件
        const file: any = info.file
        // 实例化 FileReader对象
        const reader = new FileReader()
        reader.onload = function (e: any) {
          // 在onload函数中获取最后的内容
          setOrginJson(JSON.parse(e.target.result))
        }
        // 调用readerAsText方法读取文本
        reader.readAsText(file)
      } catch (error) {
        console.log(error)
      }
    },
    maxCount: 1,
  }
  return !choose ? (
    <div className='emailEditor'>
      <p className='emailEditor-title'>是否选择之前保存的文件</p>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
      <div className='emailEditor-do' style={{ marginTop: 20 }}>
        <Button onClick={() => setChoose(true)}>不选择</Button>
        <Button
          onClick={() => {
            if (orginJson) setChoose(true)
            else {
              message.error('文件无效或未选择文件')
            }
          }}
        >
          选择完毕
        </Button>
      </div>
    </div>
  ) : (
    <div className='emailEditor'>
      <p className='emailEditor-title'>发送邮箱：{email}</p>
      <div className='emailEditor-do'>
        <Button onClick={sendEmailFunc}>发送邮件</Button>
        <Button onClick={togglePreview}>{preview ? '继续编辑' : '查看效果'}</Button>
        <Button onClick={saveAsJson}>保存到本地</Button>
        <Button onClick={() => setChoose(false)}>重新选择</Button>
      </div>
      <div className='emailEditor-do'>
        <p className='emailEditor-font'>主题：</p>
        <Input
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value)
          }}
        />
      </div>
      <div className='emailEditor-editor'>
        {loading && <LoadingOutlined />}
        <EmailEditor ref={emailEditorRef} onReady={onReady} />
      </div>
    </div>
  )
}
