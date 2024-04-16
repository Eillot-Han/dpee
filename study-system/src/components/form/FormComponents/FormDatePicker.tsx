import { DatePicker } from 'antd'
import dayjs from 'dayjs'

export default function FormDatePicker({ value, setValue }: { value: string; setValue: any }) {
  return (
    <DatePicker
      //   className='form-line-RangePicker'
      defaultValue={dayjs(value)}
      onChange={(_dates, dateString) => {
        setValue(new Date(dateString).toISOString())
      }}
      showTime
    />
  )
}
