import { Cascader } from 'antd'

interface Option {
  value: string
  label: string
  children?: Option[]
}
export default function FormCascader({
  value,
  setValue,
  options,
}: {
  value: string[]
  setValue: any
  options: Option[] | undefined
}) {
  return (
    <Cascader className='form-line-Select' options={options} onChange={setValue} value={value} />
  )
}
