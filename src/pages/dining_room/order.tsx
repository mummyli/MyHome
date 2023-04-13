import React, { useState, useEffect } from 'react'
import { View, Image, Button, ScrollView } from '@tarojs/components'
import { AtTabBar, AtIcon, AtButton, AtFloatLayout, AtToast } from 'taro-ui'
import './order.less'
import Taro, { createSelectorQuery } from '@tarojs/taro';
import http from '../../http'

export interface OrderSummary {
  dishes_id: string;
  order_count: string;
}


export interface Dishes {
  dishes_id: string;
  dishes_name: string;
  dishes_pic_url: string;
  dishes_desc: string;
  order_count: OrderSummary;
  is_ordered: boolean;
}


export interface MenuClassification {
  classifi_id: string;
  classifi_name: string;
  classifi_desc: string;
  classifi_order: number;
  sub_dishes: Dishes[];
}


interface ShoppingCartProps {
  list: Dishes[];
  onChange: (list: Dishes[]) => void;
}

interface TabBarProps {
  dishesList: MenuClassification[];
  cartList: Dishes[];
  onChange: (list: Dishes[]) => void;
}


const getSideBarList = () => {

  const [classifiList, setClassifiList] = useState<MenuClassification[]>([]);

  useEffect(() => {
    http.get("classifications", {}).then((response) => {
      setClassifiList(response.data);
    });
  }, [])

  return classifiList
}

const getDishesList = () => {

  const [classifiDishes, setClassifiDishes] = useState<MenuClassification[]>([]);

  useEffect(() => {
    http.get("dishes", { data: { skip: 0, limit: 500 } }).then((response) => {
      setClassifiDishes(response.data);
    });
  }, []);

  return classifiDishes
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
                <Image mode='scaleToFill' className='cart-img' src={item.dishes_pic_url} />
                <View className='item-title'>{item.dishes_name}</View>
              </View>
              <AtIcon value='close' size='18' onClick={() => { handleRemove(idx); }}></AtIcon>
            </View>
          </View>
        ))}
      </View>
    </View>)
}


const MyTabBar: React.FC<TabBarProps> = ({ dishesList, cartList, onChange }) => {

  const [currentAnc, setCurrentAnc] = useState<string>(dishesList[0]?.classifi_id);

  const tabs = getSideBarList()
  dishesList = getDishesList()

  const handleClick = (item: Dishes) => {
    const temp = [...cartList];

    const itemIdx = cartList.findIndex((cart) => cart.dishes_id === item.dishes_id)
    if (itemIdx >= 0) {
      temp.splice(itemIdx, 1);
    } else {
      // request server to add item
      temp.push(item);
    }

    onChange(temp);
  }


  const getCurrentAncId = (ancList) => {

    return ancList.reduce((p, v) => Math.abs(p.top) > Math.abs(v.top) ? v : p).id;

  }

  return (
    <View className='menu-box'>
      <View className='scroll-out-box-nav'>
        <ScrollView
          className='tab-nav'
          scrollY
          scrollIntoView={currentAnc}
          enhanced={true}
          showScrollbar={false}
          onClick={(value) => { setCurrentAnc(value.target.id); }}>
          {tabs.map((item, idx) => (
            <View className={currentAnc == "anc_" + item.classifi_id ? 'tab-nav-item tab-nav-item--active' : 'tab-nav-item'} id={"anc_" + item.classifi_id} key={idx}>{item.classifi_name}</View>
          ))}
        </ScrollView>
      </View>
      <View className='scroll-out-box'>
        <ScrollView className='menu-list'
          scrollY
          enhanced={true}
          showScrollbar={false}
          scrollIntoView={currentAnc}
          onScroll={(e) => {
            const other = createSelectorQuery().selectAll('.menu-anc');
            other.boundingClientRect((ancValue) => {
              setCurrentAnc(getCurrentAncId(ancValue));
            }).exec();
          }}

        >

          {dishesList.map((cItem, cIdx) => (
            [
              <View className='menu-anc' key={cIdx} id={"anc_" + cItem.classifi_id}>{cItem.classifi_name}</View>,

              cItem.sub_dishes.map((mItem, mIdx) => {

                let icon = 'add-circle'
                if (cartList.findIndex((cart) => cart.dishes_id === mItem.dishes_id) >= 0) {
                  icon = 'check';
                }

                return (<View className='at-row item-detail' key={mIdx}>
                  <Image mode='scaleToFill' className='at-col at-col-4 at-col--auto item-img' src={mItem.dishes_pic_url} />
                  <View className='at-col out-box'>
                    <View className='item-title'>{mItem.dishes_name}</View>
                    <View className='item-desc'>{mItem.dishes_desc}</View>
                    <View className='at-row at-row__justify--between item-sales'>
                      <View>已点{mItem.order_count.order_count}次</View>
                      <AtIcon value={icon} size='20' color='#F00' onClick={() => { handleClick(mItem); }}></AtIcon>
                    </View>
                  </View>
                </View>)
              })

            ]
          )
          )}
        </ScrollView>
      </View>
    </View>
  )
}


const postCartItems = (list: Dishes[], onChange, setIsModalOpen, setIsToastOpen) => {

  // post data
  http.post("submit_orders", { data: { cart_id: null, dishes_ids: list } })

  // clean data
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
  const [cartList, setCartList] = useState<Dishes[]>([])
  const [dishesList, setDishesList] = useState<MenuClassification[]>([])

  return (
    <View className='main-box'>
      <MyTabBar dishesList={dishesList} cartList={cartList} onChange={(value) => { setCartList(value); }} />
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
          onClick={(e) => { if (e === 0) { Taro.navigateTo({ url: "/pages/dining_room/order" }) } else { Taro.navigateTo({ url: "/pages/order_history/order_history" }) } }}
          current={0}
          fixed={true}
          className='bottom-menu'
        />

        <AtToast isOpened={isToastOpen} text="黎先生已收到你的点单，等着干饭吧~~~" icon="check" onClose={() => { setIsToastOpen(false) }}></AtToast>

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
