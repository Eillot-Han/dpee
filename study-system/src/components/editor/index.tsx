import Quill from 'quill'
import { useEffect } from 'react'
import 'react-quill/dist/quill.snow.css' // 主题样式
import 'react-quill/dist/quill.bubble.css' // 主题样式
import './index.scss'
import ReplaceClass from './utils/string'

// 自定义字体大小
// 增加字体大小配置项
var FontAttributor = Quill.import('attributors/class/size')
FontAttributor.whitelist = ['12', '14', '16', '18', '30']
Quill.register(FontAttributor, true)

export default function Editor({
  toolBarId, //编辑栏id
  editorId, //输入框id
  setHtml,
}: {
  toolBarId: string
  editorId: string
  setHtml: any
}) {
  useEffect(() => {
    const quill = new Quill(`#${editorId}`, {
      placeholder: '请输入内容...',
      theme: 'snow',
      modules: {
        toolbar: {
          container: `#${toolBarId}`,
          handlers: {},
        },
      },
    })

    quill.on('text-change', function (delta: any, _oldDelta: any, source: any) {
      const s = ReplaceClass(quill.container.firstChild.innerHTML)
      setHtml(s)
    })
  }, [editorId, setHtml, toolBarId])
  return (
    <div className='tsc-ed'>
      {/* 搜索栏 */}
      <div id={toolBarId} className='tsc-ed-toolbar'>
        <select className='ql-size'>
          <option value='12' />
          <option value='14' />
          <option value='16' />
          <option value='18' />
          <option value='30' />
        </select>
        <button className='ql-bold' />
        <button className='ql-italic' />
        <button className='ql-underline' />
        <button className='ql-strike' />
        <select className='ql-color'>
          <option value='#FFFFFF' />
          <option value='#fffaf6' />
          <option value='#ffe1cc' />
          <option value='#ff791a' />
          <option value='#ff6a00' />
          <option value='#e65f00' />
          <option value='#f0f2f5' />
          <option value='#ededed' />
          <option value='#d8d8d8' />
          <option value='#b3b3b3' />
          <option value='#999999' />
          <option value='#3d3d3d' />
          <option value='#181818' />
          <option value='#339dff' />
          <option value='#0084ff' />
          <option value='#fcdfd9' />
          <option value='#f15533' />
          <option value='#dff1da' />
          <option value='#63ba4d' />
          <option value='#ffedcc' />
          <option value='#ffa400' />
          <option value='#888888' />
          <option value='#a10000' />
          <option value='#b26b00' />
          <option value='#b2b200' />
          <option value='#006100' />
          <option value='#0047b2' />
          <option value='#6b24b2' />
          <option value='#444444' />
          <option value='#5c0000' />
          <option value='#663d00' />
          <option value='#666600' />
          <option value='#003700' />
          <option value='#002966' />
          <option value='#3d1466' />
        </select>
        <button type='button' className='ql-indent' value='-1' />
        <button type='button' className='ql-indent' value='+1' />
        <div className='tet-upside'>
          <div className='tet-upside-content'>
            <i className='iconfont icon-huaban'></i>
            <p className='tet-upside-content-font'>样式库</p>
          </div>
        </div>
      </div>
      {/* 内容框 */}
      <div id={editorId} className='tsc-ed-editor'></div>
    </div>
  )
}
