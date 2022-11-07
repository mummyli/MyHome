import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import './order.less'
import { AtGrid } from "taro-ui"

export default class Order extends Component<PropsWithChildren> {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='order'>
        <AtGrid columnNum={2} data={
          [
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
              url: '/pages/dinning_room/order',
              value: '黎先生的私厨'
            }
          ]
        } />
      </View>
    )
  }
}
