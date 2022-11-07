import React from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtDivider } from 'taro-ui'

export default class Order extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
  }

  handleClick(value) {
    this.setState({
      current: value
    })
  }

  render() {
    return (
      <View className='order'>
        <AtTabs
          current={this.state.current}
          scroll
          height='300px'
          tabDirection='vertical'
          tabList={[
            { title: '家常小炒' },
            { title: '炖菜' },
            { title: '烧菜' },
            { title: '蘸料' },
            { title: '喝点什么' },
            { title: '午后甜点' },
          ]}
          onClick={this.handleClick.bind(this)}>
          <AtTabsPane tabDirection='vertical' current={this.state.current} index={0}>
            <View style='font-size:20px;text-align:center;height:300px;'><AtDivider content='什么也没有' fontColor='#2d8cf0' lineColor='#2d8cf0' /></View>
          </AtTabsPane>
          <AtTabsPane tabDirection='vertical' current={this.state.current} index={1}>
            <View style='font-size:20px;text-align:center;height:300px;'><AtDivider content='什么也没有' fontColor='#2d8cf0' lineColor='#2d8cf0' /></View>
          </AtTabsPane>
          <AtTabsPane tabDirection='vertical' current={this.state.current} index={2}>
            <View style='font-size:20px;text-align:center;height:300px;'><AtDivider content='什么也没有' fontColor='#2d8cf0' lineColor='#2d8cf0' /></View>
          </AtTabsPane>
          <AtTabsPane tabDirection='vertical' current={this.state.current} index={3}>
            <View style='font-size:20px;text-align:center;height:300px;'><AtDivider content='什么也没有' fontColor='#2d8cf0' lineColor='#2d8cf0' /></View>
          </AtTabsPane>
          <AtTabsPane tabDirection='vertical' current={this.state.current} index={4}>
            <View style='font-size:20px;text-align:center;height:300px;'><AtDivider content='什么也没有' fontColor='#2d8cf0' lineColor='#2d8cf0' /></View>
          </AtTabsPane>
          <AtTabsPane tabDirection='vertical' current={this.state.current} index={5}>
            <View style='font-size:20px;text-align:center;height:300px;'><AtDivider content='什么也没有' fontColor='#2d8cf0' lineColor='#2d8cf0' /></View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
