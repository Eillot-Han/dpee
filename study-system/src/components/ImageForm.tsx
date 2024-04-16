import FormImage from '@/components/form/FormComponents/FormImage'

export const ImageForm: React.FC<{
  value: string
  onChange: (<T = any>(value: T) => void) | undefined
}> = ({ value, onChange }) => {
  return (
    <FormImage
      value={value}
      setValue={(e: string) => {
        onChange && onChange(e)
      }}
      btnText={'上传'}
    />
  )
}
