import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTabBar, AtIcon, AtButton, AtFloatLayout } from 'taro-ui'
import './order.less'

export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  order_nums: number;
  pic_url: string;
  is_ordered: boolean;
}

interface ShoppingCartProps {
  list: MenuItem[];
  onChange: (list: MenuItem[]) => void;
}

interface FoodMenuProps {
  menuList: MenuItem[];
  cartList: MenuItem[];
  onChange: (list: MenuItem[]) => void;
}

interface TabBarProps {
  menuList: MenuItem[];
  cartList: MenuItem[];
  onChange: (list: MenuItem[]) => void;
}

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
  const menue_list = '['
    + '{ "id": "qjrs", "name": "青椒肉丝", "desc": "desc desc", "order_nums": "9", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png", "is_ordered": "false" },'
    + '{ "id": "qcrm", "name": "芹菜肉末", "desc": "desc desc", "order_nums": "20", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png", "is_ordered": "false" },'
    + '{ "id": "xcr", "name": "小炒肉", "desc": "desc desc", "order_nums": "11", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png", "is_ordered": "false" },'
    + '{ "id": "tcpg", "name": "糖醋排骨", "desc": "desc desc", "order_nums": "9", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png", "is_ordered": "false" },'
    + '{ "id": "tdb", "name": "土豆饼", "desc": "desc desc", "order_nums": "20", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png", "is_ordered": "false" },'
    + '{ "id": "dcsdf", "name": "大葱烧豆腐", "desc": "desc desc", "order_nums": "11", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png", "is_ordered": "false" },'
    + '{ "id": "jyxbg", "name": "椒盐杏鲍菇", "desc": "desc desc", "order_nums": "11", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png", "is_ordered": "false" }'
    + ' ]'

  const result: MenuItem[] = JSON.parse(menue_list)

  return result
}

const shopCartList = () => {

  const cart_list = '['
    + '{ "id": "qjrs", "name": "青椒肉丝", "desc": "desc desc", "order_nums": "9", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png" },'
    + '{ "id": "qcrm", "name": "芹菜肉末", "desc": "desc desc", "order_nums": "20", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png" },'
    + '{ "id": "xcr", "name": "小炒肉", "desc": "desc desc", "order_nums": "11", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png" },'
    + '{ "id": "tcpg", "name": "糖醋排骨", "desc": "desc desc", "order_nums": "9", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png" },'
    + '{ "id": "tdb", "name": "土豆饼", "desc": "desc desc", "order_nums": "20", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png" },'
    + '{ "id": "dcsdf", "name": "大葱烧豆腐", "desc": "desc desc", "order_nums": "11", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png" },'
    + '{ "id": "jyxbg", "name": "椒盐杏鲍菇", "desc": "desc desc", "order_nums": "11", "pic_url": "https://s1.ax1x.com/2022/11/09/zSemy4.png" }'
    + ' ]'

  const result: MenuItem[] = JSON.parse(cart_list)

  return result
}


const FoodMenu: React.FC<FoodMenuProps> = ({ menuList, cartList, onChange }) => {

  const handleClick = (item: MenuItem) => {
    const temp = [...cartList];

    const itemIdx = cartList.findIndex((cart) => cart.id === item.id)
    if( itemIdx >= 0){
      temp.splice(itemIdx, 1);
    }else{
      temp.push(item);
    }

    
    onChange(temp);
  }

  return (
    <View className='content-box'>
      {menuList.map((item, idx) => {

        let icon = 'add-circle'
        if(cartList.findIndex((cart) => cart.id === item.id) >= 0){
          icon = 'check';
        }

        return (
        <View className='at-row item-detail' key={idx}>
          <Image mode='scaleToFill' className='at-col at-col-4 at-col--auto item-img' src={item.pic_url} />
          <View className='at-col out-box'>
            <View className='item-title'>{item.name}</View>
            <View className='item-desc'>{item.desc}</View>
            <View className='at-row at-row__justify--between item-sales'>
              <View>已点{item.order_nums}次</View>
              <AtIcon value={icon} size='20' color='#F00' onClick={() => { handleClick(item); }}></AtIcon>
            </View>
          </View>
        </View>)})}
    </View >
  )
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ list, onChange }) => {

  const handleRemove = (idx: number) => {
    const temp = [...list];
    temp.splice(idx, 1);
    onChange(temp);
  }

  const cleanSweep = () => {
    const temp = [...list];
    temp.splice(0, temp.length);
    onChange(temp);
  }

  return (
    <View className='box-1'>
      <View className='shopping-cart-title'><AtIcon value='trash' size='16' /><View onClick={cleanSweep}>清空</View></View>
      <View className='shopping-cart-list'>
        {list.map((item, idx) => (
          <View key={idx} className='cart-box-content'>
            <View className='item-box'>
              <View className='item-box-info'>
                <Image mode='scaleToFill' className='cart-img' src={item.pic_url} />
                <View className='item-title'>{item.name}</View>
              </View>
              <AtIcon value='close' size='18' onClick={() => { handleRemove(idx); }}></AtIcon>
            </View>
          </View>
        ))}
      </View>
    </View>)
}

const TabBar: React.FC<TabBarProps> = ({ menuList, cartList, onChange }) => {

  const tabs = getSideBarList()

  const [current, setCurrent] = useState<number>(0)

  return (
    <AtTabs
      className='at-tabs-content'
      current={current}
      scroll
      height='800px'
      tabDirection='vertical'
      tabList={tabs}
      onClick={(value) => { setCurrent(value) }}>

      {tabs.map((item, idx) => (
        <AtTabsPane tabDirection='vertical' current={current} index={idx} key={item.id}>
          <FoodMenu menuList={menuList} cartList={cartList} onChange={onChange} />
        </AtTabsPane>
      ))}

    </AtTabs >
  )
}



export default () => {

  const [cartOpen, setcartOpen] = useState<boolean>(false)
  const [cartList, setCartList] = useState<MenuItem[]>(shopCartList())
  const [menuList, setMenuList] = useState<MenuItem[]>(getFoodMenu())

  return (
    <View className='main-box'>
      <TabBar menuList={menuList} cartList={cartList} onChange={(value) => { setCartList(value) }} />
      <View className='box-bottom'>
        <View className="cart-bar">
          <View className='l' onClick={() => { setcartOpen(cartOpen ? false : true) }}>
            <Image className='img-cart' src='https://s1.ax1x.com/2022/11/10/zpq07d.png' />
            <View className="badge">{cartList.length}</View>
          </View>
          <AtButton className='cart-botton' type='primary'>选好了</AtButton>
        </View>
        <AtTabBar
          tabList={[
            { title: '点餐', image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png' },
            { title: '已点', image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png' }
          ]}
          onClick={(idx) => idx }
          current={0}
          fixed={true}
          className='bottom-menu'
        />

        <AtFloatLayout isOpened={cartOpen} className='cart-items'>
          <ShoppingCart list={cartList} onChange={(value) => { setCartList(value) }} />
        </AtFloatLayout >
      </View>
    </View>
  )
}
