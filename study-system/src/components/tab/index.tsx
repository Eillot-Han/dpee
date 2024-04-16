import React from 'react'
import './index.scss'
import { TAB } from '@/services/type'

const tabBackColors = ['#F8E8BD', '#EEBDBA', '#B8E3F0', '#F3F8F8']

export default function Tab({
  tabList,
  switchTab,
  currentTab,
}: {
  tabList: TAB[]
  switchTab: any
  currentTab: TAB
}) {
  return (
    <div className='tsc-tabs'>
      {tabList.map((tab, index) => (
        <div
          className={tab.name === currentTab.name ? 'tb-wrapper tb-wrapper_choosed' : 'tb-wrapper'}
          onClick={() => {
            switchTab(tab)
          }}
          key={tab.name}
        >
          <p
            className='tb-number'
            style={
              currentTab === tab
                ? { background: '#FFF' }
                : { background: `${tabBackColors[index]}` }
            }
          >
            {tab.number}
          </p>
          <p className='tb-font'>{tab.name}</p>
        </div>
      ))}
    </div>
  )
}
