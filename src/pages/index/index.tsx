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
              image: 'https://s1.ax1x.com/2022/11/17/zeLS7n.png',
              url: '/pages/dining_room/order',
              value: '黎先生的私厨'
            },
            {
              image: 'https://s1.ax1x.com/2022/11/17/zeLCt0.png',
              value: '家庭积分'
            },
            {
              image: 'https://s1.ax1x.com/2022/11/17/zeLKtx.png',
              value: '无聊的机器人'
            },
            {
              image: 'https://s1.ax1x.com/2022/11/17/zeL11O.png',
              value: '待办清单'
            },
            {
              image: 'https://s1.ax1x.com/2022/11/17/zeL3cD.png',
              value: '生活打卡'
            },
            {
              image: 'https://s1.ax1x.com/2022/11/23/z8SDDH.png',
              value: '小工具'
            }
          ]
        } />
      </View>
    )
  }
}
