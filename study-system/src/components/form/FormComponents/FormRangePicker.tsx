import { DatePicker } from 'antd'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker
export default function FormRangePicker({ value, setValue }: { value: string[]; setValue: any }) {
  return (
    <RangePicker
      className='form-line-RangePicker'
      defaultValue={[dayjs(value[0]), dayjs(value[1])]}
      onChange={(_dates, dateStrings: [string, string]) => {
        const dates = [
          new Date(dateStrings[0]).toISOString(),
          new Date(dateStrings[1]).toISOString(),
        ]
        setValue(dates)
      }}
      showTime
    />
  )
}
