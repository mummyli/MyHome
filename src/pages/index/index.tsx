import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'
import { AtGrid } from "taro-ui"

export default class Index extends Component<PropsWithChildren> {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <AtGrid columnNum={2} onClick={(item) => {console.log(item) 
         Taro.navigateTo({url: item.url})
      }
      } data={
          [
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
              url: '/pages/dining_room/order',
              value: '黎先生的私厨'
            },
            {
              image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
              value: '家庭积分'
            },
            {
              image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
              value: '无聊的机器人'
            },
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
              value: '待办清单'
            }
          ]
        } />
      </View>
    )
  }
}
