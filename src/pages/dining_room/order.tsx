import React, { useState } from 'react'
import { View, Image, Button, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTabBar, AtIcon, AtButton, AtFloatLayout, AtToast } from 'taro-ui'
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
    if (itemIdx >= 0) {
      temp.splice(itemIdx, 1);
    } else {
      temp.push(item);
    }

    onChange(temp);
  }

  return (
    <View className='content-box'>
      {menuList.map((item, idx) => {

        let icon = 'add-circle'
        if (cartList.findIndex((cart) => cart.id === item.id) >= 0) {
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
          </View>)
      })}
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


const MyTabBar: React.FC<TabBarProps> = ({ menuList, cartList, onChange }) => {

  const [currentAnc, setCurrentAnc] = useState<string>('a0');

  const tabs = getSideBarList()

  return (
    <View className='menu-box'>
      <View className='scroll-out-box-nav'>
        <ScrollView className='tab-nav' scrollY scrollIntoView={currentAnc} enhanced={true} showScrollbar={false} onClick={(value) => {
          setCurrentAnc(value.target.id); console.log(currentAnc);
          console.log(currentAnc);
        }}>
          {tabs.map((item, idx) => (
            <View className='tab-nav-item' id={item.id} key={idx}>{item.title}</View>
          ))}
        </ScrollView>
      </View>
      <View className='scroll-out-box'>
        <ScrollView className='menu-list'
          scrollY
          enhanced={true}
          showScrollbar={false}
          scrollIntoView={currentAnc}
        >
          <View className='menu-anc' id='xc'>锚点1</View>
          <View>菜品1</View>
          <View>菜品2</View>
          <View>菜品3</View>
          <View>菜品4</View>
          <View>菜品5</View>
          <View>菜品6</View>
          <View>菜品7</View>
          <View className='menu-anc' id='dc'>锚点2</View>
          <View>菜品8</View>
          <View>菜品9</View>
          <View>菜品10</View>
          <View>菜品11</View>
          <View>菜品12</View>
          <View>菜品13</View>
          <View>菜品14</View>
          <View className='menu-anc' id='sc'>锚点3</View>
          <View>菜品1</View>
          <View>菜品2</View>
          <View>菜品3</View>
          <View>菜品4</View>
          <View>菜品5</View>
          <View>菜品6</View>
          <View>菜品7</View>
          <View className='menu-anc' id='jz'>锚点4</View>
          <View>菜品1</View>
          <View>菜品2</View>
          <View>菜品3</View>
          <View>菜品4</View>
          <View>菜品5</View>
          <View>菜品6</View>
          <View>菜品7</View>
          <View className='menu-anc' id='zl'>锚点5</View>
          <View>菜品1</View>
          <View>菜品2</View>
          <View>菜品3</View>
          <View>菜品4</View>
          <View>菜品5</View>
          <View>菜品6</View>
          <View>菜品7</View>
          <View className='menu-anc' id='yp'>锚点6</View>
          <View>菜品1</View>
          <View>菜品2</View>
          <View>菜品3</View>
          <View>菜品4</View>
          <View>菜品5</View>
          <View>菜品6</View>
          <View>菜品7</View>
        </ScrollView>
      </View>
    </View>
  )
}

const postCartItems = (list: MenuItem[], onChange, setIsModalOpen, setIsToastOpen) => {
  // post data

  //clean data
  const temp = [...list];
  temp.splice(0, temp.length);
  onChange(temp);

  // close modal
  setIsModalOpen(false);

  // success information
  setIsToastOpen(true);
}

export default () => {

  const [cartOpen, setcartOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false)
  const [cartList, setCartList] = useState<MenuItem[]>(shopCartList())
  const [menuList, setMenuList] = useState<MenuItem[]>(getFoodMenu())

  return (
    <View className='main-box'>
      <MyTabBar menuList={menuList} cartList={cartList} onChange={(value) => { setCartList(value); }} />
      <View className='box-bottom'>
        <View className="cart-bar">
          <View className='l' onClick={() => { setcartOpen(cartOpen ? false : true) }}>
            <Image className='img-cart' src='https://s1.ax1x.com/2022/11/10/zpq07d.png' />
            <View className="badge">{cartList.length}</View>
          </View>
          <AtButton className='cart-botton' type='primary' onClick={() => setIsModalOpen(true)}>选好了</AtButton>
        </View>
        <AtTabBar
          tabList={[
            { title: '点餐', image: 'https://s1.ax1x.com/2022/11/17/zeLUAI.png' },
            { title: '已点', image: 'https://s1.ax1x.com/2022/11/17/zeLTu4.png' }
          ]}
          onClick={(idx) => idx}
          current={0}
          fixed={true}
          className='bottom-menu'
        />

        <AtToast isOpened={isToastOpen} text="提交成功，等着干饭吧~~~" icon="check" onClose={() => { setIsToastOpen(false) }}></AtToast>

        <View className={isModalOpen ? 'modal modal--active' : 'modal'}>
          <View className='modal__overlay'> </View>
          <View className='modal__container'>
            <View className='modal__content'>
              选好了吗？
            </View>
            <View className='modal__footer'>
              <Button onClick={() => setIsModalOpen(false)}>取消</Button>
              <Button onClick={() => postCartItems(cartList, setCartList, setIsModalOpen, setIsToastOpen)}>提交</Button>
            </View>
          </View>
        </View>

        <AtFloatLayout isOpened={cartOpen} className='cart-items' onClose={() => { setcartOpen(false) }}>
          <ShoppingCart list={cartList} onChange={(value) => { setCartList(value) }} />
        </AtFloatLayout >
      </View>
    </View>
  )
}
