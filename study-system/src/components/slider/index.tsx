import { ReactNode } from 'react'
import './index.scss'

export default function Slider({
  contents,
  cardMargin,
  width,
  height,
  borderRadius,
  padding,
}: {
  contents: ReactNode[]
  width: string
  height: string
  borderRadius: string
  padding: string
  cardMargin: string
}) {
  return (
    <div className='tsc-slider'>
      <div className='tsc-slider-wrapper'>
        {contents.map((content, index) => (
          <div
            key={'content-' + index}
            className='tsc-slider-card'
            style={{
              marginRight: `${cardMargin}`,
              width: `${width}`,
              height: `${height}`,
              borderRadius: `${borderRadius}`,
              padding: `${padding}`,
            }}
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  )
}
