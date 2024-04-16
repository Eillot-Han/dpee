import { FilterOutlined } from '@ant-design/icons'
import { Button, MenuProps } from 'antd'
import { Dropdown } from 'antd'

function TableDropDown({ items, clickFunc }: { items: MenuProps['items']; clickFunc: any }) {
  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => {
          clickFunc(key)
        },
      }}
      trigger={['click']}
    >
      <Button style={{ padding: 5, marginLeft: 6 }}>
        <FilterOutlined />
      </Button>
    </Dropdown>
  )
}

export default TableDropDown
