import { Form, Input, Radio } from 'antd'
import { useState } from 'react'

export default function StatusChangeForm() {
  const [status, setStatus] = useState('APPROVED')
  return (
    <>
      <Form.Item name='status' label='状态' rules={[{ required: true, message: '请选择状态' }]}>
        <Radio.Group
          onChange={(e) => {
            console.log(e)
            setStatus(e.target.value)
          }}
          value={status}
        >
          <Radio value='APPROVED'>通过</Radio>
          <Radio value='REJECTED'>拒绝</Radio>
        </Radio.Group>
      </Form.Item>
      {status === 'REJECTED' && (
        <Form.Item
          name='rejectReason'
          label='拒绝原因'
          rules={[{ required: true, message: '请填写拒绝原因' }]}
        >
          <Input />
        </Form.Item>
      )}
    </>
  )
}
