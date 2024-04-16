import { Tooltip, Image, Empty, MenuProps } from 'antd'
import './index.scss'
import TableDropDown from './tableDropDown'

export default function Table({
  data,
  dataColumns,
  bigTitle,
  onColumnClick,
  emptyTip,
  style,
  titleRightJSX = <></>,
}: {
  data: Record<string, any>[]
  dataColumns: {
    title: string
    type?: 'text' | 'image' | 'tag'
    key: string | string[]
    tagColor?: string
    render?: (value: Record<string, any>, index: Number) => JSX.Element
    renderText?: (value: Record<string, any>, index: Number) => String
    chooseItems?: MenuProps['items']
    chooseFunc?: any
  }[]
  emptyTip?: string
  bigTitle: string
  onColumnClick?: (value: Record<string, any>, index: Number) => void
  style?: any
  titleRightJSX?: JSX.Element
}) {
  const getValue = (data: { [key: string]: any }, key: string | string[]): any => {
    if (typeof key === 'string') return data[key]
    if (key.length === 1) return data[key[0]]
    return getValue(data[key[0]], key.slice(1))
  }
  return (
    <div className='table' style={style}>
      {bigTitle && titleRightJSX && (
        <div className='table-top'>
          <div className='table-bigTitle'>{bigTitle}</div>
          <div className='table-top-right'>{titleRightJSX}</div>
        </div>
      )}
      <table style={{ tableLayout: 'auto', width: '100%', borderSpacing: 0 }}>
        <colgroup>
          <col style={{ width: 150 }} />
        </colgroup>
        <thead>
          <tr className='table-title'>
            {dataColumns.map((val, index) => (
              <th key={'title-' + index} scope='col' className='table-title-p'>
                <div>
                  <span>{val.title}</span>
                  {val.chooseItems && (
                    <TableDropDown items={val.chooseItems} clickFunc={val.chooseFunc} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((val, index) => (
              <tr
                data-row-key={index}
                className='table-content'
                key={'data--' + index}
                onClick={() => onColumnClick && onColumnClick(val, index)}
              >
                {dataColumns.map((line, rowIndex) => (
                  <td className='table-content-box' key={'data-' + index + 'line-' + rowIndex}>
                    {line.type === 'image' && (
                      <Image src={getValue(val, line.key)} className='table-content-img' />
                    )}
                    {line.type === 'text' && (
                      <Tooltip title={getValue(val, line.key)}>
                        <p className='table-content-p'>{getValue(val, line.key)}</p>
                      </Tooltip>
                    )}
                    {line.render && line.render(val, index)}
                    {line.renderText && (
                      <Tooltip title={line.renderText(val, index)}>
                        <p className='table-content-p'>{line.renderText(val, index)}</p>
                      </Tooltip>
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={dataColumns.length}>
                <Empty description={emptyTip} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
