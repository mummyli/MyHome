import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTabBar, AtIcon, AtButton, AtFloatLayout } from 'taro-ui'
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


const shopCartList = () => {
  return [
    { 'title': '青椒肉丝', 'id': 'qjrs', 'desc': 'desc desc', 'order_nums': '9', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '芹菜肉末', 'id': 'xcr', 'desc': 'desc desc', 'order_nums': '20', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '小炒肉', 'id': 'xcr', 'desc': 'desc desc', 'order_nums': '11', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '糖醋排骨', 'id': 'qjrs', 'desc': 'desc desc', 'order_nums': '9', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '土豆饼', 'id': 'xcr', 'desc': 'desc desc', 'order_nums': '20', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '大葱烧豆腐', 'id': 'xcr', 'desc': 'desc desc', 'order_nums': '11', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '椒盐杏鲍菇', 'id': 'xcr', 'desc': 'desc desc', 'order_nums': '11', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '青椒肉丝', 'id': 'qjrs', 'desc': 'desc desc', 'order_nums': '9', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '芹菜肉末', 'id': 'xcr', 'desc': 'desc desc', 'order_nums': '20', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '小炒肉', 'id': 'xcr', 'desc': 'desc desc', 'order_nums': '11', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '糖醋排骨', 'id': 'qjrs', 'desc': 'desc desc', 'order_nums': '9', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '土豆饼', 'id': 'xcr', 'desc': 'desc desc', 'order_nums': '20', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '大葱烧豆腐', 'id': 'xcr', 'desc': 'desc desc', 'order_nums': '11', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' },
    { 'title': '椒盐杏鲍菇', 'id': 'xcr', 'desc': 'desc desc', 'order_nums': '11', 'pic_url': 'https://s1.ax1x.com/2022/11/09/zSemy4.png' }
  ]
}

const FoodMenu: React.FC = () => {

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

const ShoppingCart: React.FC = () => {

  const cartList = shopCartList()

  return (
    <View className='box-1'>
      <View className='shopping-cart-title'><AtIcon value='trash' size='16' /><View>清空</View></View>
      <View className='shopping-cart-list'>
        {cartList.map((item, idx) => (
          <View key={idx} className='cart-box-content'>
            <View className='item-box'>
              <View className='item-box-info'>
                <Image mode='scaleToFill' className='cart-img' src={item.pic_url} />
                <View className='item-title'>{item.title}</View>
              </View>
              <AtIcon value='close' size='18'></AtIcon>
            </View>
          </View>
        ))}
      </View>
    </View>)
}

const TabBar: React.FC = () => {

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
      <TabBar />
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

        <AtFloatLayout isOpened={cartOpen} className='cart-items'>
          <ShoppingCart />
        </AtFloatLayout >
      </View>
    </View>
  )
}
