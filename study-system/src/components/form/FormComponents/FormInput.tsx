import { Input } from 'antd'

export default function FormInput({ value, setValue }: { value: string; setValue: any }) {
  return (
    <Input placeholder='请输入' className='form-line-Input' onChange={setValue} value={value} />
  )
}
