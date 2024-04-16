import React from 'react'
import { Form, Modal, Button, Space } from 'antd'

export default function FormModalButton({
  value,
  jsxElement,
  btnText,
  formSubmit,
  btnType = 'default',
}: {
  value: any
  jsxElement: JSX.Element
  btnText: string
  formSubmit: (arg: any) => void
  btnType?: 'default' | 'link' | 'text' | 'ghost' | 'primary' | 'dashed' | undefined
}) {
  const [form] = Form.useForm()
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (visible) {
      form.setFieldsValue(value)
    }
  }, [form, value, visible])

  function onClose() {
    setVisible(false)
  }
  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true)
        }}
        type={btnType}
      >
        {btnText}
      </Button>
      <Modal forceRender onCancel={onClose} open={visible} footer={false}>
        <Form
          form={form}
          onFinish={(e) => {
            formSubmit(e)
          }}
        >
          {jsxElement}
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
              <Button htmlType='reset'>重置</Button>
              <Button onClick={onClose}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
