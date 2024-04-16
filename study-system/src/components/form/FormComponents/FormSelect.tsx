import { Select } from 'antd'
import { DefaultOptionType } from 'antd/es/select'

export default function FormSelect({
  value,
  setValue,
  options,
}: {
  value: string
  setValue: any
  options: DefaultOptionType[] | undefined
}) {
  return <Select className='form-line-Select' options={options} onChange={setValue} value={value} />
}
