import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTabBar } from 'taro-ui'

const getSideBarList = () => {
  return [
    { title: '小炒', id: 'xc' },
    { title: '炖菜', id: 'dc' },
    { title: '烧菜', id: 'sc' },
    { title: '煎炸', id: 'jz' },
    { title: '蘸料', id: 'zl' },
    { title: '饮品', id: 'yp' },
    { title: '甜点', id: 'td' }
  ]
}


export const TabBar: React.FC = () => {

  const tabs = getSideBarList()

  const [current, setCurrent] = useState<number>(0)

  return (
    <AtTabs
      current={current}
      scroll
      height='300px'
      tabDirection='vertical'
      tabList={tabs}
      onClick={(value) => { setCurrent(value) }}>

      {tabs.map((item, idx) => (
        
        <AtTabsPane current={idx} index={idx} key={idx}>
          <View>{item.title}</View>
        </AtTabsPane>
      ))}

    </AtTabs >
  )
}



export default () => {

  return (
    <View className='order'>
      <View className='box'>
        <View className='side-bar'>
          <TabBar />
        </View>
      </View>
      <AtTabBar
        tabList={[
          { title: '点餐', image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png' },
          { title: '已点', image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png' },
          { title: '我的', image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png', text: '100', max: 99 }
        ]}
        onClick={(idx) => { return idx }}
        current={0}
        fixed={true}
      />
    </View>
  )
}