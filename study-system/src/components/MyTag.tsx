import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Tag } from 'antd'

export function MyTag({
  name,
  color,
  showText,
}: {
  name: string
  color?: string
  showText?: string
}) {
  const tags = [
    { name: 'PENDING', icon: <SyncOutlined />, color: 'processing' },
    { name: 'APPROVED', icon: <CheckCircleOutlined />, color: 'success' },
    { name: 'REJECTED', icon: <CloseCircleOutlined />, color: 'error' },
  ]
  const tag = tags.find((val) => val.name === name)
  return (
    <Tag icon={tag?.icon || undefined} color={color || tag?.color || 'default'}>
      {showText || name}
    </Tag>
  )
}
