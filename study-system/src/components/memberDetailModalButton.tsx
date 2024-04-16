import React from 'react'
import { Modal, Button } from 'antd'

export default function MemberDetailModalButton({
  jsxElement,
  btnText,
  btnType = 'default',
}: {
  jsxElement: JSX.Element
  btnText: string
  btnType?: 'default' | 'link' | 'text' | 'ghost' | 'primary' | 'dashed' | undefined
}) {
  const [visible, setVisible] = React.useState(false)

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
      <Modal
        forceRender
        onCancel={onClose}
        onOk={onClose}
        cancelButtonProps={{ style: { display: 'none' } }}
        open={visible}
      >
        {jsxElement}
      </Modal>
    </div>
  )
}
