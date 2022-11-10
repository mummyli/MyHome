import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTabBar, AtIcon, AtButton, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import './order.less'

const getSideBarList = () => {
  return [
    { title: '小炒', id: 'xc' },
    { title: '炖菜', id: 'dc' },
    { title: '烧菜', id: 'sc' },
    { title: '煎炸', id: 'jz' },
    { title: '蘸料', id: 'zl' },
    { title: '饮品', id: 'yp' },
    { title: '甜点', id: 'td' },
    { title: '加菜', id: 'jc' }
  ]
}


const getFoodMenu = () => {
  return [
    { 'title': '青椒肉丝', 'id': 'qjrs', 'desc': 'desc desc', 'order_nums': '9', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '芹菜肉末', 'id': 'xcr', 'desc': 'desc desc', 'order_nums': '20', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '小炒肉', 'id': 'xcr', 'desc': 'desc desc', 'order_nums': '11', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' }
  ]
}


export const FoodMenu: React.FC = () => {

  const foods = getFoodMenu()

  return (
    <View className='content-box'>
      {foods.map((item, idx) => (
        <View className='at-row item-detail' key={idx}>
          <Image mode='scaleToFill' className='at-col at-col-4 at-col--auto item-img' src={item.pic_url} />
          <View className='at-col out-box'>
            <View className='item-title'>{item.title}</View>
            <View className='item-desc'>{item.desc}</View>
            <View className='at-row at-row__justify--between item-sales'>
              <View>已点{item.order_nums}次</View>
              <AtIcon value='add-circle' size='20' color='#F00'></AtIcon>
            </View>
          </View>
        </View>))}
    </View >
  )
}

export const TabBar: React.FC = () => {

  const tabs = getSideBarList()

  const [current, setCurrent] = useState<number>(0)

  return (
    <AtTabs
      className='at-tabs-content'
      current={current}
      scroll
      height='400px'
      tabDirection='vertical'
      tabList={tabs}
      onClick={(value) => { setCurrent(value) }}>

      {tabs.map((item, idx) => (
        <AtTabsPane tabDirection='vertical' current={current} index={idx} key={item.id}>
          <FoodMenu />
        </AtTabsPane>
      ))}

    </AtTabs >
  )
}



export default () => {

  const [cartOpen, setcartOpen] = useState<boolean>(false)

  return (
    <View className='main-box'>
      <View className='box'>
        <View className='side-bar'>
          <TabBar />
        </View>
      </View>
      <View className='box-bottom'>
        <View className="cart-bar">
          <View className='l' onClick={() => { setcartOpen(cartOpen ? false : true) }}>
            <Image className='img-cart' src='https://s1.ax1x.com/2022/11/10/zpq07d.png' />
            <View className="badge">7</View>
          </View>
          <AtButton className='cart-botton' type='primary'>选好了</AtButton>
        </View>

        <AtTabBar
          tabList={[
            { title: '点餐', image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png' },
            { title: '已点', image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png' }
          ]}
          onClick={(idx) => { return idx }}
          current={0}
          fixed={true}
          className='bottom-menu'
        />
      </View>

      <AtActionSheet isOpened={cartOpen} className='cart-item'>
        <AtActionSheetItem>
          菜品1
        </AtActionSheetItem>
        <AtActionSheetItem>
          菜品2
        </AtActionSheetItem>
        <AtActionSheetItem>
          菜品3
        </AtActionSheetItem>
        <AtActionSheetItem>
          菜品4
        </AtActionSheetItem>
        <AtActionSheetItem>
          菜品5
        </AtActionSheetItem>
        <AtActionSheetItem>
          菜品6
        </AtActionSheetItem>
        <AtActionSheetItem>
          菜品7
        </AtActionSheetItem>
      </AtActionSheet>
    </View>
  )
}
