import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'
import { AtGrid } from "taro-ui"

export default class Index extends Component<PropsWithChildren> {

  handleNaviagate = (item) => { Taro.navigateTo({ url: item.url }) };

  render() {
    return (
      <View className='index'>
        <AtGrid columnNum={2} onClick={this.handleNaviagate} data={
          [
            {
              image: 'cloud://prod-9g9vg2wg6b392b26.7072-prod-9g9vg2wg6b392b26-1317803760/lixianshengdesichu.png',
              url: '/pages/dining_room/order',
              value: '黎先生的私厨'
            },
            {
              image: 'cloud://prod-9g9vg2wg6b392b26.7072-prod-9g9vg2wg6b392b26-1317803760/jiatingjifen.png',
              value: '家庭积分'
            },
            {
              image: 'cloud://prod-9g9vg2wg6b392b26.7072-prod-9g9vg2wg6b392b26-1317803760/wuliaodejiqiren.png',
              value: '无聊的机器人'
            },
            {
              image: 'cloud://prod-9g9vg2wg6b392b26.7072-prod-9g9vg2wg6b392b26-1317803760/daibanqingdan.png',
              value: '待办清单'
            },
            {
              image: 'cloud://prod-9g9vg2wg6b392b26.7072-prod-9g9vg2wg6b392b26-1317803760/shenghuodaka.png',
              value: '生活打卡'
            },
            {
              image: 'cloud://prod-9g9vg2wg6b392b26.7072-prod-9g9vg2wg6b392b26-1317803760/xiaogongju.png',
              value: '小工具'
            }
          ]
        } />
      </View>
    )
  }
}
