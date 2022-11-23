import React, { useState } from 'react'
import { View, Image, Button, ScrollView } from '@tarojs/components'
import { AtTabBar, AtIcon, AtButton, AtFloatLayout, AtToast } from 'taro-ui'
import './order.less'
import { createSelectorQuery } from '@tarojs/taro';


export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  category: string;
  order_nums: number;
  pic_url: string;
  is_ordered: boolean;
}

export interface CategoryMenu {
  category_id: string;
  category_name: string;
  menu_items: MenuItem[];
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
  menuList: CategoryMenu[];
  cartList: MenuItem[];
  onChange: (list: MenuItem[]) => void;
}


const getSideBarList = () => {
  return [
    { name: '小炒', id: 'xc' },
    { name: '炖菜', id: 'dc' },
    { name: '烧菜', id: 'sc' },
    { name: '煎炸', id: 'jz' },
    { name: '蘸料', id: 'zl' },
    { name: '饮品', id: 'yp' },
    { name: '甜点', id: 'td' },
    { name: '加菜', id: 'jc' }
  ]
}

const getMenuList = () => {
  const menu_list = '[{"category_id":"xc","category_name":"小炒","menu_items":[{"id":"qjrs","name":"青椒肉丝","desc":"desc desc","category":"xc","order_nums":"9","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"qcrm","name":"芹菜肉末","desc":"desc desc","category":"xc","order_nums":"20","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"xcr","name":"小炒肉","desc":"desc desc","category":"xc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smhg","name":"蒜苗回锅","desc":"desc desc","category":"xc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm2hg","name":"tehihsf","desc":"desc desc","category":"xc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smh3g","name":"ddffdfg","desc":"desc desc","category":"xc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm6hg","name":"sdfaf","desc":"desc desc","category":"xc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"}]},{"category_id":"dc","category_name":"炖菜","menu_items":[{"id":"qjrs","name":"青椒肉丝","desc":"desc desc","category":"dc","order_nums":"9","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"qcrm","name":"芹菜肉末","desc":"desc desc","category":"dc","order_nums":"20","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"xcr","name":"小炒肉","desc":"desc desc","category":"dc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smhg","name":"蒜苗回锅","desc":"desc desc","category":"dc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm2hg","name":"tehihsf","desc":"desc desc","category":"dc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smh3g","name":"ddffdfg","desc":"desc desc","category":"dc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm6hg","name":"sdfaf","desc":"desc desc","category":"dc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"}]},{"category_id":"sc","category_name":"烧菜","menu_items":[{"id":"qjrs","name":"青椒肉丝","desc":"desc desc","category":"sc","order_nums":"9","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"qcrm","name":"芹菜肉末","desc":"desc desc","category":"sc","order_nums":"20","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"xcr","name":"小炒肉","desc":"desc desc","category":"sc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smhg","name":"蒜苗回锅","desc":"desc desc","category":"sc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm2hg","name":"tehihsf","desc":"desc desc","category":"sc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smh3g","name":"ddffdfg","desc":"desc desc","category":"sc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm6hg","name":"sdfaf","desc":"desc desc","category":"sc","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"}]},{"category_id":"jz","category_name":"煎炸","menu_items":[{"id":"qjrs","name":"青椒肉丝","desc":"desc desc","category":"jz","order_nums":"9","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"qcrm","name":"芹菜肉末","desc":"desc desc","category":"jz","order_nums":"20","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"xcr","name":"小炒肉","desc":"desc desc","category":"jz","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smhg","name":"蒜苗回锅","desc":"desc desc","category":"jz","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm2hg","name":"tehihsf","desc":"desc desc","category":"jz","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smh3g","name":"ddffdfg","desc":"desc desc","category":"jz","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm6hg","name":"sdfaf","desc":"desc desc","category":"jz","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"}]},{"category_id":"zl","category_name":"蘸料","menu_items":[{"id":"qjrs","name":"青椒肉丝","desc":"desc desc","category":"zl","order_nums":"9","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"qcrm","name":"芹菜肉末","desc":"desc desc","category":"zl","order_nums":"20","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"xcr","name":"小炒肉","desc":"desc desc","category":"zl","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smhg","name":"蒜苗回锅","desc":"desc desc","category":"zl","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm2hg","name":"tehihsf","desc":"desc desc","category":"zl","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smh3g","name":"ddffdfg","desc":"desc desc","category":"zl","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm6hg","name":"sdfaf","desc":"desc desc","category":"zl","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"}]},{"category_id":"yp","category_name":"饮品","menu_items":[{"id":"qjrs","name":"青椒肉丝","desc":"desc desc","category":"yp","order_nums":"9","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"qcrm","name":"芹菜肉末","desc":"desc desc","category":"yp","order_nums":"20","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"xcr","name":"小炒肉","desc":"desc desc","category":"yp","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smhg","name":"蒜苗回锅","desc":"desc desc","category":"yp","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm2hg","name":"tehihsf","desc":"desc desc","category":"yp","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smh3g","name":"ddffdfg","desc":"desc desc","category":"yp","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm6hg","name":"sdfaf","desc":"desc desc","category":"yp","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"}]},{"category_id":"td","category_name":"甜点","menu_items":[{"id":"qjrs","name":"青椒肉丝","desc":"desc desc","category":"td","order_nums":"9","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"qcrm","name":"芹菜肉末","desc":"desc desc","category":"td","order_nums":"20","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"xcr","name":"小炒肉","desc":"desc desc","category":"td","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smhg","name":"蒜苗回锅","desc":"desc desc","category":"td","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm2hg","name":"tehihsf","desc":"desc desc","category":"td","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"smh3g","name":"ddffdfg","desc":"desc desc","category":"td","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"},{"id":"sm6hg","name":"sdfaf","desc":"desc desc","category":"td","order_nums":"11","pic_url":"https://s1.ax1x.com/2022/11/09/zSemy4.png","is_ordered":"false"}]}]'

  const result: CategoryMenu[] = JSON.parse(menu_list)

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


const MyTabBar: React.FC<TabBarProps> = ({ menuList, cartList, onChange }) => {

  const [currentAnc, setCurrentAnc] = useState<string>(menuList[0].category_id);

  const tabs = getSideBarList()

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
  

  const getCurrentAncId = (ancList) =>{

    return ancList.reduce((p,v) => Math.abs(p.top) > Math.abs(v.top) ? v : p).id;

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
            <View className={currentAnc == item.id ? 'tab-nav-item tab-nav-item--active' : 'tab-nav-item'} id={item.id} key={idx}>{item.name}</View>
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
              setCurrentAnc(getCurrentAncId(ancValue, currentAnc));
            }).exec();
          }}

        >

          {menuList.map((cItem, cIdx) => (
            [
              <View className='menu-anc' key={cIdx} id={cItem.category_id}>{cItem.category_name}</View>,

              cItem.menu_items.map((mItem, mIdx) => {

                let icon = 'add-circle'
                if (cartList.findIndex((cart) => cart.id === mItem.id) >= 0) {
                  icon = 'check';
                }

                return (<View className='at-row item-detail' key={mIdx}>
                  <Image mode='scaleToFill' className='at-col at-col-4 at-col--auto item-img' src={mItem.pic_url} />
                  <View className='at-col out-box'>
                    <View className='item-title'>{mItem.name}</View>
                    <View className='item-desc'>{mItem.desc}</View>
                    <View className='at-row at-row__justify--between item-sales'>
                      <View>已点{mItem.order_nums}次</View>
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


const postCartItems = (list: MenuItem[], onChange, setIsModalOpen, setIsToastOpen) => {
  
  // post data

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
  const [cartList, setCartList] = useState<MenuItem[]>([])
  const [menuList, setMenuList] = useState<CategoryMenu[]>(getMenuList())

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
